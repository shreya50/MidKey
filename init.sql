-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    public_key TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    client_id VARCHAR(255) UNIQUE NOT NULL,
    client_secret TEXT NOT NULL,
    redirect_uris TEXT[] DEFAULT '{}',
    webhook_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash TEXT NOT NULL,
    key_prefix VARCHAR(20) NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Create authentication_sessions table
CREATE TABLE IF NOT EXISTS authentication_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    proof_data JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 hour'),
    metadata JSONB DEFAULT '{}'
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    request_data JSONB,
    response_data JSONB,
    status_code INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_client_id ON applications(client_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_api_keys_application_id ON api_keys(application_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id ON authentication_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_application_id ON authentication_sessions(application_id);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_session_token ON authentication_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_status ON authentication_sessions(status);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_expires_at ON authentication_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_application_id ON audit_logs(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM authentication_sessions 
    WHERE expires_at < NOW() AND status = 'expired';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate secure API keys
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
BEGIN
    RETURN 'mk_' || encode(gen_random_bytes(32), 'base64url');
END;
$$ LANGUAGE plpgsql;

-- Insert initial admin user (replace with actual values)
INSERT INTO users (wallet_address, public_key, metadata) 
VALUES (
    'admin@midkey.io',
    'admin-public-key',
    '{"role": "admin", "permissions": ["all"]}'
) ON CONFLICT (wallet_address) DO NOTHING;

-- Create view for application statistics
CREATE OR REPLACE VIEW application_stats AS
SELECT 
    a.id,
    a.name,
    a.client_id,
    a.status,
    a.created_at,
    COUNT(ak.id) as api_key_count,
    COUNT(CASE WHEN ak.is_active THEN 1 END) as active_api_keys,
    COUNT(DISTINCT als.user_id) as unique_users,
    COUNT(als.id) as total_sessions,
    MAX(als.created_at) as last_activity
FROM applications a
LEFT JOIN api_keys ak ON a.id = ak.application_id
LEFT JOIN authentication_sessions als ON a.id = als.application_id
GROUP BY a.id, a.name, a.client_id, a.status, a.created_at;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO midkey;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO midkey;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO midkey;

-- Create a function to get application metrics
CREATE OR REPLACE FUNCTION get_application_metrics(app_id UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_sessions', COUNT(*),
        'successful_sessions', COUNT(CASE WHEN status = 'completed' THEN 1 END),
        'failed_sessions', COUNT(CASE WHEN status = 'failed' THEN 1 END),
        'unique_users', COUNT(DISTINCT user_id),
        'last_activity', MAX(created_at)
    ) INTO result
    FROM authentication_sessions
    WHERE application_id = app_id;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

COMMIT;
