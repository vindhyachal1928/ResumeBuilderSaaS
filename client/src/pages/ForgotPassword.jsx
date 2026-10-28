import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data = await response.json();

      console.log("Forgot password response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Temporary development testing
      if (data.developmentOtp && data.developmentResetToken) {
        console.log(
          "Development OTP:",
          data.developmentOtp
        );

        console.log(
          "Development Reset Token:",
          data.developmentResetToken
        );

        // Save temporary reset information
        sessionStorage.setItem(
          "forgotPasswordData",
          JSON.stringify({
            email: normalizedEmail,
            resetToken: data.developmentResetToken,
          })
        );
      }

      navigate("/verify-otp", {
        state: {
          email: normalizedEmail,
        },
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold">
          Forgot Password?
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Enter your registered email address to reset your
          password.
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your registered email"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-5 w-full text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;