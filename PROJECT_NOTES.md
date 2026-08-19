# ResumeBuilderSaaS - Learning Notes

## Day 13 - Authentication

### What I learned
- Login API
- JWT
- localStorage
- bcrypt
- Authentication middleware

### Important flow

Login
↓
Backend verifies email/password
↓
JWT generated
↓
JWT sent to frontend
↓
localStorage

---

## Day 14 - Protected Routes

### What I learned
- ProtectedRoute
- Check JWT before showing Dashboard
- React Router

Flow:

User
↓
/dashboard
↓
ProtectedRoute
↓
Token exists?
↓
Yes → Dashboard
No → Login

---

## Day 17 - Create Resume

### What I learned
- useState
- form handling
- handleChange
- handleSubmit
- POST request

Flow:

CreateResume.jsx
↓
POST /api/resumes
↓
Express
↓
MongoDB

---

## Day 18 - Save Resume

### Backend

Resume Model
↓
Controller
↓
Route
↓
MongoDB

### Important code

req.user.userId

This tells us which user owns the resume.

---

## Day 19 - Fetch Resume

GET /api/resumes

Dashboard
↓
fetch()
↓
GET API
↓
authMiddleware
↓
MongoDB
↓
setResumes()
↓
Dashboard

---

## Day 20 - Dashboard

- Display resume cards
- Total resume count
- Latest resume
## Edit button
Dashboard
   ↓
My Resumes
   ↓
Edit
   ↓
CreateResume form
   ↓
Update existing resume
   ↓
MongoDB
   ↓
Dashboard


## Delete button
Dashboard
   ↓
Delete
   ↓
DELETE /api/resumes/:id
   ↓
JWT authentication
   ↓
Check resume belongs to user
   ↓
MongoDB
   ↓
Resume deleted
   ↓
Dashboard updates