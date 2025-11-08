# Devsly API Documentation

> Complete API reference for Devsly - Free online developer tools platform

**Base URL**: `https://devsly.io`
**Documentation**: https://devsly.io/api/docs
**Dashboard**: https://devsly.io/dashboard

---

## Table of Contents

- [Authentication](#authentication)
- [Rate Limits](#rate-limits)
- [Response Format](#response-format)
- [Error Codes](#error-codes)
- [Network Tools](#network-tools)
  - [WHOIS Lookup](#whois-lookup)
  - [DNS Lookup](#dns-lookup)
  - [IP Information](#ip-information)
  - [HTTP Status Checker](#http-status-checker)
  - [Port Scanner](#port-scanner)
  - [SSL Certificate Check](#ssl-certificate-check)
- [Load Testing](#load-testing)
  - [Start Load Test](#start-load-test)
  - [Get Test Status](#get-test-status)
  - [Stop Load Test](#stop-load-test)
  - [Get Test Results](#get-test-results)
- [Developer Tools](#developer-tools)
  - [JSON Formatter](#json-formatter)
  - [Base64 Encode/Decode](#base64-encodedecode)
  - [Hash Generator](#hash-generator)
  - [SQL Formatter](#sql-formatter)
  - [UUID Generator](#uuid-generator)
  - [QR Code Generator](#qr-code-generator)
  - [Regex Tester](#regex-tester)
  - [JWT Decoder](#jwt-decoder)
- [Code Analysis](#code-analysis)
  - [Dockerfile Scanner](#dockerfile-scanner)
- [Code Examples](#code-examples)

---

## Authentication

All API requests require authentication using your API key. Get your API key from the [dashboard](https://devsly.io/dashboard).

### Method 1: X-API-Key Header (Recommended)

```bash
curl -H "X-API-Key: YOUR_API_KEY" https://devsly.io/api/v1/...
```

### Method 2: Authorization Bearer Token

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://devsly.io/api/v1/...
```

---

## Rate Limits

| Plan | Requests per Day |
|------|------------------|
| **Free** | 100 requests/day |
| **Pro** | 10,000 requests/day |
| **Enterprise** | Unlimited |

Rate limit headers are included in every response:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests remaining
- `X-RateLimit-Reset` - Time when limit resets (Unix timestamp)

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Success",
  "timestamp": "2025-11-08T12:00:00Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-11-08T12:00:00Z"
}
```

---

## Error Codes

| HTTP Status | Code | Description |
|------------|------|-------------|
| 200 | `SUCCESS` | Request successful |
| 400 | `BAD_REQUEST` | Invalid parameters |
| 401 | `UNAUTHORIZED` | Invalid or missing API key |
| 403 | `FORBIDDEN` | Access denied |
| 404 | `NOT_FOUND` | Resource not found |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

---

# Network Tools

## WHOIS Lookup

Get WHOIS information for a domain.

**Endpoint**: `GET /api/v1/network/whois`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | Yes | Domain name to lookup |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/network/whois?domain=google.com" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "domain": "google.com",
    "registrar": "MarkMonitor Inc.",
    "creation_date": "1997-09-15",
    "expiration_date": "2028-09-14",
    "name_servers": [
      "ns1.google.com",
      "ns2.google.com",
      "ns3.google.com",
      "ns4.google.com"
    ],
    "status": ["clientDeleteProhibited", "clientTransferProhibited"],
    "registrant": {
      "organization": "Google LLC",
      "country": "US"
    }
  }
}
```

---

## DNS Lookup

Perform DNS record lookups for a domain.

**Endpoint**: `GET /api/v1/network/dns-lookup`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | Yes | Domain name to lookup |
| `type` | string | No | Record type (A, AAAA, MX, TXT, CNAME, NS, SOA, SRV). Default: A |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/network/dns-lookup?domain=google.com&type=A" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "domain": "google.com",
    "type": "A",
    "records": [
      {
        "ip": "142.250.185.46",
        "ttl": 300
      }
    ]
  }
}
```

---

## IP Information

Get detailed information about an IP address including geolocation.

**Endpoint**: `GET /api/v1/network/ip-info`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ip` | string | Yes | IP address to lookup |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/network/ip-info?ip=8.8.8.8" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "ip": "8.8.8.8",
    "hostname": "dns.google",
    "city": "Mountain View",
    "region": "California",
    "country": "US",
    "location": {
      "latitude": 37.386,
      "longitude": -122.0838
    },
    "organization": "Google LLC",
    "asn": "AS15169",
    "timezone": "America/Los_Angeles"
  }
}
```

---

## HTTP Status Checker

Check HTTP status code and response time for a URL.

**Endpoint**: `GET /api/v1/network/http-status`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL to check |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/network/http-status?url=https://google.com" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "url": "https://google.com",
    "status_code": 200,
    "status_text": "OK",
    "response_time": 245,
    "final_url": "https://www.google.com/",
    "redirects": 1,
    "headers": {
      "content-type": "text/html; charset=UTF-8",
      "server": "gws"
    }
  }
}
```

---

## Port Scanner

Scan ports on a target host.

**Endpoint**: `POST /api/v1/network/port-scan`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `host` | string | Yes | Target host (IP or domain) |
| `ports` | string | Yes | Ports to scan (e.g., "80,443" or "1-1000") |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/network/port-scan" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "google.com",
    "ports": "80,443,8080"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "host": "google.com",
    "scan_time": "2025-11-08T12:00:00Z",
    "ports": [
      {
        "port": 80,
        "status": "open",
        "service": "http"
      },
      {
        "port": 443,
        "status": "open",
        "service": "https"
      },
      {
        "port": 8080,
        "status": "closed"
      }
    ]
  }
}
```

---

## SSL Certificate Check

Check SSL certificate information for a domain.

**Endpoint**: `GET /api/v1/network/ssl-check`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | Yes | Domain to check SSL certificate |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/network/ssl-check?domain=google.com" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "domain": "google.com",
    "valid": true,
    "issuer": "GTS CA 1C3",
    "issued_date": "2025-10-01T00:00:00Z",
    "expiry_date": "2025-12-24T00:00:00Z",
    "days_until_expiry": 46,
    "subject": "*.google.com",
    "san": ["*.google.com", "google.com"],
    "serial_number": "0A1B2C3D4E5F",
    "signature_algorithm": "SHA256-RSA"
  }
}
```

---

# Load Testing

## Start Load Test

Initiate a load test for a URL.

**Endpoint**: `POST /api/v1/load-testing/start`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | Target URL to test |
| `duration` | integer | Yes | Test duration in seconds (1-300) |
| `users` | integer | Yes | Number of concurrent users (1-1000) |
| `rampup` | integer | No | Ramp-up time in seconds. Default: 0 |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/load-testing/start" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "duration": 60,
    "users": 100,
    "rampup": 10
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "test_id": "lt_1234567890abcdef",
    "status": "running",
    "url": "https://example.com",
    "duration": 60,
    "users": 100,
    "started_at": "2025-11-08T12:00:00Z"
  }
}
```

---

## Get Test Status

Get the current status of a running load test.

**Endpoint**: `GET /api/v1/load-testing/status/{id}`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Test ID (path parameter) |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/load-testing/status/lt_1234567890abcdef" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "test_id": "lt_1234567890abcdef",
    "status": "running",
    "progress": 45,
    "elapsed_time": 27,
    "current_users": 100,
    "requests_completed": 2450
  }
}
```

---

## Stop Load Test

Stop a running load test.

**Endpoint**: `POST /api/v1/load-testing/stop/{id}`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Test ID (path parameter) |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/load-testing/stop/lt_1234567890abcdef" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "test_id": "lt_1234567890abcdef",
    "status": "stopped",
    "stopped_at": "2025-11-08T12:00:30Z"
  }
}
```

---

## Get Test Results

Get detailed results from a completed load test.

**Endpoint**: `GET /api/v1/load-testing/results/{id}`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Test ID (path parameter) |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/load-testing/results/lt_1234567890abcdef" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "test_id": "lt_1234567890abcdef",
    "url": "https://example.com",
    "status": "completed",
    "started_at": "2025-11-08T12:00:00Z",
    "completed_at": "2025-11-08T12:01:00Z",
    "duration": 60,
    "users": 100,
    "summary": {
      "total_requests": 5420,
      "successful_requests": 5380,
      "failed_requests": 40,
      "requests_per_second": 90.33,
      "avg_response_time": 245,
      "min_response_time": 98,
      "max_response_time": 1250,
      "error_rate": 0.74
    },
    "response_time_percentiles": {
      "p50": 220,
      "p75": 280,
      "p90": 380,
      "p95": 520,
      "p99": 890
    },
    "status_codes": {
      "200": 5380,
      "500": 25,
      "503": 15
    }
  }
}
```

---

# Developer Tools

## JSON Formatter

Format and validate JSON data.

**Endpoint**: `POST /api/v1/developer/json-format`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `json` | string | Yes | JSON string to format |
| `indent` | integer | No | Indentation spaces (2 or 4). Default: 2 |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/json-format" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "json": "{\"name\":\"John\",\"age\":30}",
    "indent": 2
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "formatted": "{\n  \"name\": \"John\",\n  \"age\": 30\n}",
    "valid": true,
    "size": 25
  }
}
```

---

## Base64 Encode/Decode

Encode or decode Base64 strings.

**Endpoint**: `POST /api/v1/developer/base64`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to encode/decode |
| `action` | string | Yes | Action: "encode" or "decode" |

### Example Request (Encode)

```bash
curl -X POST "https://devsly.io/api/v1/developer/base64" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello World",
    "action": "encode"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "input": "Hello World",
    "output": "SGVsbG8gV29ybGQ=",
    "action": "encode"
  }
}
```

---

## Hash Generator

Generate cryptographic hashes.

**Endpoint**: `POST /api/v1/developer/hash`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to hash |
| `algorithm` | string | Yes | Algorithm: md5, sha1, sha256, sha512 |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/hash" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello World",
    "algorithm": "sha256"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "input": "Hello World",
    "algorithm": "sha256",
    "hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
  }
}
```

---

## SQL Formatter

Format SQL queries.

**Endpoint**: `POST /api/v1/developer/sql-format`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | string | Yes | SQL query to format |
| `indent` | integer | No | Indentation spaces (2 or 4). Default: 2 |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/sql-format" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sql": "SELECT * FROM users WHERE id=1",
    "indent": 2
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "formatted": "SELECT\n  *\nFROM\n  users\nWHERE\n  id = 1"
  }
}
```

---

## UUID Generator

Generate UUIDs (v1 or v4).

**Endpoint**: `GET /api/v1/developer/uuid`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `version` | string | No | UUID version: "v1" or "v4". Default: v4 |
| `count` | integer | No | Number of UUIDs to generate (1-100). Default: 1 |

### Example Request

```bash
curl -X GET "https://devsly.io/api/v1/developer/uuid?version=v4&count=3" \
  -H "X-API-Key: YOUR_API_KEY"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "version": "v4",
    "count": 3,
    "uuids": [
      "550e8400-e29b-41d4-a716-446655440000",
      "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "7c9e6679-7425-40de-944b-e07fc1f90ae7"
    ]
  }
}
```

---

## QR Code Generator

Generate QR codes.

**Endpoint**: `POST /api/v1/developer/qr-code`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to encode in QR code |
| `size` | integer | No | QR code size in pixels (100-1000). Default: 300 |
| `format` | string | No | Output format: "png" or "svg". Default: png |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/qr-code" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "https://devsly.io",
    "size": 300,
    "format": "png"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "text": "https://devsly.io",
    "size": 300,
    "format": "png",
    "image_url": "https://devsly.io/temp/qr_abc123.png",
    "base64": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  }
}
```

---

## Regex Tester

Test regular expressions against text.

**Endpoint**: `POST /api/v1/developer/regex-test`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pattern` | string | Yes | Regular expression pattern |
| `text` | string | Yes | Text to test against |
| `flags` | string | No | Regex flags (g, i, m, s, u, y) |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/regex-test" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "pattern": "\\d+",
    "text": "Price: 123 USD",
    "flags": "g"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "pattern": "\\d+",
    "flags": "g",
    "matches": [
      {
        "match": "123",
        "index": 7,
        "groups": []
      }
    ],
    "match_count": 1
  }
}
```

---

## JWT Decoder

Decode and validate JWT tokens.

**Endpoint**: `POST /api/v1/developer/jwt-decode`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | JWT token to decode |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/developer/jwt-decode" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "header": {
      "alg": "HS256",
      "typ": "JWT"
    },
    "payload": {
      "sub": "1234567890",
      "name": "John Doe",
      "iat": 1516239022
    },
    "valid_structure": true
  }
}
```

---

# Code Analysis

## Dockerfile Scanner

Scan Dockerfile for security issues and best practices.

**Endpoint**: `POST /api/v1/code-analysis/dockerfile-scan`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dockerfile` | string | Yes | Dockerfile content to scan |

### Example Request

```bash
curl -X POST "https://devsly.io/api/v1/code-analysis/dockerfile-scan" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "dockerfile": "FROM ubuntu:latest\nRUN apt-get update"
  }'
```

### Example Response

```json
{
  "success": true,
  "data": {
    "score": 65,
    "issues": [
      {
        "line": 1,
        "severity": "warning",
        "message": "Using 'latest' tag is not recommended",
        "recommendation": "Use specific version tags"
      },
      {
        "line": 2,
        "severity": "info",
        "message": "Consider combining RUN commands to reduce layers",
        "recommendation": "Combine with && to reduce image size"
      }
    ],
    "best_practices": [
      "Use specific version tags instead of 'latest'",
      "Combine RUN commands with && to reduce layers",
      "Use multi-stage builds when possible",
      "Add .dockerignore file"
    ]
  }
}
```

---

# Code Examples

Complete code examples are available in the `/examples` directory:

- **cURL** - Shell scripts for quick testing
- **PHP** - Object-oriented PHP classes
- **Python** - Python classes with type hints
- **JavaScript/Node.js** - Modern async/await code

See [examples/README.md](examples/README.md) for detailed usage instructions.

### Quick Start

```bash
# Get your API key
# Visit: https://devsly.io/dashboard

# Test with cURL
curl -X GET "https://devsly.io/api/v1/network/whois?domain=google.com" \
  -H "X-API-Key: YOUR_API_KEY"

# Run examples
cd examples
chmod +x curl/*.sh
./curl/network-tools.sh
```

---

## Support & Resources

- **API Documentation**: https://devsly.io/api/docs
- **Dashboard**: https://devsly.io/dashboard
- **GitHub Organization**: https://github.com/wapicomtr
- **GitHub Issues**: https://github.com/wapicomtr/devsly/issues

---

## License

This documentation and examples are provided for use with the Devsly API platform.

---

**Last Updated**: 2025-11-08
