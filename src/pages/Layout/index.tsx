import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Home from "../Home";
import Header from "./Header";

const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full h-full ">
      <Header />

      <div className="flex-1">
        {user && user.role && ["admin", "moderator"].includes(user.role) ? (
          <Outlet />
        ) : (
          <Home />
        )}
      </div>

      {/* Footer */}
      <div className="w-full h-16 bg-violet-900  text-center  p-4">
        Made with ❤️ by Sourav Ojha
      </div>
    </div>
  );
};

export default Layout;
