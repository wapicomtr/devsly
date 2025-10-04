# Devsly API - Code Examples

Complete code examples for using the Devsly API across multiple programming languages.

## Prerequisites

1. **Get your API key**: Sign up at [devsly.io](https://devsly.io) and get your API key from the [dashboard](https://devsly.io/dashboard)
2. **Replace `YOUR_API_KEY`**: All examples use `YOUR_API_KEY` as a placeholder - replace it with your actual API key

## Available Examples

### cURL (Shell Scripts)
Simple bash scripts you can run directly from terminal.

- **network-tools.sh** - WHOIS, DNS, and IP information lookups
- **load-testing.sh** - Complete load testing workflow

```bash
# Make scripts executable
chmod +x curl/*.sh

# Replace YOUR_API_KEY with your actual key
sed -i 's/YOUR_API_KEY/your_actual_key_here/g' curl/*.sh

# Run examples
./curl/network-tools.sh
./curl/load-testing.sh
```

### PHP
Object-oriented PHP classes for easy integration.

**Requirements**: PHP 7.4+, cURL extension

- **NetworkTools.php** - Network diagnostic tools
- **LoadTesting.php** - Load testing client

```bash
# Run examples
php php/NetworkTools.php
php php/LoadTesting.php
```

### Python
Clean Python classes with type hints.

**Requirements**: Python 3.6+, requests library

```bash
# Install dependencies
pip install requests

# Run examples
python python/network_tools.py
python python/load_testing.py
```

### JavaScript/Node.js
Modern async/await JavaScript code.

**Requirements**: Node.js 12+, axios

```bash
# Install dependencies
npm install axios

# Run examples
node javascript/network-tools.js
node javascript/load-testing.js
```

## API Endpoints

### Network Tools

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/network/whois` | GET | WHOIS domain lookup |
| `/api/v1/network/dns-lookup` | GET | DNS record lookup |
| `/api/v1/network/ip-info` | GET | IP address information |

### Load Testing

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/load-testing/start` | POST | Start a load test |
| `/api/v1/load-testing/status/{id}` | GET | Get test status |
| `/api/v1/load-testing/stop/{id}` | POST | Stop a running test |
| `/api/v1/load-testing/results/{id}` | GET | Get test results |

## Authentication

All API requests require authentication using your API key. You can provide it in two ways:

**Method 1: X-API-Key Header (Recommended)**
```bash
curl -H "X-API-Key: YOUR_API_KEY" https://devsly.io/api/v1/...
```

**Method 2: Authorization Bearer Token**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://devsly.io/api/v1/...
```

## Rate Limits

Different subscription plans have different rate limits:

- **Free Plan**: 100 requests/day
- **Pro Plan**: 10,000 requests/day
- **Enterprise Plan**: Unlimited requests

## Error Handling

All examples include proper error handling. The API returns standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid or missing API key)
- `429` - Rate limit exceeded
- `500` - Internal server error

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success",
  "timestamp": "2025-10-04T12:00:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-10-04T12:00:00Z"
}
```

## Support

- **Documentation**: https://devsly.io/api/docs
- **Dashboard**: https://devsly.io/dashboard
- **GitHub Issues**: https://github.com/wapicomtr/devsly-api-examples/issues

## License

These examples are provided as-is for use with the Devsly API platform.
