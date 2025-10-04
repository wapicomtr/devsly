"""
Devsly API - Load Testing Examples (Python)

Requirements: Python 3.6+, requests library
Install: pip install requests

Get your API key from: https://devsly.io/dashboard
"""

import requests
import time
from typing import Dict, Any, Optional


class DevslyLoadTesting:
    """Devsly Load Testing API Client"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://devsly.io/api/v1"
        self.headers = {
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        }

    def _request(self, endpoint: str, method: str = "GET", data: Optional[Dict] = None) -> Dict[Any, Any]:
        """Make API request"""
        url = f"{self.base_url}{endpoint}"

        if method == "GET":
            response = requests.get(url, headers=self.headers)
        elif method == "POST":
            response = requests.post(url, headers=self.headers, json=data)
        else:
            raise ValueError(f"Unsupported method: {method}")

        response.raise_for_status()
        return response.json()

    def start_test(self, config: Dict[str, Any]) -> Dict[Any, Any]:
        """
        Start Load Test

        Args:
            config: Test configuration
                - target_url (required): URL to test
                - method: HTTP method (default: GET)
                - duration: Test duration in seconds (default: 60)
                - concurrent_users: Number of concurrent users (default: 10)
                - ramp_up_time: Ramp-up time in seconds (default: 10)
                - headers: Custom headers (optional)
                - body: Request body (optional)

        Returns:
            Test information with test_id
        """
        default_config = {
            "method": "GET",
            "duration": 60,
            "concurrent_users": 10,
            "ramp_up_time": 10
        }

        config = {**default_config, **config}
        return self._request("/load-testing/start", "POST", config)

    def get_status(self, test_id: str) -> Dict[Any, Any]:
        """
        Get Test Status

        Args:
            test_id: Test ID

        Returns:
            Test status
        """
        return self._request(f"/load-testing/status/{test_id}")

    def stop_test(self, test_id: str) -> Dict[Any, Any]:
        """
        Stop Test

        Args:
            test_id: Test ID

        Returns:
            Stop confirmation
        """
        return self._request(f"/load-testing/stop/{test_id}", "POST")

    def get_results(self, test_id: str) -> Dict[Any, Any]:
        """
        Get Test Results

        Args:
            test_id: Test ID

        Returns:
            Test results
        """
        return self._request(f"/load-testing/results/{test_id}")

    def wait_for_completion(self, test_id: str, check_interval: int = 5, timeout: int = 300) -> Dict[Any, Any]:
        """
        Wait for test completion

        Args:
            test_id: Test ID
            check_interval: Seconds between status checks
            timeout: Maximum wait time in seconds

        Returns:
            Final test results
        """
        start_time = time.time()

        while time.time() - start_time < timeout:
            status = self.get_status(test_id)

            if status["status"] in ["completed", "stopped", "failed"]:
                return self.get_results(test_id)

            progress = status.get("progress", 0)
            print(f"Test status: {status['status']} - Progress: {progress}%")

            time.sleep(check_interval)

        raise TimeoutError("Test timeout exceeded")


# Example Usage
if __name__ == "__main__":
    # Initialize API client
    api = DevslyLoadTesting("YOUR_API_KEY")

    try:
        # Start Load Test
        print("Starting load test...")
        test = api.start_test({
            "target_url": "https://example.com",
            "method": "GET",
            "duration": 30,
            "concurrent_users": 10,
            "ramp_up_time": 5
        })

        test_id = test["test_id"]
        print(f"Test started with ID: {test_id}\n")

        # Wait for completion
        print("Waiting for test to complete...")
        results = api.wait_for_completion(test_id)

        # Display Results
        print("\nTest Results:")
        print(f"Status: {results['status']}")
        print(f"Total Requests: {results['total_requests']}")
        print(f"Successful: {results['successful_requests']}")
        print(f"Failed: {results['failed_requests']}")
        print(f"Average Response Time: {results['avg_response_time']}ms")
        print(f"Requests/sec: {results['requests_per_second']}")

        if "percentiles" in results:
            print("\nPercentiles:")
            p = results["percentiles"]
            print(f"p50: {p['p50']}ms")
            print(f"p90: {p['p90']}ms")
            print(f"p95: {p['p95']}ms")
            print(f"p99: {p['p99']}ms")

        # Example: Stop a test manually
        # api.stop_test(test_id)

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
    except Exception as e:
        print(f"Error: {e}")
