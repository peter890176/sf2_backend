# E-commerce Backend API

A robust e-commerce backend API built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (register, login)
- User profile management
- Address management
- JWT-based authentication
- Password encryption
- Input validation
- Error handling
- Rate limiting
- CORS support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-rate-limit
- cors
- dotenv

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── app.js          # Application entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### User

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Address

- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add new address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shop_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shop
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

4. Start the server:
```bash
npm start
```

## Testing

You can use the provided Python test script to test the API endpoints:

```bash
python test_api.py
```

## Security Features

- Password encryption using bcryptjs
- JWT-based authentication
- Rate limiting to prevent brute force attacks
- CORS configuration
- Input validation
- Error handling middleware

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- Server errors

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address

## CORS Configuration

CORS is enabled for the following origins:
- http://localhost:3000
- http://localhost:5173

## License

MIT 