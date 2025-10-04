#!/bin/bash
# Devsly API - Load Testing Examples (cURL)
# Replace YOUR_API_KEY with your actual API key from https://devsly.io/dashboard

API_KEY="YOUR_API_KEY"
BASE_URL="https://devsly.io/api/v1"

echo "==================================="
echo "Devsly API - Load Testing Examples"
echo "==================================="
echo ""

# Start Load Test
echo "1. Starting Load Test"
echo "-----------------------------------"
RESPONSE=$(curl -s -X POST "${BASE_URL}/load-testing/start" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "target_url": "https://example.com",
    "method": "GET",
    "duration": 30,
    "concurrent_users": 10,
    "ramp_up_time": 5
  }')

echo "$RESPONSE"
TEST_ID=$(echo "$RESPONSE" | grep -o '"test_id":"[^"]*' | cut -d'"' -f4)
echo -e "\nTest ID: $TEST_ID\n"

# Check Test Status
if [ -n "$TEST_ID" ]; then
  echo "2. Checking Test Status"
  echo "-----------------------------------"
  curl -X GET "${BASE_URL}/load-testing/status/${TEST_ID}" \
    -H "X-API-Key: ${API_KEY}" \
    -H "Content-Type: application/json"
  echo -e "\n"

  # Wait for test to complete
  echo "3. Waiting for test to complete (30 seconds)..."
  echo "-----------------------------------"
  sleep 35

  # Get Test Results
  echo "4. Getting Test Results"
  echo "-----------------------------------"
  curl -X GET "${BASE_URL}/load-testing/results/${TEST_ID}" \
    -H "X-API-Key: ${API_KEY}" \
    -H "Content-Type: application/json"
  echo -e "\n"
fi

# Example: Stop a running test
echo "5. Example: Stop Load Test (if still running)"
echo "-----------------------------------"
echo "To stop a test manually, use:"
echo "curl -X POST \"${BASE_URL}/load-testing/stop/TEST_ID\" \\"
echo "  -H \"X-API-Key: ${API_KEY}\" \\"
echo "  -H \"Content-Type: application/json\""
echo ""

echo "==================================="
echo "Load Testing examples completed!"
echo "==================================="
