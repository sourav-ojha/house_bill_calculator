import React from "react";
const Login = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="btn btn-outline flex gap-2 ">
        <img src="/google.svg" alt="google" className="w-6 h-6" />
        <div>Sign in With Google</div>
      </div>
    </div>
  );
};

export default Login;
