<?php
/**
 * Devsly API - Load Testing Examples (PHP)
 *
 * Requirements: PHP 7.4+, cURL extension
 * Get your API key from: https://devsly.io/dashboard
 */

class DevslyLoadTesting {
    private $apiKey;
    private $baseUrl = 'https://devsly.io/api/v1';

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    /**
     * Make API request
     */
    private function request($endpoint, $method = 'GET', $data = null) {
        $url = $this->baseUrl . $endpoint;

        $ch = curl_init();
        $headers = [
            'X-API-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ];

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_CUSTOMREQUEST => $method
        ]);

        if ($data && in_array($method, ['POST', 'PUT'])) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300) {
            throw new Exception("API request failed with code: $httpCode - Response: $response");
        }

        return json_decode($response, true);
    }

    /**
     * Start Load Test
     *
     * @param array $config Test configuration
     * @return array Test information with test_id
     */
    public function startTest($config) {
        $defaultConfig = [
            'method' => 'GET',
            'duration' => 60,
            'concurrent_users' => 10,
            'ramp_up_time' => 10
        ];

        $config = array_merge($defaultConfig, $config);

        return $this->request('/load-testing/start', 'POST', $config);
    }

    /**
     * Get Test Status
     *
     * @param string $testId Test ID
     * @return array Test status
     */
    public function getStatus($testId) {
        return $this->request("/load-testing/status/{$testId}");
    }

    /**
     * Stop Test
     *
     * @param string $testId Test ID
     * @return array Stop confirmation
     */
    public function stopTest($testId) {
        return $this->request("/load-testing/stop/{$testId}", 'POST');
    }

    /**
     * Get Test Results
     *
     * @param string $testId Test ID
     * @return array Test results
     */
    public function getResults($testId) {
        return $this->request("/load-testing/results/{$testId}");
    }

    /**
     * Wait for test completion
     *
     * @param string $testId Test ID
     * @param int $checkInterval Seconds between status checks
     * @param int $timeout Maximum wait time
     * @return array Final test results
     */
    public function waitForCompletion($testId, $checkInterval = 5, $timeout = 300) {
        $startTime = time();

        while (time() - $startTime < $timeout) {
            $status = $this->getStatus($testId);

            if (in_array($status['status'], ['completed', 'stopped', 'failed'])) {
                return $this->getResults($testId);
            }

            echo "Test status: {$status['status']} - Progress: {$status['progress']}%\n";
            sleep($checkInterval);
        }

        throw new Exception("Test timeout exceeded");
    }
}

// Example Usage
try {
    $api = new DevslyLoadTesting('YOUR_API_KEY');

    // Start Load Test
    echo "Starting load test...\n";
    $test = $api->startTest([
        'target_url' => 'https://example.com',
        'method' => 'GET',
        'duration' => 30,
        'concurrent_users' => 10,
        'ramp_up_time' => 5
    ]);

    $testId = $test['test_id'];
    echo "Test started with ID: {$testId}\n\n";

    // Wait for completion
    echo "Waiting for test to complete...\n";
    $results = $api->waitForCompletion($testId);

    // Display Results
    echo "\nTest Results:\n";
    echo "Status: {$results['status']}\n";
    echo "Total Requests: {$results['total_requests']}\n";
    echo "Successful: {$results['successful_requests']}\n";
    echo "Failed: {$results['failed_requests']}\n";
    echo "Average Response Time: {$results['avg_response_time']}ms\n";
    echo "Requests/sec: {$results['requests_per_second']}\n";

    if (isset($results['percentiles'])) {
        echo "\nPercentiles:\n";
        echo "p50: {$results['percentiles']['p50']}ms\n";
        echo "p90: {$results['percentiles']['p90']}ms\n";
        echo "p95: {$results['percentiles']['p95']}ms\n";
        echo "p99: {$results['percentiles']['p99']}ms\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
