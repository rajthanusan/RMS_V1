import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import ReguserDashboard from "./components/reguser/RegUserHome";

import NewuserDashboard from "./components/newuser/UserHome";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManagerDashboard from "./components/Manager/ManagerDashboard";
import OperatorDashboard from "./components/Operator/OperatorDashboard";

import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/ForgotPassword';
import ProtectedRoute from './ProtectedRoute'; 

import { ToggleProvider } from "./context/ToggleContext";  
import { GoogleOAuthProvider } from "@react-oauth/google";  

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <GoogleOAuthProvider clientId="872195979745-v2otegricmipgm03ll65gct28astlb7q.apps.googleusercontent.com"> {/* Wrap the entire app with GoogleOAuthProvider */}
      <ToggleProvider> 
        <Router>
          <div>
            {isLoading && (
              <div className="preload" data-preaload>
                <div className="circle"></div>
                <p className="text">RMS</p>
              </div>
            )}

            <Routes>
              <Route path="/" element={<NewuserDashboard />} />
              <Route element={<ProtectedRoute role="user" />}>
                <Route path="/User" element={<ReguserDashboard />} />
              </Route>

              <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/Admin" element={<AdminDashboard />} />
              </Route>

              <Route element={<ProtectedRoute role="manager" />}>
                <Route path="/Manager" element={<ManagerDashboard />} />
              </Route>

              <Route element={<ProtectedRoute role="operator" />}>
                <Route path="/Operator" element={<OperatorDashboard />} />
              </Route>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/forgot-password" element={<Forgot />} />
            </Routes>
          </div>

          <ToastContainer />
        </Router>
      </ToggleProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
