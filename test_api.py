import requests
import json

# API base URL
BASE_URL = "http://localhost:3000"

# Test data
test_user = {
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "0912345678"
}

test_address = {
    "addressLine": "123 Main Street",
    "city": "Taipei",
    "postalCode": "110",
    "state": "Xinyi District",
    "isDefault": True
}

def print_response(response):
    """Print response information"""
    print(f"Status Code: {response.status_code}")
    print("Response Content:")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    print("-" * 50)

def test_api():
    # Store token
    token = None
    
    # 1. Test user registration
    print("1. Testing user registration")
    response = requests.post(
        f"{BASE_URL}/api/auth/register",
        json=test_user
    )
    print_response(response)
    
    # 2. Test user login
    print("2. Testing user login")
    response = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )
    print_response(response)
    
    # Save token
    if response.status_code == 200:
        token = response.json()["token"]
        print(f"Token received: {token}")
    
    # Set authentication header
    headers = {
        "Authorization": f"Bearer {token}"
    } if token else {}
    
    # 3. Test get user profile
    print("3. Testing get user profile")
    response = requests.get(
        f"{BASE_URL}/api/users/profile",
        headers=headers
    )
    print_response(response)
    
    # 4. Test update user profile
    print("4. Testing update user profile")
    update_data = {
        "firstName": "New",
        "lastName": "Name",
        "phone": "0987654321"
    }
    response = requests.put(
        f"{BASE_URL}/api/users/profile",
        headers=headers,
        json=update_data
    )
    print_response(response)
    
    # 5. Test add address
    print("5. Testing add address")
    response = requests.post(
        f"{BASE_URL}/api/users/addresses",
        headers=headers,
        json=test_address
    )
    print_response(response)
    
    # 6. Test get addresses
    print("6. Testing get addresses")
    response = requests.get(
        f"{BASE_URL}/api/users/addresses",
        headers=headers
    )
    print_response(response)

if __name__ == "__main__":
    test_api() 