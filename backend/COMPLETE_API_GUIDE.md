# 🏥 Healthcare Backend API - Complete Guide

## 🌐 Server Information
**Base URL**: `http://localhost:3000`  
**Status**: ✅ Running and fully functional  
**Database**: ✅ MongoDB Connected

---

## 🔗 Available Request URLs

### 🏠 General Endpoints
```
GET  http://localhost:3000/health              # Server health check
GET  http://localhost:3000/api                 # API information
GET  http://localhost:3000/api/test            # Test endpoint
```

### 🔐 Authentication Endpoints
```
POST http://localhost:3000/api/auth/register   # User registration
POST http://localhost:3000/api/auth/login      # User login
GET  http://localhost:3000/api/auth/profile    # Get profile (protected)
PUT  http://localhost:3000/api/auth/profile    # Update profile (protected) 
POST http://localhost:3000/api/auth/change-password # Change password (protected)
```

### 👥 User Management Endpoints
```
GET  http://localhost:3000/api/patients        # Get all patients (doctor only)
GET  http://localhost:3000/api/patients/:id    # Get specific patient
GET  http://localhost:3000/api/doctors         # Get all doctors
GET  http://localhost:3000/api/doctors/:id     # Get specific doctor
```

### 📚 Medical Case Endpoints
```
GET  http://localhost:3000/api/cases           # Get all cases (authenticated)
POST http://localhost:3000/api/cases          # Create new case (doctor only)
GET  http://localhost:3000/api/cases/:id      # Get specific case
PUT  http://localhost:3000/api/cases/:id      # Update case (doctor owner only)
DELETE http://localhost:3000/api/cases/:id    # Delete case (doctor owner only)

GET  http://localhost:3000/api/cases/my/cases # Get doctor's own cases
POST http://localhost:3000/api/cases/:id/comments    # Add comment to case
POST http://localhost:3000/api/cases/:id/like        # Like/Unlike case
```

---

## 📝 Registration Requirements

### 🩺 For PATIENT Registration
**Required Fields** ✅:
- `firstName` (string, max 50 characters)
- `lastName` (string, max 50 characters) 
- `email` (valid email format, must be unique)
- `password` (minimum 6 characters)
- `userType` (must be "patient")

**Optional Fields** ⭕:
- `phone` (valid phone number format)
- `dateOfBirth` (YYYY-MM-DD format)
- `gender` ("male", "female", or "other")
- `address` (object with street, city, state, zipCode, country)
- `emergencyContact` (object with name, phone, relationship)
- `medicalHistory` (array of strings)
- `allergies` (array of strings)

**Example Request**:
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
  }
}
```

### 👨‍⚕️ For DOCTOR Registration
**Required Fields** ✅:
- `firstName` (string, max 50 characters)
- `lastName` (string, max 50 characters)
- `email` (valid email format, must be unique)
- `password` (minimum 6 characters)
- `userType` (must be "doctor")
- `specialization` (string, medical specialization)
- `licenseNumber` (string, must be unique)

**Optional Fields** ⭕:
- `phone` (valid phone number format)
- `dateOfBirth` (YYYY-MM-DD format)
- `gender` ("male", "female", or "other")
- `address` (object with street, city, state, zipCode, country)
- `experience` (number, years of experience, minimum 0)
- `qualifications` (array of strings)

**Example Request**:
```json
{
  "firstName": "Dr. Sarah",
  "lastName": "Johnson", 
  "email": "dr.sarah@hospital.com",
  "password": "Doctor@123",
  "userType": "doctor",
  "phone": "9876543210",
  "specialization": "Cardiology",
  "licenseNumber": "DOC12345",
  "experience": 10,
  "qualifications": ["MBBS", "MD"]
}
```

---

## 🔑 Login Requirements

**Required Fields** ✅:
- `email` (string, registered email address)
- `password` (string, user's password)

**Example Request**:
```json
{
  "email": "bluespies@gmail.com",
  "password": "Test@123"
}
```

**Successful Login Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id_here",
      "firstName": "Blue",
      "lastName": "Spies",
      "email": "bluespies@gmail.com",
      "userType": "patient",
      // ... other user details
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🛡️ Protected Routes (Require Authentication)

For protected routes, include the JWT token in the request header:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Update Profile
**PUT** `/api/auth/profile`
- Can update any field except: `password`, `email`, `userType`, `isActive`, `isVerified`

### Change Password  
**POST** `/api/auth/change-password`
- Required: `currentPassword`, `newPassword` (min 6 characters)

### Get Profile
**GET** `/api/auth/profile`  
- Returns current user's complete profile

---

## 📊 Response Formats

### ✅ Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages if validation fails"]
}
```

---

## 🧪 Testing Your API

### Using Postman/Thunder Client:
1. **Set Method**: POST
2. **Set URL**: `http://localhost:3000/api/auth/register`
3. **Add Header**: `Content-Type: application/json`
4. **Add Body**: JSON with required fields
5. **Send Request**

### Using curl (Command Line):
```bash
# Register a patient
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com", 
    "password": "Test@123",
    "userType": "patient"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

---

## 🔒 Security Features Implemented

- ✅ **Password Encryption**: bcryptjs with salt rounds of 12
- ✅ **JWT Authentication**: 7-day token expiration
- ✅ **Input Validation**: Comprehensive validation for all fields
- ✅ **Unique Constraints**: Email and license numbers must be unique
- ✅ **Protected Routes**: Authentication required for sensitive operations
- ✅ **CORS Protection**: Cross-origin request security
- ✅ **Security Headers**: Helmet.js for additional security

---

## 🎯 What You Can Do With This API

1. **Register Patients**: Full patient registration with medical history
2. **Register Doctors**: Doctor registration with professional credentials
3. **User Authentication**: Secure login with JWT tokens
4. **Profile Management**: View and update user profiles
5. **Password Management**: Secure password changes
6. **User Lookup**: Find patients and doctors by ID
7. **Role-based Access**: Different permissions for patients vs doctors
8. **Medical Case Discussion**: Doctors can post cases for educational purposes
9. **Interactive Learning**: Interns/students can comment and discuss cases
10. **Case Management**: Full CRUD operations for medical cases

---

## 📚 Medical Case Discussion System

### 🩺 Case Features
- **Educational Cases**: Doctors post real medical scenarios
- **Interactive Discussion**: Comments and replies from medical students/interns
- **Like System**: Users can like interesting cases
- **Search & Filter**: Find cases by specialization, difficulty, tags
- **Patient Information**: Anonymous patient data for learning
- **Treatment Documentation**: Diagnosis and treatment information

### 📝 Case Data Structure
```json
{
  "title": "Case title",
  "description": "Detailed case description",
  "symptoms": ["symptom1", "symptom2"],
  "patientInfo": {
    "age": 45,
    "gender": "male",
    "medicalHistory": ["condition1", "condition2"],
    "currentMedications": ["med1", "med2"]
  },
  "diagnosis": "Final diagnosis",
  "treatment": "Treatment plan",
  "tags": ["cardiology", "emergency"],
  "difficulty": "beginner|intermediate|advanced",
  "specialization": "Medical specialty"
}
```

### 🔍 Case Query Parameters
- `specialization`: Filter by medical specialty
- `difficulty`: Filter by difficulty level
- `tags`: Filter by specific tags
- `doctor`: Filter by doctor ID
- `search`: Search in title, description, tags
- `page`: Pagination page number
- `limit`: Number of results per page

### 💬 Comment System
Users can add comments to discuss cases:
```json
{
  "content": "Your analysis or question about the case"
}
```

---

## 📋 Status Codes

- `200` - OK (Success)
- `201` - Created (Registration successful)
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid credentials or missing token)
- `404` - Not Found (User or resource not found)
- `500` - Internal Server Error (Server issues)

Your backend is **fully functional** and ready for production use! 🚀
