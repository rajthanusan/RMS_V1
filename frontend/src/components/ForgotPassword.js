import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import event1 from "./assets/images/form-pattern.png";  
import Header from './Header';
import Topbar from './Topbar';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSendCode = async () => {
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset code.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("/auth/verify-code", { email, code });
      toast.success(response.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid code.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("/auth/reset-password", {
        email,
        code,
        newPassword,
      });
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <section className="login">
      <div>
        <Topbar isTopbarVisible={true} />
        <Header isHeaderVisible={true} role="user" />
        <div className="container">
          <div className="form login-form bg-black-10" style={{ display: "flex" }}>
            {/* Left Section */}
            <div className="form-left text-center" style={{
              flex: 1,
              backgroundImage: `url(${event1})`,
              backgroundSize: "cover",
              padding: "20px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <h2 className="headline-1 text-center">Contact Us</h2>
              <p className="contact-label">For Assistance</p>
              <a href="tel:+94-771-234567" className="body-1 contact-number hover-underline">+94-771-234567</a>
              <p className="contact-label">Location</p>
              <address className="body-4">No. 15, Colombo Road, Colombo 00300, Sri Lanka</address>
            </div>

            {/* Right Section */}
            <form className="form-right" style={{ flex: 1 }} onSubmit={(e) => e.preventDefault()}>
              <h2 className="headline-1 text-center">Forgot Password</h2>

              {step === 1 && (
                <>
                  <p className="form-text text-center">Enter your email to receive a reset code</p>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>
                 
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: "100%" }}  
                    onClick={handleSendCode}
                 
                  >
                     <span className="text text-1">Send Code</span>
                <span className="text text-2" aria-hidden="true">
                Send Code
                </span>
                   
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="form-text text-center">Enter the reset code sent to your email</p>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="code"
                      placeholder="Enter Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleVerifyCode}
                    style={{ width: "100%" }}
                  >
                     <span className="text text-1">Verify Code</span>
                <span className="text text-2" aria-hidden="true">
                Verify Code
                </span>
                    
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="form-text text-center">Reset Your Password</p>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetPassword}
                    style={{ width: "100%" }}
                  >
                     <span className="text text-1">Reset Password</span>
                <span className="text text-2" aria-hidden="true">
                Reset Password
                </span>
                   
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}
