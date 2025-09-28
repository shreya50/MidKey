package midnight.hackathon;

import org.keycloak.broker.provider.AbstractIdentityProviderFactory;
import org.keycloak.models.IdentityProviderModel;
import org.keycloak.models.KeycloakSession;

public class MidnightIdentityProviderFactory extends AbstractIdentityProviderFactory<MidnightIdentityProvider> {
    public static final String PROVIDER_ID = "midnight-zk";

    @Override
    public String getName() { 
        return "Midnight ZK Provider"; 
    }

    @Override
    public MidnightIdentityProvider create(KeycloakSession session, IdentityProviderModel model) {
        return new MidnightIdentityProvider(session, new MidnightIdentityProviderConfig(model));
    }

    @Override
    public IdentityProviderModel createConfig() { 
        return new MidnightIdentityProviderConfig(); 
    }

    @Override
    public String getId() { 
        return PROVIDER_ID; 
    }
}
