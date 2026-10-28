import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = location.state?.email || "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      alert(
        "Email information is missing. Please request a new OTP."
      );
      navigate("/forgot-password");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      console.log("Verify OTP response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("OTP verified successfully!");

      /*
        Temporary development testing.

        The reset token is currently generated during
        forgot-password and returned in the development
        response.
      */

      const forgotPasswordData =
        JSON.parse(
          sessionStorage.getItem("forgotPasswordData")
        ) || {};

      const resetToken =
        forgotPasswordData.resetToken || "";

      if (!resetToken) {
        alert(
          "Reset token is missing. Please request a new OTP."
        );
        navigate("/forgot-password");
        return;
      }

      navigate("/reset-password", {
        state: {
          email,
          resetToken,
        },
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Enter the 6-digit verification code.
        </p>

        {email && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Code sent to{" "}
            <span className="font-medium text-gray-700">
              {email}
            </span>
          </p>
        )}

        <form className="mt-8" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium">
              Verification Code
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) => {
                const value = event.target.value;

                if (/^\d*$/.test(value)) {
                  setOtp(value);
                }
              }}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full rounded-lg border px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="mt-5 w-full text-sm text-gray-600 hover:text-blue-600 hover:underline"
        >
          Back to Forgot Password
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;