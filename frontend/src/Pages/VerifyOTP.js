import React, { useState } from "react";
import { verifySignup } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyOTP.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleOtpChange = (e) => {
    const { value } = e.target;
    // Allow only digits and limit the OTP length to 6 characters
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifySignup({ email, otp });

      if (response.data.success) {
        navigate("/login");
      } else {
        setError("OTP Verification failed. Please try again.");
      }
    } catch (error) {
      setError("OTP Verification failed. Please try again.");
    }
  };

  const handleResend = () => {
    // Logic to resend OTP
    console.log("Resend OTP");
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>Email Verification</h2>
        <p>Enter the 6-digit verification code that was sent to your email</p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-input-container">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="otp-input-single"
              maxLength="6"
              placeholder="Enter OTP"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
