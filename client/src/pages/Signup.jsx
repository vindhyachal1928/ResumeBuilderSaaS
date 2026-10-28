import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert("This email is already registered. Please log in.");
          navigate("/login", {
            state: { email: formData.email.trim().toLowerCase() },
          });
          return;
        }

        alert(data.message);
        return;
      }

      alert("Account created successfully!");
      navigate("/login", {
        state: { email: formData.email.trim().toLowerCase() },
      });
    } catch (error) {
      console.error("Signup error:", error);
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
            Take the next step in your career
          </div>
          <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
            Create your account.
            <span className="mt-2 block text-blue-300">
              Make your experience stand out.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
            Bring your skills, projects, and experience together in a resume
            that feels like you.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-blue-200">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-semibold">Everything you need to get started</p>
                <p className="mt-1 text-sm text-slate-400">
                  A better resume, one step at a time
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              {["Choose a professional template", "Edit with a live preview", "Save or print your resume"].map(
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

          <div className="my-auto py-8 lg:my-0 lg:py-0">
            <div className="mb-7 lg:hidden">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  R
                </span>
                ResumeBuilder
              </Link>
            </div>

            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Get started for free
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create your account
              </h2>
              <p className="mt-3 text-gray-600">
                Add your details to start building your professional resume.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold text-gray-700">
                  Full name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Use at least 8 characters with uppercase, lowercase, number, and special character.
                </p>
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Create account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
