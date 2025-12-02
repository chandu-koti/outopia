#!/bin/bash

# Quick fix script for Kubernetes secret issues
# This updates the existing secret with correct values (no quotes)

set -e

echo "========================================="
echo "Fixing Kubernetes Secret for Infrascape"
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

# Delete the existing secret
echo "Deleting existing secret..."
kubectl delete secret infrascape-website-deployment-env --ignore-not-found=true
echo "✅ Old secret deleted"
echo ""

# Generate secure secrets
echo "Generating secure secrets..."
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database URL (provided via environment)
if [ -z "${DATABASE_URL}" ]; then
  echo "❌ DATABASE_URL not set. Export DATABASE_URL before running this script."
  echo "   Example: export DATABASE_URL=\"postgresql://user:password@host:port/db?sslmode=require\""
  exit 1
fi

# Create the secret WITHOUT quotes in the values
echo "Creating new Kubernetes secret (without quotes)..."
kubectl create secret generic infrascape-website-deployment-env \
  --from-literal=DATABASE_URL="${DATABASE_URL}" \
  --from-literal=JWT_SECRET="${JWT_SECRET}" \
  --from-literal=NEXTAUTH_URL=https://infrascape.techarion.com \
  --from-literal=NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
  --from-literal=NEXT_PUBLIC_API_URL=https://infrascape.techarion.com \
  --from-literal=NODE_ENV=production

echo "✅ Secret created successfully"
echo ""

# Save secrets for backup
echo "Saving secrets backup..."
cat > .k8s-secrets-fixed.txt << EOF
# Kubernetes Secrets Backup (FIXED) - $(date)
# KEEP THIS FILE SECURE - DO NOT COMMIT TO GIT
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
NEXTAUTH_URL=https://infrascape.techarion.com
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
NEXT_PUBLIC_API_URL=https://infrascape.techarion.com
NODE_ENV=production
EOF

echo "✅ Secrets saved to .k8s-secrets-fixed.txt"
echo ""

# Restart deployment
echo "Restarting deployment to use fixed secrets..."
kubectl rollout restart deployment/infrascape-website-deployment-staging
echo "✅ Deployment restarted"
echo ""

echo "Waiting for rollout to complete..."
kubectl rollout status deployment/infrascape-website-deployment-staging
echo "✅ Rollout completed"
echo ""

# Get the new pod
POD_NAME=$(kubectl get pods -l app=infrascape-website-staging --no-headers -o custom-columns=":metadata.name" | head -1)

if [ ! -z "$POD_NAME" ]; then
    echo "New pod: $POD_NAME"
    echo ""
    echo "Checking pod logs..."
    kubectl logs "$POD_NAME" --tail=20
else
    echo "⚠️  Could not find pod. Check manually with: kubectl get pods"
fi

echo ""
echo "========================================="
echo "✅ Secret fix applied!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Wait 2-3 minutes for the pod to fully start"
echo "2. Check pod logs: kubectl logs -f $POD_NAME"
echo "3. Test the application: ./scripts/test-production-login.sh"
echo ""
echo "If migrations are needed:"
echo "kubectl exec -it $POD_NAME -- npx prisma migrate deploy"
echo ""
echo "To create admin user:"
echo "kubectl exec -it $POD_NAME -- node scripts/setup-production.js"
