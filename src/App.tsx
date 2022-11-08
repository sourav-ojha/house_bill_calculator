import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Tenants from "./pages/Tenants";
import TenantsDetails from "./pages/Tenants/TenantsDetails";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="tenants" element={<Tenants />} />
          <Route path="tenants/:id" element={<TenantsDetails />} />
          <Route path="users" element={<div>Users</div>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
