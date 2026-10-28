import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  FileText,
  Sparkles,
} from "lucide-react";
import API_URL from "../config/api";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">

        <Link to="/" className="relative flex items-center gap-3 text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700">
            R
          </span>
          ResumeBuilder
        </Link>

        <div className="relative max-w-xl py-12">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
            <Sparkles size={16} className="text-blue-300" />
            Your next opportunity starts here
          </div>
          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Welcome back.
            <span className="mt-2 block text-blue-300">
              Your next chapter is waiting.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
            Sign in to keep building, updating, and sharing a resume that
            represents your best work.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-200">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-semibold">Your career, clearly presented</p>
                <p className="mt-1 text-sm text-slate-400">
                  Pick up right where you left off
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {["Professional templates", "Live resume preview", "Print-ready PDF"].map(
                (item) => (
                  <p key={item} className="flex items-center gap-2">
                    <Check size={16} className="text-blue-300" />
                    {item}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        <p className="relative text-sm text-slate-400">
          Build your future, one page at a time.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:justify-center lg:px-12 xl:px-20">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-500 transition hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <div className="my-auto py-10 lg:my-0 lg:py-0">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  R
                </span>
                ResumeBuilder
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Sign in to your account
              </h2>
              <p className="mt-3 text-gray-600">
                Enter your details below to continue to your dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/Signup" className="font-semibold text-blue-600 hover:text-blue-700">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
