# Healthcare API Documentation

## Overview
This is a comprehensive healthcare management API that supports user registration and authentication for both patients and doctors, with proper password encryption and JWT-based authentication.

## Base URL
```
http://localhost:3000/api
```

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## User Types
- **Patient**: Can manage their own profile and medical information
- **Doctor**: Can view patient information and manage their professional profile

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Register User
```http
POST /api/auth/register
```

**Request Body for Patient Registration:**
```json
{
  "firstName": "Blue",
  "lastName": "Spies",
  "email": "bluespies@gmail.com",
  "password": "Test@123",
  "userType": "patient",
  "phone": "9639740956",
  "dateOfBirth": "2008-01-01",
  "gender": "male",
  "address": {
    "street": "LM Thapar",
    "city": "Chandigarh",
    "state": "Chandigarh",
    "zipCode": "302019",
    "country": "India"
  },
  "emergencyContact": {
    "name": "Emergency Contact Name",
    "phone": "5268979933",
    "relationship": "Father"
  },
  "medicalHistory": ["No major illness"],
  "allergies": ["None"]
}
```

**Request Body for Doctor Registration:**
```json
{
  "firstName": "Dr. Tanay",
  "lastName": "Junior",
  "email": "dr.tanay@hospital.com",
  "password": "Test@123",
  "userType": "doctor",
  "phone": "9876543210",
  "dateOfBirth": "1985-05-15",
  "gender": "male",
  "address": {
    "street": "456 LMT",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "country": "India"
  },
  "specialization": "Cardiology",
  "licenseNumber": "DOC12345",
  "experience": 10,
  "qualifications": ["MBBS", "MD"]
}
```


#### 2. Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "bluespies@gmail.com",
  "password": "Test@123"
}
```


#### 3. Get Profile
```http
GET /api/auth/profile
```
*Requires authentication*


#### 4. Update Profile
```http
PUT /api/auth/profile
```
*Requires authentication*

**Request Body:**
```json
{
  "firstName": "Updated Blue",
  "phone": "9999999999",
  "address": {
    "city": "New Delhi",
    "state": "Delhi"
  }
}
```

#### 5. Change Password
```http
POST /api/auth/change-password
```
*Requires authentication*

**Request Body:**
```json
{
  "currentPassword": "Test@123",
  "newPassword": "NewPassword@456"
}
```

### Additional Routes

#### Health Check
```http
GET /health
```
*Check server status*

#### API Information
```http
GET /api
```
*Get API information and available endpoints*

## Security Features

1. **Password Encryption**: All passwords are hashed using bcrypt with salt rounds of 12
2. **JWT Authentication**: Secure token-based authentication with configurable expiration
3. **Input Validation**: Comprehensive validation for all user inputs
4. **Authorization**: Role-based access control for patients and doctors
5. **Security Headers**: Helmet.js for setting various HTTP headers
6. **CORS**: Configurable Cross-Origin Resource Sharing

## Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/healthcare_db
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Required Fields

### For All Users (Patient & Doctor):
- ✅ **firstName**: String (required, max 50 characters)
- ✅ **lastName**: String (required, max 50 characters)
- ✅ **email**: String (required, unique, valid email format)
- ✅ **password**: String (required, minimum 6 characters)
- ✅ **userType**: String (required, either "patient" or "doctor")

### Optional Fields for All Users:
- **phone**: String (valid phone number format)
- **dateOfBirth**: Date (YYYY-MM-DD format)
- **gender**: String (enum: "male", "female", "other")
- **address**: Object (street, city, state, zipCode, country)

### Additional Required Fields for Doctors:
- ✅ **specialization**: String (required for doctors)
- ✅ **licenseNumber**: String (required for doctors, must be unique)

### Additional Optional Fields for Doctors:
- **experience**: Number (years of experience, minimum 0)
- **qualifications**: Array of Strings (e.g., ["MBBS", "MD"])

### Additional Optional Fields for Patients:
- **emergencyContact**: Object (name, phone, relationship)
- **medicalHistory**: Array of Strings
- **allergies**: Array of Strings

## Getting Started

1. Install MongoDB and ensure it's running
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env` file
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The API will be available at `http://localhost:3000`

## Testing

You can test the API using tools like Postman, curl, or any HTTP client. Start by registering a user, then use the returned JWT token for authenticated requests.
