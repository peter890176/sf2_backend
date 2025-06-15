# E-commerce Backend API

![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?style=for-the-badge&logo=node.js) ![Express.js](https://img.shields.io/badge/Express.js-4.x-green?style=for-the-badge&logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=for-the-badge&logo=mongodb)

This is a comprehensive and robust e-commerce backend API built with Node.js, Express.js, and MongoDB. It provides a full suite of features including user authentication, product management, order processing, and an admin role for system management.

## Live Demo & Frontend

- **Live Demo:** [https://sfshop.netlify.app/](https://sfshop.netlify.app/)
- **Frontend Repository:** [https://github.com/peter890176/sf2](https://github.com/peter890176/sf2)

## Demo Data Source

The sample data for this project is provided by [**DummyJSON**](https://dummyjson.com/). The import scripts use the following endpoints:
- **Products:** [https://dummyjson.com/products](https://dummyjson.com/products)
- **Users:** [https://dummyjson.com/users](https://dummyjson.com/users)

## Features

- **Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **User Management**: Users can view and update their profiles.
- **Product Catalog**: Full CRUD (Create, Read, Update, Delete) operations for products, protected for admin users.
- **Shopping Cart & Orders**: Users can create orders from products, with stock management and accurate price calculations (including discounts).
- **Order History**: Users can view their past orders.
- **Admin Role**: A dedicated admin role with permissions to manage the product catalog.
- **Robust Backend**: Features include password encryption, input validation, CORS, rate limiting, and structured error handling.

## Project Structure
```
.
├── scripts/              # Helper scripts for DB management
│   ├── createAdminUser.js
│   ├── importProducts.js
│   ├── importUsers.js
│   └── clearOrders.js
├── src/
│   ├── config/           # Configuration files (e.g., database)
│   ├── controllers/      # Route controllers (request/response logic)
│   ├── middlewares/      # Custom middlewares (e.g., auth, error handling)
│   ├── models/           # Mongoose data models/schemas
│   ├── routes/           # API route definitions
│   └── utils/            # Utility functions
├── .env.example          # Example environment file
├── app.js                # Application entry point
└── package.json
```

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or a cloud service like MongoDB Atlas)
- `npm` (included with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/peter890176/sf2_backend
    cd shop_backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in the required values:
    ```env
    # Server configuration
    PORT=3000

    # MongoDB connection string
    # For local MongoDB: MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
    MONGODB_URI=your_mongodb_atlas_connection_string

    # JWT configuration
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=7d

    # Initial Admin User Credentials (used by the createAdminUser script)
    ADMIN_USERNAME=admin
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=strongpassword123
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The API server should now be running on `http://localhost:3000`.

## Utility Scripts

The `scripts/` directory contains helpers for database initialization and management. These scripts populate the database using sample data from [DummyJSON](https://dummyjson.com/).

1.  **Import Users & Products (Optional):**
    To populate the database with sample data:
    ```bash
    node scripts/importUsers.js
    node scripts/importProducts.js
    ```

2.  **Create an Admin User:**
    This script creates the initial admin user based on the credentials in your `.env` file. This is essential for managing products.
    ```bash
    node scripts/createAdminUser.js
    ```

3.  **Clear Order History (for Development):**
    This script is useful during development to clear all orders from the database.
    ```bash
    node scripts/clearOrders.js
    ```

## API Endpoints

The API is structured into modules for authentication, users, products, and orders.

`[P]` = Protected Route (requires valid user JWT)
`[A]` = Admin Route (requires admin role JWT)

---

### Authentication (`/api/auth`)

| Method | Endpoint         | Description                                               |
| :----- | :--------------- | :-------------------------------------------------------- |
| `POST` | `/register`      | Registers a new user.                                     |
| `POST` | `/login`         | Logs in a user with `username` & `password`, returns JWT. |

---

### Users (`/api/users`)

| Method | Endpoint         | Auth | Description                   |
| :----- | :--------------- | :--: | :---------------------------- |
| `GET`  | `/profile`       | [P]  | Gets the current user's profile. |
| `PUT`  | `/profile`       | [P]  | Updates the user's profile.   |

---

### Products (`/api/products`)

| Method | Endpoint         | Auth | Description                   |
| :----- | :--------------- | :--: | :---------------------------- |
| `GET`  | `/`              |      | Get a list of all products.   |
| `GET`  | `/:id`           |      | Get details of a single product. |
| `POST` | `/`              | [A]  | Creates a new product.        |
| `PUT`  | `/:id`           | [A]  | Updates an existing product.  |
| `DELETE`| `/:id`          | [A]  | Deletes a product.            |

---

### Orders (`/api/orders`)

| Method | Endpoint         | Auth | Description                   |
| :----- | :--------------- | :--: | :---------------------------- |
| `POST` | `/`              | [P]  | Creates a new order.          |
| `GET`  | `/`              | [P]  | Gets the current user's order history. |
| `GET`  | `/:id`           | [P]  | Gets details of a specific order. |

## Acknowledgments

Parts of the code in this project were developed with the assistance of the Gemini 2.5 Pro AI model. All AI-generated code has been reviewed and verified by the project developer.