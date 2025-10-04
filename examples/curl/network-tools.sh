#!/bin/bash
# Devsly API - Network Tools Examples (cURL)
# Replace YOUR_API_KEY with your actual API key from https://devsly.io/dashboard

API_KEY="YOUR_API_KEY"
BASE_URL="https://devsly.io/api/v1"

echo "==================================="
echo "Devsly API - Network Tools Examples"
echo "==================================="
echo ""

# WHOIS Lookup
echo "1. WHOIS Lookup for google.com"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/network/whois?domain=google.com" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json"
echo -e "\n"

# DNS Lookup
echo "2. DNS Lookup for github.com"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/network/dns-lookup?domain=github.com&type=A" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json"
echo -e "\n"

# DNS Lookup with multiple record types
echo "3. DNS Lookup for cloudflare.com (MX records)"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/network/dns-lookup?domain=cloudflare.com&type=MX" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json"
echo -e "\n"

# IP Information
echo "4. IP Information for 8.8.8.8"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/network/ip-info?ip=8.8.8.8" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json"
echo -e "\n"

# IP Information for current IP
echo "5. IP Information for current IP"
echo "-----------------------------------"
curl -X GET "${BASE_URL}/network/ip-info" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Content-Type: application/json"
echo -e "\n"

echo "==================================="
echo "All examples completed!"
echo "==================================="
