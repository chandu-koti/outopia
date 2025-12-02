#!/bin/bash

# Script to apply Kubernetes secrets for Infrascape Website
# Usage: ./scripts/apply-k8s-secrets.sh

set -e

echo "========================================="
echo "Kubernetes Secrets Setup for Infrascape"
echo "========================================="
echo ""

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install it first."
    exit 1
fi

# Check if connected to cluster
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Not connected to Kubernetes cluster."
    echo "   Run: doctl kubernetes cluster kubeconfig save techarion-production-dev"
    exit 1
fi

echo "✅ Connected to Kubernetes cluster"
echo ""

# Check if secret already exists
if kubectl get secret infrascape-website-deployment-env &> /dev/null; then
    echo "⚠️  Secret 'infrascape-website-deployment-env' already exists."
    read -p "Do you want to delete and recreate it? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kubectl delete secret infrascape-website-deployment-env
        echo "✅ Old secret deleted"
    else
        echo "Exiting without changes."
        exit 0
    fi
fi

# Generate secure secrets if not provided
echo ""
echo "Generating secure secrets..."
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "✅ Generated JWT_SECRET"
echo "✅ Generated NEXTAUTH_SECRET"
echo ""

# Database URL (provided via environment)
if [ -z "${DATABASE_URL}" ]; then
  echo "❌ DATABASE_URL not set. Export DATABASE_URL before running this script."
  echo "   Example: export DATABASE_URL=\"postgresql://user:password@host:port/db?sslmode=require\""
  exit 1
fi

# Create the secret
echo "Creating Kubernetes secret..."
kubectl create secret generic infrascape-website-deployment-env \
  --from-literal=DATABASE_URL="${DATABASE_URL}" \
  --from-literal=JWT_SECRET="${JWT_SECRET}" \
  --from-literal=NEXTAUTH_URL=https://infrascape.techarion.com \
  --from-literal=NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
  --from-literal=NEXT_PUBLIC_API_URL=https://infrascape.techarion.com \
  --from-literal=NODE_ENV=production

echo "✅ Secret created successfully"
echo ""

# Save secrets to local file (for backup)
echo "Saving secrets to local file (for your records)..."
cat > .k8s-secrets-backup.txt << EOF
# Kubernetes Secrets Backup - $(date)
# KEEP THIS FILE SECURE - DO NOT COMMIT TO GIT
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
NEXTAUTH_URL=https://infrascape.techarion.com
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXT_PUBLIC_API_URL=https://infrascape.techarion.com
NODE_ENV=production
EOF

echo "✅ Secrets saved to .k8s-secrets-backup.txt"
echo ""

# Verify secret creation
echo "Verifying secret..."
kubectl describe secret infrascape-website-deployment-env | grep -E "^Name:|^Namespace:|^Data"
echo ""

# Restart deployment to use new secrets
read -p "Do you want to restart the deployment to use new secrets? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Restarting deployment..."
    kubectl rollout restart deployment/infrascape-website-deployment-staging
    echo "✅ Deployment restarted"
    echo ""
    echo "Waiting for rollout to complete..."
    kubectl rollout status deployment/infrascape-website-deployment-staging
    echo "✅ Rollout completed"
else
    echo "Deployment not restarted. Run manually when ready:"
    echo "kubectl rollout restart deployment/infrascape-website-deployment-staging"
fi

echo ""
echo "========================================="
echo "✅ Kubernetes secrets setup complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Wait 2-3 minutes for the pod to restart"
echo "2. Run database migrations:"
echo "   kubectl exec -it \$(kubectl get pods | grep infrascape | awk '{print \$1}') -- npx prisma migrate deploy"
echo "3. Create admin user:"
echo "   kubectl exec -it \$(kubectl get pods | grep infrascape | awk '{print \$1}') -- node scripts/setup-production.js"
echo "4. Test the application:"
echo "   ./scripts/test-production-login.sh"
echo ""
echo "⚠️  IMPORTANT: Keep .k8s-secrets-backup.txt secure and don't commit it to Git!"
