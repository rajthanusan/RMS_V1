import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";  
import { toast, ToastContainer } from "react-toastify";  
import event1 from "./assets/images/form-pattern.png";  
import Header from './Header';
import Topbar from './Topbar';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  
  const [username, setUsername] = useState("");   
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkColor, setLinkColor] = useState("white");
  const [isTopbarVisible, setIsTopbarVisible] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          "/auth/register",
          {
            email,   
            username,   
            password,
            confirmPassword,
            role: "user",   
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        toast.success(response.data.message || "Account created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

         
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate("/login");
        }, 3000);  

      } catch (error) {
        console.error("Error during registration:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleMouseEnter = () => {
    setLinkColor("hsl(38, 61%, 73%)");
  };

  const handleMouseLeave = () => {
    setLinkColor("white");
  };

  return (
    <section className="register">
      <div>
        <Topbar isTopbarVisible={isTopbarVisible} />
        <Header isHeaderVisible={true} role="user" />
        <div className="container">
          <div className="form register-form bg-black-10" style={{ display: "flex" }}>
            {/* Left Section: Contact info and background image */}
            <div
              className="form-left text-center"
              style={{
                flex: 1,
                backgroundImage: `url(${event1})`,
                backgroundSize: "cover",
                padding: "20px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 className="headline-1 text-center">Contact Us</h2>
              <p className="contact-label">For Assistance</p>
              <a href="tel:+94-771-234567" className="body-1 contact-number hover-underline">
                +94-771-234567
              </a>
              <p className="contact-label">Location</p>
              <address className="body-4">
                No. 15, Colombo Road, Colombo 00300, <br />
                Sri Lanka
              </address>
            </div>

            {/* Right Section: Register Form */}
            <form onSubmit={handleRegister} className="form-right" style={{ flex: 1 }}>
              <h2 className="headline-1 text-center">Register</h2>
              <p className="form-text text-center">Create your account</p>

              <div className="input-wrapper">
                <input
                  type="text"   
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  className="input-field"
                  style={{ width: "100%" }}  
                />
                <input
                  type="email" 
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="input-field"
                  style={{ width: "100%" }}  
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  className="input-field"
                  style={{ width: "100%" }}  
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                  className="input-field"
                  style={{ width: "100%" }}  
                />
              </div>

              <button
                type="submit"
                className="loginbtn loginbtn-secondary"
                style={{ width: "100%" }}  
              >
                <span className="text text-1">Register</span>
                <span className="text text-2" aria-hidden="true">
                  Register
                </span>
              </button>

              <p className="form-text text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: linkColor, textDecoration: "none" }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
