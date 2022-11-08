import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const isLoggedIn = true;

  return (
    <div className="navbar bg-violet-900">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Ojha's</a>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <MenuOtions />
        ) : (
          <div className="btn btn-secondary">Login</div>
        )}
      </div>
    </div>
  );
};

export default Header;

const MenuOtions = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
      >
        <li>
          <Link to="/users" className="justify-between">
            Users
            <span className="badge">Admin</span>
          </Link>
        </li>
        <li>
          <Link to="/tenants">Tenants</Link>
        </li>
        {/* divider */}
        <li className="divider" />
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};
