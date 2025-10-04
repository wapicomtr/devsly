"""
Devsly API - Network Tools Examples (Python)

Requirements: Python 3.6+, requests library
Install: pip install requests

Get your API key from: https://devsly.io/dashboard
"""

import requests
from typing import Optional, Dict, Any


class DevslyNetworkTools:
    """Devsly Network Tools API Client"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://devsly.io/api/v1"
        self.headers = {
            "X-API-Key": api_key,
            "Content-Type": "application/json"
        }

    def _request(self, endpoint: str, params: Optional[Dict] = None) -> Dict[Any, Any]:
        """Make API request"""
        url = f"{self.base_url}{endpoint}"

        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()

        return response.json()

    def whois_lookup(self, domain: str) -> Dict[Any, Any]:
        """
        WHOIS Lookup

        Args:
            domain: Domain name to lookup

        Returns:
            WHOIS information
        """
        return self._request("/network/whois", {"domain": domain})

    def dns_lookup(self, domain: str, record_type: str = "A") -> Dict[Any, Any]:
        """
        DNS Lookup

        Args:
            domain: Domain name to lookup
            record_type: Record type (A, AAAA, MX, NS, TXT, CNAME, SOA)

        Returns:
            DNS records
        """
        return self._request("/network/dns-lookup", {
            "domain": domain,
            "type": record_type
        })

    def ip_info(self, ip: Optional[str] = None) -> Dict[Any, Any]:
        """
        IP Information

        Args:
            ip: IP address (None for current IP)

        Returns:
            IP information
        """
        params = {"ip": ip} if ip else {}
        return self._request("/network/ip-info", params)


# Example Usage
if __name__ == "__main__":
    # Initialize API client
    api = DevslyNetworkTools("YOUR_API_KEY")

    try:
        # WHOIS Lookup
        print("WHOIS Lookup for google.com:")
        whois = api.whois_lookup("google.com")
        print(f"Registrar: {whois.get('registrar', 'N/A')}")
        print(f"Creation Date: {whois.get('creation_date', 'N/A')}")
        print()

        # DNS Lookup
        print("DNS Lookup for github.com (A records):")
        dns = api.dns_lookup("github.com", "A")
        if dns.get("success"):
            for record in dns.get("records", []):
                print(f"  {record}")
        print()

        # DNS MX Records
        print("DNS Lookup for gmail.com (MX records):")
        mx = api.dns_lookup("gmail.com", "MX")
        if mx.get("success"):
            for record in mx.get("records", []):
                print(f"  {record}")
        print()

        # IP Information
        print("IP Information for 8.8.8.8:")
        ip_info = api.ip_info("8.8.8.8")
        print(f"IP: {ip_info.get('ip', 'N/A')}")
        print(f"Country: {ip_info.get('country', 'N/A')}")
        print(f"City: {ip_info.get('city', 'N/A')}")
        print(f"ISP: {ip_info.get('isp', 'N/A')}")
        print()

        # Current IP Information
        print("Current IP Information:")
        current = api.ip_info()
        print(f"Your IP: {current.get('ip', 'N/A')}")
        print(f"Country: {current.get('country', 'N/A')}")

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
