import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";

const Layout = lazy(() => import("./pages/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Tenants = lazy(() => import("./pages/Tenants"));
const TenantsDetails = lazy(() => import("./pages/Tenants/TenantsDetails"));
const Users = lazy(() => import("./pages/Users"));

const FullScreenLoading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 bg-opacity-50 absolute top-0 left-0 flex justify-center items-center">
      <div className="text-center text-blue-500">Loading...</div>
    </div>
  );
};
const App = () => {
  const { loading, user } = useAuth();

  return (
    <div className="w-screen h-screen overflow-hidden ">
      {loading && <FullScreenLoading />}
      <Suspense fallback={<FullScreenLoading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {!!user && (
            <Route path="/" element={<Layout />}>
              <Route path="tenants" element={<Tenants />} />
              <Route path="tenants/:id" element={<TenantsDetails />} />
              {user.role === "admin" && (
                <Route path="users" element={<Users />} />
              )}
              {user.role === "admin" && (
                <Route path="pricing" element={<Pricing />} />
              )}
              {/* page not found */}
            </Route>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
