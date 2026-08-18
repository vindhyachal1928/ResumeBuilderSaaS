import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // Handle input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
  };

  // Login
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      alert("Login successful!");

      console.log("JWT:", data.token);

    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

        {/* Heading + Logout */}
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

        {/* Subtitle */}
        <p className="mt-2 text-gray-600">
          Login to your ResumeAI account
        </p>

        {/* Login Form */}
        <form
          className="mt-8"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
          <label className="mb-2 block font-medium">
            Password
          </label>

          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-blue-600"
          />

          <button
          type="button"
          onMouseEnter={() => setShowPassword(true)}
          onMouseLeave={() => setShowPassword(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;