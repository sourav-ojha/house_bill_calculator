import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user) {
      console.log("User is logged in");
      navigate("/tenants");
    } else {
      console.log("User is not logged in");
    }
  }, [user]);

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="btn btn-outline flex gap-2 " onClick={login}>
        <img src="/google.svg" alt="google" className="w-6 h-6" />
        <div>Sign in With Google</div>
      </div>
    </div>
  );
};

export default Login;
