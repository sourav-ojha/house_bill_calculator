import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFirebaseService from "../../hooks/useFirebaseService";
import { getTenantsList } from "../../services/tenants";
import { Tenant } from "../../services/types";

const Tenants = () => {
  const {
    serviceCall: fetchTenants,
    list,
    loading,
  } = useFirebaseService(getTenantsList, "array");

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 px-2">
        <div className="text-2xl text-bold px-4 "> Tenants</div>
        <div className="btn btn-primary btn-sm ">Create New Tenants</div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-4 mt-8">
        {loading ? (
          <div>Loading... </div>
        ) : (
          !!list &&
          list.map((item: Tenant) => (
            <Link
              to={`/tenants/${item.id}`}
              className=" w-11/12 p-2 shadow rounded-lg  shadow-violet-100 "
            >
              <div className="text-xl">{item.name} </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Tenants;
