# MidKey Production Deployment Guide

This guide covers deploying MidKey to production with proper security, monitoring, and scalability considerations.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Domain name with DNS access
- SSL certificates (Let's Encrypt recommended)
- Production environment variables configured

### 1. Environment Setup

1. **Copy and configure environment variables:**
   ```bash
   cp production.env.example production.env
   # Edit production.env with your production values
   ```

2. **Set up SSL certificates:**
   ```bash
   mkdir -p ssl
   # Place your SSL certificates in ./ssl/
   # cert.pem (certificate)
   # key.pem (private key)
   ```

### 2. Deploy to Production

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 3. Verify Deployment

```bash
# Check all services are running
docker-compose -f docker-compose.prod.yml ps

# Check service health
curl http://localhost/health
curl http://localhost:3000/api/health
curl http://localhost:3001/health
curl http://localhost:8080/health
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTGRES_PASSWORD` | Database password | Yes |
| `REDIS_PASSWORD` | Redis password | Yes |
| `KEYCLOAK_ADMIN` | Keycloak admin username | Yes |
| `KEYCLOAK_ADMIN_PASSWORD` | Keycloak admin password | Yes |
| `CONTRACT_ADDRESS` | Midnight contract address | Yes |
| `SECRET_KEY` | Application secret key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `ENCRYPTION_KEY` | Data encryption key | Yes |
| `LACE_WALLET_ADDRESS` | Production wallet address | Yes |
| `LACE_WALLET_PRIVATE_KEY` | Production wallet private key | Yes |

### Database Configuration

The production setup includes:
- PostgreSQL 15 with persistent storage
- Redis for caching and sessions
- Automated backups (configure separately)
- Connection pooling and optimization

### Security Configuration

- All services run as non-root users
- Security headers configured in Nginx
- Rate limiting enabled
- CORS properly configured
- SSL/TLS encryption
- Environment variables secured

## 📊 Monitoring

### Health Checks

All services include health check endpoints:
- Frontend: `GET /api/health`
- Proof Server: `GET /health`
- Keycloak: `GET /health`
- Nginx: `GET /health`

### Logging

- Centralized logging with structured format
- Log rotation configured
- Error tracking with Sentry (configure `SENTRY_DSN`)
- Performance monitoring with Datadog (configure `DATADOG_API_KEY`)

### Metrics

Key metrics to monitor:
- Authentication success rate
- API response times
- Database connection pool usage
- Memory and CPU usage
- Disk space usage

## 🔒 Security Considerations

### Production Security Checklist

- [ ] Change all default passwords
- [ ] Configure SSL certificates
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Set up monitoring and alerting
- [ ] Enable audit logging
- [ ] Configure backup strategy
- [ ] Set up intrusion detection
- [ ] Review and test security headers

### Network Security

- Use reverse proxy (Nginx) for SSL termination
- Implement proper firewall rules
- Use private networks for internal communication
- Enable DDoS protection
- Configure rate limiting

### Data Security

- Encrypt sensitive data at rest
- Use secure key management
- Implement proper access controls
- Regular security audits
- Data backup and recovery procedures

## 🚀 Scaling

### Horizontal Scaling

To scale the application:

1. **Load Balancer**: Use a load balancer (HAProxy, AWS ALB, etc.)
2. **Multiple Instances**: Run multiple instances of each service
3. **Database Scaling**: Use read replicas for PostgreSQL
4. **Caching**: Implement Redis clustering
5. **CDN**: Use a CDN for static assets

### Vertical Scaling

- Increase container resources
- Optimize database queries
- Implement connection pooling
- Use caching strategies
- Monitor and optimize performance

## 🔄 Maintenance

### Regular Tasks

- **Daily**: Check service health and logs
- **Weekly**: Review security logs and metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Security audit and penetration testing

### Backup Strategy

1. **Database Backups**: Automated daily backups
2. **Configuration Backups**: Version control all configs
3. **SSL Certificate Renewal**: Automated with Let's Encrypt
4. **Disaster Recovery**: Test recovery procedures regularly

### Updates

```bash
# Update services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Update application code
git pull origin main
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

## 🆘 Troubleshooting

### Common Issues

1. **Service Won't Start**
   - Check environment variables
   - Verify port availability
   - Check Docker logs

2. **Database Connection Issues**
   - Verify database credentials
   - Check network connectivity
   - Review connection limits

3. **SSL Certificate Issues**
   - Verify certificate validity
   - Check certificate chain
   - Ensure proper file permissions

### Debug Commands

```bash
# View service logs
docker-compose -f docker-compose.prod.yml logs -f [service-name]

# Check service status
docker-compose -f docker-compose.prod.yml ps

# Access service shell
docker-compose -f docker-compose.prod.yml exec [service-name] sh

# Check resource usage
docker stats
```

### Support

For production support:
- Check logs first
- Review monitoring dashboards
- Contact system administrator
- Escalate to development team

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [PostgreSQL Production Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Redis Production Best Practices](https://redis.io/docs/management/optimization/)
- [Keycloak Production Guide](https://www.keycloak.org/docs/latest/server_installation/)

---

**⚠️ Important**: This is a production deployment. Ensure you have proper backups, monitoring, and security measures in place before going live.
