# Todo API with SQLite

A RESTful API for managing todos built with Node.js, Express, and SQLite. Features user authentication with JWT tokens and full CRUD operations for todo management.

## Features

- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ CRUD operations for todos
- ✅ SQLite database with foreign key relationships
- ✅ Password hashing with bcrypt
- ✅ User-specific todo management
- ✅ Mark todos as completed/incomplete

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database (Node.js built-in)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **ES6 Modules** - Modern JavaScript syntax

## Project Structure

```
todo-api/
├── src/
│   ├── controller/
│   │   ├── authController.js    # Authentication logic
│   │   └── todoController.js    # Todo CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── todoRoutes.js        # Todo routes
│   ├── db.js                    # Database configuration
│   └── server.js                # Main application file
├── .env                         # Environment variables
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <you git repository-url>
cd todo-api using SQLite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create a `.env` file in the root directory:
```env
JWT_SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=7000
```

### 4. Start the server
```bash
npm start 

or

npm run dev
```

The server will start on `http://localhost:7000`

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Todo Management

> **Note:** All todo endpoints require authentication. Include the JWT token in the Authorization header:
> `Authorization: Bearer YOUR_JWT_TOKEN`

#### Get All Todos
```http
GET /todos
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, bread, eggs",
    "completed": 0,
    "user_id": 1
  }
]
```

#### Create Todo
```http
POST /todos
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, bread, eggs"
}
```

#### Update Todo
```http
PUT /todos/:id
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Buy groceries - Updated",
  "description": "Milk, bread, eggs, fruits",
  "completed": true
}
```

**Response:**
```json
{
  "message": "Todo updated successfully"
}
```

#### Delete Todo
```http
DELETE /todos/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Todo deleted successfully"
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
);
```

### Todos Table
```sql
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Testing with REST Client

If you're using VS Code with the REST Client extension, create a `.http` file:

```http
### Variables
@baseUrl = http://localhost:7000
@token = YOUR_JWT_TOKEN_HERE

### Register
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}

### Login
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}

### Create Todo
POST {{baseUrl}}/todos
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "title": "Learn Node.js",
  "description": "Complete the todo API project"
}

### Get All Todos
GET {{baseUrl}}/todos
Authorization: Bearer {{token}}

### Update Todo
PUT {{baseUrl}}/todos/1
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "title": "Learn Node.js - Updated",
  "description": "Complete the todo API project with tests",
  "completed": true
}

### Delete Todo
DELETE {{baseUrl}}/todos/1
Authorization: Bearer {{token}}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (token verification failed)
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: Uses bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **SQL Injection Prevention**: Prepared statements with parameterized queries
- **User Isolation**: Users can only access their own todos

## Development Notes

- The database is currently set to `:memory:` mode, meaning data is lost on server restart
- For production, change the database path in `db.js` to a file: `./todos.db`
- JWT tokens expire in 1 hour (configurable)
- CORS is not configured - add if needed for frontend integration

## Future Enhancements

- [ ] Add email field to user registration
- [ ] Implement password reset functionality
- [ ] Add todo categories/tags
- [ ] Implement todo due dates
- [ ] Add pagination for large todo lists
- [ ] Add input validation middleware
- [ ] Implement rate limiting
- [ ] Add comprehensive logging
- [ ] Create automated tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Connect with Me

Feel free to reach out and connect with me on social media:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yusuf-abdulrasheed-adinoyi/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/iamAdinoyi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yusufAbdulrasheed)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/code_with_rash/?hl=en)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yusufabdulrasheed200@gmail.com)

---

### 📝 About This Project

This Todo API was built as part of my journey in learning backend development with Node.js and SQLite. If you found this project helpful or have any suggestions for improvement, feel free to reach out or contribute!

### ⭐ Show Your Support

If you like this project, please consider giving it a star on GitHub and sharing it with others who might find it useful!

## License

This project is licensed under the MIT License.