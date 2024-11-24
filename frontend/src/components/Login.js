import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import { GoogleLogin } from '@react-oauth/google';   
import event1 from "./assets/images/form-pattern.png";  
import Header from './Header';
import Topbar from './Topbar';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [linkColor, setLinkColor] = useState("white");
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      toast.success("Login successful!");

      setTimeout(() => {
        if (user.role === "admin") navigate("/Admin");
        else if (user.role === "manager") navigate("/Manager");
        else if (user.role === "operator") navigate("/Operator");
        else navigate("/User");
      }, 3000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password.");
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post("/auth/google-login", { tokenId: response.credential });

      const { token, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      toast.success("Login with Google successful!");

      setTimeout(() => {
        if (user.role === "admin") navigate("/Admin");
        else if (user.role === "manager") navigate("/Manager");
        else if (user.role === "operator") navigate("/Operator");
        else navigate("/User", { state: { email: user.email } });
      }, 3000);
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  const handleMouseEnter = () => setLinkColor("hsl(38, 61%, 73%)");
  const handleMouseLeave = () => setLinkColor("white");

  return (
    <section className="login">
      <div>
        <Topbar isTopbarVisible={isTopbarVisible} />
        <Header isHeaderVisible={true} role="user" />
        <div className="container">
          <div className="form login-form bg-black-10" style={{ display: "flex" }}>
            {/* Left Section */}
            <div className="form-left text-center" style={{ flex: 1, backgroundImage: `url(${event1})`, backgroundSize: "cover", padding: "20px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 className="headline-1 text-center">Contact Us</h2>
              <p className="contact-label">For Assistance</p>
              <a href="tel:+94-771-234567" className="body-1 contact-number hover-underline">+94-771-234567</a>
              <p className="contact-label">Location</p>
              <address className="body-4">No. 15, Colombo Road, Colombo 00300, Sri Lanka</address>
            </div>

            {/* Right Section */}
            <form onSubmit={handleLogin} className="form-right" style={{ flex: 1 }}>
              <h2 className="headline-1 text-center">Login</h2>
              <p className="form-text text-center">Please login to continue</p>

              <div className="input-wrapper">
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="input-field" style={{ width: "100%" }} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" className="input-field" style={{ width: "100%" }} />
              </div>

              <button type="submit" className="loginbtn loginbtn-secondary" style={{ width: "100%" }}>
                <span className="text text-1">Login</span>
                <span className="text text-2" aria-hidden="true">Login</span>
              </button>

              {/* Google Login Section */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed")}
                  useOneTap
                  theme="outline"  
                  style={{ width: "80%" }}  
                />
              </div>
              <div
  style={{
    textAlign: "center",
    marginTop: "10px",
    color: "white",
    display: "inline",  
  }}
>
  <span>
    Forgot your password?{" "}
    <Link
      to="/forgot-password"
      style={{
        color: "hsl(38, 61%, 73%)",
        textDecoration: "none",
        display: "inline",  
      }}
    >
      Reset it here
    </Link>
  </span>
</div>
<div
  style={{
    textAlign: "center",
    marginTop: "10px",
    color: "white",
    display: "inline",  
  }}
>
  <span>
    Don't have an account?{" "}
    <Link
     to="/register"
      style={{
        color: "hsl(38, 61%, 73%)",
        textDecoration: "none",
        display: "inline",  
      }}
    >
      Register
    </Link>
  </span>
</div>


            </form>
          </div>
        </div>
      </div>
<ToastContainer />
    </section>
  );
}
