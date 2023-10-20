import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";
import ResetForm from "../components/SignupComponents/ResetForm";

const Home = () => {
  const [flag, setFlag] = useState("login");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, []);

  return (
    <div>
      <div className="input-wrapper">
        {flag === "login" ? (
          <LoginForm />
        ) : flag === "signup" ? (
          <SignupForm />
        ) : (
          <ResetForm setFlag={setFlag} />
        )}
        {flag === "signup" ? (
          <p className="helpText">
            Already have an Account? Click here to{" "}
            <span onClick={() => setFlag("login")}>login.</span>.
          </p>
        ) : (
          <p className="helpText">
            Don't have an account? Click here to{" "}
            <span onClick={() => setFlag("signup")}>signup.</span>
          </p>
        )}
        {flag === "login" && (
          <p className="helpText">
            Forgot password? Click here to{" "}
            <span onClick={() => setFlag("reset")}>reset.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
