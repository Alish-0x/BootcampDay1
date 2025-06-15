# E-Commerce Application API Documentation

## Overview
This document provides comprehensive API documentation for the E-Commerce Application built with Node.js, Express, and MongoDB.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in cookies for authenticated requests.

### Headers
```
Content-Type: application/json
Cookie: token=<jwt_token>
```

## API Endpoints

### User Authentication

#### Register User
- **POST** `/user/register`
- **Description**: Register a new user account
- **Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```
- **Response**:
```json
{
  "message": "Successfully account created",
  "success": true
}
```

#### Login User
- **POST** `/user/login`
- **Description**: Authenticate user and receive JWT token
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "message": "welcome back {username}",
  "success": true,
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "phone": "string"
  }
}
```

#### Logout User
- **GET** `/user/logout`
- **Description**: Logout user and clear JWT token
- **Authentication**: Required

#### Get User Profile
- **GET** `/user/profile/:id`
- **Description**: Get user profile by ID
- **Authentication**: Required
- **Parameters**: `id` - User ID

#### Edit Profile
- **PATCH** `/user/profile/edit`
- **Description**: Update user profile information
- **Authentication**: Required
- **Body**: User fields to update

#### Get My Info
- **GET** `/user/getMyInfo`
- **Description**: Get current authenticated user information
- **Authentication**: Required

#### Get All Users (Admin Only)
- **GET** `/user/all`
- **Description**: Get all users (admin access required)
- **Authentication**: Required (Admin)

### Product Management

#### Get All Products
- **GET** `/product/`
- **Description**: Retrieve all products
- **Query Parameters**:
  - `search` - Search products by name
  - `category` - Filter by category
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter

#### Get Product by ID
- **GET** `/product/:id`
- **Description**: Get specific product details
- **Parameters**: `id` - Product ID

#### Add Product (Admin Only)
- **POST** `/product/`
- **Description**: Add new product
- **Authentication**: Required (Admin)
- **Content-Type**: `multipart/form-data`
- **Body**:
```json
{
  "name": "string",
  "description": "string",
  "price": "string",
  "stock": "number",
  "unit": "string",
  "image": "file"
}
```

#### Update Product (Admin Only)
- **PATCH** `/product/:id`
- **Description**: Update existing product
- **Authentication**: Required (Admin)
- **Parameters**: `id` - Product ID
- **Body**: Product fields to update

#### Delete Product (Admin Only)
- **DELETE** `/product/:id`
- **Description**: Delete product
- **Authentication**: Required (Admin)
- **Parameters**: `id` - Product ID

### Shopping Cart

#### Get Cart
- **GET** `/cart/`
- **Description**: Get user's shopping cart
- **Authentication**: Required

#### Add to Cart
- **POST** `/cart/add`
- **Description**: Add item to shopping cart
- **Authentication**: Required
- **Body**:
```json
{
  "productId": "string",
  "quantity": "number"
}
```

#### Update Cart Item
- **PUT** `/cart/update`
- **Description**: Update quantity of cart item
- **Authentication**: Required
- **Body**:
```json
{
  "productId": "string",
  "quantity": "number"
}
```

#### Remove Cart Item
- **DELETE** `/cart/remove/:productId`
- **Description**: Remove specific item from cart
- **Authentication**: Required
- **Parameters**: `productId` - Product ID to remove

#### Clear Cart
- **DELETE** `/cart/clear`
- **Description**: Remove all items from cart
- **Authentication**: Required

### Order Management

#### Create Order
- **POST** `/order/create`
- **Description**: Create new order from cart items
- **Authentication**: Required

#### Get User Orders
- **GET** `/order/user`
- **Description**: Get all orders for authenticated user
- **Authentication**: Required

#### Get Order by ID
- **GET** `/order/:id`
- **Description**: Get specific order details
- **Authentication**: Required
- **Parameters**: `id` - Order ID

#### Update Order Status (Admin Only)
- **PATCH** `/order/:id/status`
- **Description**: Update order status
- **Authentication**: Required (Admin)
- **Parameters**: `id` - Order ID
- **Body**:
```json
{
  "status": "pending|processing|shipped|delivered|cancelled"
}
```

### Admin Routes

#### Get All Orders (Admin Only)
- **GET** `/admin/orders`
- **Description**: Get all orders in the system
- **Authentication**: Required (Admin)

#### Get Dashboard Stats (Admin Only)
- **GET** `/admin/stats`
- **Description**: Get dashboard statistics
- **Authentication**: Required (Admin)

## Data Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  role: String (default: "user", enum: ["user", "admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (required),
  price: String (required),
  image: String (required),
  stock: Number (default: 0),
  unit: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Model
```javascript
{
  userId: ObjectId (ref: "User"),
  items: [{
    productId: ObjectId (ref: "Product"),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: "User"),
  items: [{
    productId: ObjectId (ref: "Product"),
    quantity: Number,
    price: Number,
    name: String
  }],
  totalAmount: Number,
  status: String (enum: ["pending", "processing", "shipped", "delivered", "cancelled"]),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Responses

### Common Error Codes
- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Authentication required or invalid credentials
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

### Error Response Format
```json
{
  "message": "Error description",
  "success": false,
  "error": "Detailed error information (in development)"
}
```

## Authentication Middleware

### isAuth
Verifies JWT token and adds user information to request object.

### isAdmin
Verifies user has admin role (must be used after isAuth).

## File Upload

### Image Upload
- **Supported formats**: JPG, JPEG, PNG, GIF
- **Max file size**: 5MB
- **Storage**: Cloudinary cloud storage
- **Field name**: `image`

## Environment Variables

```env
MONGODB_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
PORT=8000
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:5173
```

## Rate Limiting
Currently no rate limiting is implemented. Consider adding rate limiting for production use.

## Security Considerations

1. **Password Hashing**: Passwords are hashed using bcryptjs
2. **JWT Security**: Tokens expire in 2 days
3. **CORS**: Configured for frontend origin
4. **Input Validation**: Basic validation implemented
5. **File Upload Security**: File type and size restrictions

## Testing

Use tools like Postman or curl to test the API endpoints. Ensure you include the JWT token in cookies for authenticated requests.

### Example curl request:
```bash
curl -X POST http://localhost:8000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Support

For issues and questions, please refer to the project repository or contact the development team.