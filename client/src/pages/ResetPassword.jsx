import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import API_URL from "../config/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const resetToken = location.state?.resetToken || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !resetToken) {
      alert(
        "Reset session is missing. Please start the password reset process again."
      );

      navigate("/forgot-password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetToken,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Reset password response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Remove temporary reset information
      sessionStorage.removeItem("forgotPasswordData");

      alert("Password reset successfully!");

      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);

      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Create a new password for your account.
        </p>

        {email && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Resetting password for{" "}
            <span className="font-medium text-gray-700">
              {email}
            </span>
          </p>
        )}

        <form className="mt-8" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <label className="mb-2 block font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter new password"
                required
                className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onMouseEnter={() => setShowPassword(true)}
                onMouseLeave={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mt-5">
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Confirm new password"
                required
                className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onMouseEnter={() =>
                  setShowConfirmPassword(true)
                }
                onMouseLeave={() =>
                  setShowConfirmPassword(false)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;