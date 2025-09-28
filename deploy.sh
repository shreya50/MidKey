#!/bin/bash

# MidKey Production Deployment Script
set -e

echo "Starting MidKey Production Deployment..."

# Check if required environment file exists
if [ ! -f "production.env" ]; then
    echo "Error: production.env file not found!"
    echo "Please create production.env with your production configuration."
    exit 1
fi

# Load environment variables
export $(cat production.env | grep -v '^#' | xargs)

# Check required environment variables
required_vars=(
    "POSTGRES_PASSWORD"
    "REDIS_PASSWORD"
    "KEYCLOAK_ADMIN"
    "KEYCLOAK_ADMIN_PASSWORD"
    "CONTRACT_ADDRESS"
    "SECRET_KEY"
    "JWT_SECRET"
    "ENCRYPTION_KEY"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Required environment variable $var is not set!"
        exit 1
    fi
done

echo "Environment variables validated"

# Create necessary directories
mkdir -p ssl
mkdir -p logs

# Stop existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Remove old images (optional, uncomment if needed)
# echo "Cleaning up old images..."
# docker image prune -f

# Build and start services
echo "Building and starting services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 30

# Check service health
echo "Checking service health..."

# Check PostgreSQL
if ! docker exec midkey-postgres pg_isready -U midkey; then
    echo "PostgreSQL is not ready"
    exit 1
fi
echo "PostgreSQL is healthy"

# Check Redis
if ! docker exec midkey-redis redis-cli ping | grep -q PONG; then
    echo "Redis is not ready"
    exit 1
fi
echo "Redis is healthy"

# Check Keycloak
if ! curl -f http://localhost:8080/health > /dev/null 2>&1; then
    echo "Keycloak is not ready"
    exit 1
fi
echo "Keycloak is healthy"

# Check Proof Server
if ! curl -f http://localhost:3001/health > /dev/null 2>&1; then
    echo "Proof Server is not ready"
    exit 1
fi
echo "Proof Server is healthy"

# Check Frontend
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "Frontend is not ready"
    exit 1
fi
echo "Frontend is healthy"

# Check Nginx
if ! curl -f http://localhost/health > /dev/null 2>&1; then
    echo "Nginx is not ready"
    exit 1
fi
echo "Nginx is healthy"

echo ""
echo "MidKey Production Deployment Successful!"
echo ""
echo "Service Status:"
echo "  - Frontend: http://localhost:3000"
echo "  - API: http://localhost:3001"
echo "  - Keycloak: http://localhost:8080"
echo "  - Nginx: http://localhost"
echo ""
echo "Management Commands:"
echo "  - View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "  - Stop services: docker-compose -f docker-compose.prod.yml down"
echo "  - Restart services: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo "Remember to:"
echo "  - Set up SSL certificates in ./ssl/"
echo "  - Configure your domain DNS"
echo "  - Set up monitoring and backups"
echo "  - Review security settings"
