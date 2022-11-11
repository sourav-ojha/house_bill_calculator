import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Tenants from "./pages/Tenants";
import TenantsDetails from "./pages/Tenants/TenantsDetails";
import Users from "./pages/Users";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="tenants" element={<Tenants />} />
          <Route path="tenants/:id" element={<TenantsDetails />} />
          <Route path="users" element={<Users />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
