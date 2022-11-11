import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { ROLE } from "../../constants";
import { User } from "../../services/types";
import { getUsersList, updateRole } from "../../services/user";

const Users = () => {
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    getUsersList().then((res) => {
      setList(res);
    });
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 px-2">
        <div className="text-2xl text-bold px-4 "> Users</div>
        {/* <div className="btn btn-primary btn-sm ">Create New Tenants</div> */}
        {/* <CreateTenantUI /> */}
      </div>
      <div className="flex-1 flex flex-col items-center gap-4 mt-8">
        {loading ? (
          <Loading />
        ) : (
          !!list &&
          list.map((item: User) => <UserCard key={item.id} user={item} />)
        )}
      </div>
    </div>
  );
};

export default Users;

const UserCard = ({ user }: { user: User }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [role, setRole] = useState<string>();

  const handleEditBtn = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    user && setRole(user.role);
  }, [user.role]);

  const handleEditClose = () => setIsEdit(false);

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (user.id && e.target.value) {
      updateRole(user.id, e.target.value);
      setRole(e.target.value);
    }
    setIsEdit(false);
  };
  return (
    <div className=" w-11/12 p-2 shadow rounded-lg  shadow-violet-100 flex gap-4 items-center">
      <div className="avatar">
        <div className="w-16 h-16 bg-gray-300 rounded-full">
          {user.photoURL && <img src={user.photoURL} alt="I" />}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-xl text-ellipsis ">{user.name} </div>
        <div className="text-xl text-ellipsis">{user.email} </div>
        <div className="flex gap-2 w-full relative py-2">
          <div className="text-xl">Role : </div>
          {isEdit ? (
            <div className="flex gap-5 items-center ">
              <select
                className="select select-primary min-h-8 h-8"
                value={role}
                onChange={handleChangeRole}
              >
                {ROLE.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <div>
                <img src="/close.svg" onClick={handleEditClose} />
              </div>
            </div>
          ) : (
            <>
              <div className="text-xl capitalize ">{user.role} </div>
              <div className="absolute right-4 bottom-1">
                <img
                  src="/edit.svg"
                  alt="edit"
                  className="cursor-pointer"
                  onClick={handleEditBtn}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
