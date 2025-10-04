/**
 * Devsly API - Network Tools Examples (JavaScript/Node.js)
 *
 * Requirements: Node.js 12+, axios
 * Install: npm install axios
 *
 * Get your API key from: https://devsly.io/dashboard
 */

const axios = require('axios');

class DevslyNetworkTools {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://devsly.io/api/v1';
        this.headers = {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Make API request
     */
    async request(endpoint, params = {}) {
        try {
            const response = await axios.get(`${this.baseUrl}${endpoint}`, {
                headers: this.headers,
                params: params
            });
            return response.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }
    }

    /**
     * WHOIS Lookup
     *
     * @param {string} domain - Domain name to lookup
     * @returns {Promise<Object>} WHOIS information
     */
    async whoisLookup(domain) {
        return this.request('/network/whois', { domain });
    }

    /**
     * DNS Lookup
     *
     * @param {string} domain - Domain name to lookup
     * @param {string} type - Record type (A, AAAA, MX, NS, TXT, CNAME, SOA)
     * @returns {Promise<Object>} DNS records
     */
    async dnsLookup(domain, type = 'A') {
        return this.request('/network/dns-lookup', { domain, type });
    }

    /**
     * IP Information
     *
     * @param {string|null} ip - IP address (null for current IP)
     * @returns {Promise<Object>} IP information
     */
    async ipInfo(ip = null) {
        const params = ip ? { ip } : {};
        return this.request('/network/ip-info', params);
    }
}

// Example Usage
(async () => {
    const api = new DevslyNetworkTools('YOUR_API_KEY');

    try {
        // WHOIS Lookup
        console.log('WHOIS Lookup for google.com:');
        const whois = await api.whoisLookup('google.com');
        console.log(`Registrar: ${whois.registrar || 'N/A'}`);
        console.log(`Creation Date: ${whois.creation_date || 'N/A'}`);
        console.log();

        // DNS Lookup
        console.log('DNS Lookup for github.com (A records):');
        const dns = await api.dnsLookup('github.com', 'A');
        if (dns.success && dns.records) {
            dns.records.forEach(record => console.log(`  ${record}`));
        }
        console.log();

        // DNS MX Records
        console.log('DNS Lookup for gmail.com (MX records):');
        const mx = await api.dnsLookup('gmail.com', 'MX');
        if (mx.success && mx.records) {
            mx.records.forEach(record => console.log(`  ${record}`));
        }
        console.log();

        // IP Information
        console.log('IP Information for 8.8.8.8:');
        const ipInfo = await api.ipInfo('8.8.8.8');
        console.log(`IP: ${ipInfo.ip || 'N/A'}`);
        console.log(`Country: ${ipInfo.country || 'N/A'}`);
        console.log(`City: ${ipInfo.city || 'N/A'}`);
        console.log(`ISP: ${ipInfo.isp || 'N/A'}`);
        console.log();

        // Current IP Information
        console.log('Current IP Information:');
        const current = await api.ipInfo();
        console.log(`Your IP: ${current.ip || 'N/A'}`);
        console.log(`Country: ${current.country || 'N/A'}`);

    } catch (error) {
        console.error('Error:', error.message);
    }
})();

// Export for use in other modules
module.exports = DevslyNetworkTools;
