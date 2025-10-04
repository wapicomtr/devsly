<?php
/**
 * Devsly API - Network Tools Examples (PHP)
 *
 * Requirements: PHP 7.4+, cURL extension
 * Get your API key from: https://devsly.io/dashboard
 */

class DevslyNetworkTools {
    private $apiKey;
    private $baseUrl = 'https://devsly.io/api/v1';

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    /**
     * Make API request
     */
    private function request($endpoint, $params = []) {
        $url = $this->baseUrl . $endpoint;

        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'X-API-Key: ' . $this->apiKey,
                'Content-Type: application/json'
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception("API request failed with code: $httpCode");
        }

        return json_decode($response, true);
    }

    /**
     * WHOIS Lookup
     *
     * @param string $domain Domain name to lookup
     * @return array WHOIS information
     */
    public function whoisLookup($domain) {
        return $this->request('/network/whois', ['domain' => $domain]);
    }

    /**
     * DNS Lookup
     *
     * @param string $domain Domain name to lookup
     * @param string $type Record type (A, AAAA, MX, NS, TXT, CNAME, SOA)
     * @return array DNS records
     */
    public function dnsLookup($domain, $type = 'A') {
        return $this->request('/network/dns-lookup', [
            'domain' => $domain,
            'type' => $type
        ]);
    }

    /**
     * IP Information
     *
     * @param string|null $ip IP address (null for current IP)
     * @return array IP information
     */
    public function ipInfo($ip = null) {
        $params = $ip ? ['ip' => $ip] : [];
        return $this->request('/network/ip-info', $params);
    }
}

// Example Usage
try {
    $api = new DevslyNetworkTools('YOUR_API_KEY');

    // WHOIS Lookup
    echo "WHOIS Lookup for google.com:\n";
    $whois = $api->whoisLookup('google.com');
    print_r($whois);
    echo "\n";

    // DNS Lookup
    echo "DNS Lookup for github.com (A records):\n";
    $dns = $api->dnsLookup('github.com', 'A');
    print_r($dns);
    echo "\n";

    // IP Information
    echo "IP Information for 8.8.8.8:\n";
    $ipInfo = $api->ipInfo('8.8.8.8');
    print_r($ipInfo);
    echo "\n";

    // Current IP Information
    echo "Current IP Information:\n";
    $currentIp = $api->ipInfo();
    print_r($currentIp);

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
