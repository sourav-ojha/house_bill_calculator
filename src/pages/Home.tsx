import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const firstName = user ? user.name.split(" ")[0] : "User";
  return (
    <div className="flex-1 h-[90%] grid place-items-center  ">
      <div className=" flex flex-col items-center gap-1 ">
        <div className="text-3xl">!! Welcome !!</div>
        <div className="text-2xl font-bold">{firstName}</div>{" "}
        <div className="text-lg">Contact Admin for Permissions</div>
      </div>
    </div>
  );
};

export default Home;
