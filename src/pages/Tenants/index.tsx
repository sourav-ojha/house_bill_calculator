import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFirebaseService from "../../hooks/useFirebaseService";
import { getTenantsList, createTenant } from "../../services/tenants";
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
        {/* <div className="btn btn-primary btn-sm ">Create New Tenants</div> */}
        <CreateTenantUI />
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
              key={item.id}
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

const tenantFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "houseNo", label: "House No", type: "text" },
  { name: "lastBillAmount", label: "Last Bill Amount", type: "text" },
  { name: "lastBillDate", label: "Last Bill Date", type: "text" },
  { name: "lastBillFinalUnit", label: "Last Bill Final Unit", type: "text" },
  {
    name: "lastBillUnitConsumed",
    label: "Last Bill Unit Consumed",
    type: "text",
  },
];

const CreateTenantUI = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState<Tenant>({
    name: "",
    phone: "",
    houseNo: "",
    lastBillAmount: 0,
    lastBillDate: "",
    lastBillFinalUnit: 0,
    lastBillUnitConsumed: 0,
  });

  const handleToggle = () => {
    setState({
      name: "",
      phone: "",
      houseNo: "",
      lastBillAmount: 0,
      lastBillDate: "",
      lastBillFinalUnit: 0,
      lastBillUnitConsumed: 0,
    });

    setOpen(!open);
  };

  const handleChange = (value: string | number, name: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    await createTenant(state);
    handleToggle();
  };

  return (
    <>
      {/* The button to open modal */}
      <div className="btn btn-primary btn-sm" onClick={handleToggle}>
        Create New Tenant
      </div>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
        checked={open}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg text-center">{todaysDate}</h3> */}
          <div className="flex flex-col gap-1">
            {tenantFields.map((field) => (
              <InputField
                key={field.name}
                type={field.type}
                label={field.label}
                name={field.name}
                value={state[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleToggle} disabled={loading}>
              Cancel
            </button>
            <button className="btn" onClick={handleSubmit} disabled={loading}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputField = ({
  type,
  label,
  name,
  value,
  onChange,
}: {
  type: string;
  label: string;
  value: string | number | any;
  name: string;
  onChange: (value: string | number, name: string) => void;
}): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = type === "number" ? parseInt(e.target.value) : e.target.value;
    onChange(value, e.target.name);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold">{label}</label>
      <input
        type={type}
        className="input input-md border border-gray-100 p-2 rounded-md disabled:border-gray-500 "
        value={value}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};
