import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="w-full h-16 bg-violet-900  text-center  p-4">
        Made with ❤️ by Sourav Ojha
      </div>
    </div>
  );
};

export default Layout;
