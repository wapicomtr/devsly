/**
 * Devsly API - Load Testing Examples (JavaScript/Node.js)
 *
 * Requirements: Node.js 12+, axios
 * Install: npm install axios
 *
 * Get your API key from: https://devsly.io/dashboard
 */

const axios = require('axios');

class DevslyLoadTesting {
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
    async request(endpoint, method = 'GET', data = null) {
        try {
            const config = {
                method,
                url: `${this.baseUrl}${endpoint}`,
                headers: this.headers
            };

            if (data && ['POST', 'PUT'].includes(method)) {
                config.data = data;
            }

            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }
    }

    /**
     * Start Load Test
     *
     * @param {Object} config - Test configuration
     * @returns {Promise<Object>} Test information with test_id
     */
    async startTest(config) {
        const defaultConfig = {
            method: 'GET',
            duration: 60,
            concurrent_users: 10,
            ramp_up_time: 10
        };

        const testConfig = { ...defaultConfig, ...config };
        return this.request('/load-testing/start', 'POST', testConfig);
    }

    /**
     * Get Test Status
     *
     * @param {string} testId - Test ID
     * @returns {Promise<Object>} Test status
     */
    async getStatus(testId) {
        return this.request(`/load-testing/status/${testId}`);
    }

    /**
     * Stop Test
     *
     * @param {string} testId - Test ID
     * @returns {Promise<Object>} Stop confirmation
     */
    async stopTest(testId) {
        return this.request(`/load-testing/stop/${testId}`, 'POST');
    }

    /**
     * Get Test Results
     *
     * @param {string} testId - Test ID
     * @returns {Promise<Object>} Test results
     */
    async getResults(testId) {
        return this.request(`/load-testing/results/${testId}`);
    }

    /**
     * Wait for test completion
     *
     * @param {string} testId - Test ID
     * @param {number} checkInterval - Seconds between status checks
     * @param {number} timeout - Maximum wait time in seconds
     * @returns {Promise<Object>} Final test results
     */
    async waitForCompletion(testId, checkInterval = 5, timeout = 300) {
        const startTime = Date.now();

        while (Date.now() - startTime < timeout * 1000) {
            const status = await this.getStatus(testId);

            if (['completed', 'stopped', 'failed'].includes(status.status)) {
                return this.getResults(testId);
            }

            console.log(`Test status: ${status.status} - Progress: ${status.progress || 0}%`);

            await new Promise(resolve => setTimeout(resolve, checkInterval * 1000));
        }

        throw new Error('Test timeout exceeded');
    }
}

// Example Usage
(async () => {
    const api = new DevslyLoadTesting('YOUR_API_KEY');

    try {
        // Start Load Test
        console.log('Starting load test...');
        const test = await api.startTest({
            target_url: 'https://example.com',
            method: 'GET',
            duration: 30,
            concurrent_users: 10,
            ramp_up_time: 5
        });

        const testId = test.test_id;
        console.log(`Test started with ID: ${testId}\n`);

        // Wait for completion
        console.log('Waiting for test to complete...');
        const results = await api.waitForCompletion(testId);

        // Display Results
        console.log('\nTest Results:');
        console.log(`Status: ${results.status}`);
        console.log(`Total Requests: ${results.total_requests}`);
        console.log(`Successful: ${results.successful_requests}`);
        console.log(`Failed: ${results.failed_requests}`);
        console.log(`Average Response Time: ${results.avg_response_time}ms`);
        console.log(`Requests/sec: ${results.requests_per_second}`);

        if (results.percentiles) {
            console.log('\nPercentiles:');
            console.log(`p50: ${results.percentiles.p50}ms`);
            console.log(`p90: ${results.percentiles.p90}ms`);
            console.log(`p95: ${results.percentiles.p95}ms`);
            console.log(`p99: ${results.percentiles.p99}ms`);
        }

        // Example: Stop a test manually
        // await api.stopTest(testId);

    } catch (error) {
        console.error('Error:', error.message);
    }
})();

// Export for use in other modules
module.exports = DevslyLoadTesting;
