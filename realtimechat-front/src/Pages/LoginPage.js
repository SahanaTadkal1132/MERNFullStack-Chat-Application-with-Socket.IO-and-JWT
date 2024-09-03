import React, { useRef, useEffect } from "react";
import makeToast from "../Toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Define setupSocket here or import if needed from a utility file
    const setupSocket = () => {
      console.log("Socket setup completed");
    };

    // Call setupSocket once after component mounts
    setupSocket();
  }, []);

  const loginUser = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      console.log("Response received:", response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("CC_Token", response.data.token);
        makeToast("success", response.data.message);
        navigate("/dashboard");
      } else {
        makeToast("error", "Token not received in response");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        makeToast("error", error.response.data.message);
      } else {
        makeToast("error", "Something went wrong");
      }
    }
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
