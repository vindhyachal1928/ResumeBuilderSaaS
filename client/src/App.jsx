import { BrowserRouter, Routes, Route } from "react-router-dom"


import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateResume from "./pages/CreateResume";
import ResumePreview from "./pages/ResumePreview";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />}/>

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/Signup" element={<Signup/>}/>

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

        <Route path="/create-resume" element={ <ProtectedRoute> <CreateResume /> </ProtectedRoute> } />

        <Route path="/edit-resume/:id" element={ <ProtectedRoute>  <CreateResume />  </ProtectedRoute> } />       
        
        <Route path="/resume/:id" element={ <ProtectedRoute> <ResumePreview /> </ProtectedRoute> } />

        
      </Routes>

    </BrowserRouter>
  )
}

export default App;