import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";

const Home = () => {
  const [flag, setFlag] = useState(false);
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
        {flag ? <LoginForm /> : <SignupForm />}
        {!flag ? (
          <p className="helpText">
            Already have an Account? Click here to{" "}
            <span onClick={() => setFlag(!flag)}>login.</span>.
          </p>
        ) : (
          <p className="helpText">
            Don't have an account? Click here to{" "}
            <span onClick={() => setFlag(!flag)}>signup.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
