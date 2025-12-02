#!/bin/bash

# Production URL
PRODUCTION_URL="https://infrascape.techarion.com"

echo "========================================="
echo "Testing Production Login System"
echo "========================================="
echo ""

# Test health endpoint
echo "1. Testing Health Endpoint..."
echo "   GET $PRODUCTION_URL/api/health"
echo ""
curl -s "$PRODUCTION_URL/api/health" | python3 -m json.tool
echo ""
echo "========================================="

# Test login with default credentials
echo ""
echo "2. Testing Login with Default Credentials..."
echo "   POST $PRODUCTION_URL/api/auth/login"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$PRODUCTION_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@infrascapes.com","password":"admin123"}' \
  -w "\nHTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo "$LOGIN_RESPONSE" | grep "HTTP_STATUS:" | cut -d':' -f2)
RESPONSE_BODY=$(echo "$LOGIN_RESPONSE" | sed '/HTTP_STATUS:/d')

echo "Response Status: $HTTP_STATUS"
echo "Response Body:"
echo "$RESPONSE_BODY" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE_BODY"
echo ""
echo "========================================="

# Provide guidance based on results
echo ""
echo "ANALYSIS:"
echo "---------"

if [ "$HTTP_STATUS" = "200" ]; then
  echo "✅ Login successful! The system is working correctly."
  echo "⚠️  IMPORTANT: Change the default password immediately!"
elif [ "$HTTP_STATUS" = "401" ]; then
  echo "⚠️  Login failed with 401 - Invalid credentials"
  echo "   This could mean:"
  echo "   - The default password was already changed (good!)"
  echo "   - The admin user doesn't exist"
  echo "   Run: node scripts/setup-production.js"
elif [ "$HTTP_STATUS" = "500" ] || [ "$HTTP_STATUS" = "503" ]; then
  echo "❌ Server error detected!"
  echo "   Common causes:"
  echo "   1. DATABASE_URL not set in production"
  echo "   2. Database connection failed"
  echo "   3. JWT_SECRET not configured"
  echo "   4. Database tables not created (migrations needed)"
  echo ""
  echo "   Recommended actions:"
  echo "   - Check environment variables in hosting platform"
  echo "   - Run: npx prisma migrate deploy"
  echo "   - Check server logs for details"
else
  echo "❌ Unexpected status: $HTTP_STATUS"
  echo "   Check if the application is deployed and running"
fi

echo ""
echo "========================================="
echo "For more detailed diagnostics, run:"
echo "  node scripts/diagnose-production.js"
echo "========================================="