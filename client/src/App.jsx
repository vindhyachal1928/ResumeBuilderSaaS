import { BrowserRouter, Routes, Route } from "react-router-dom"


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateResume from "./pages/CreateResume";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />}/>

        <Route path="/Signup" element={<Signup/>}/>

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/create-resume" element={ <ProtectedRoute> <CreateResume /> </ProtectedRoute> } />

      </Routes>

    </BrowserRouter>
  )
}

export default App;