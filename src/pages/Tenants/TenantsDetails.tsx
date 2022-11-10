import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createTenantElectricBill,
  getCostPerUnit,
  getTenant,
  getTenantElectricBill,
} from "../../services/tenants";
import { ElectricBill, Tenant } from "../../services/types";

const TenantsDetails = (): JSX.Element => {
  const id = useParams<{ id: string }>().id;
  const [tenant, setTenant] = React.useState<Tenant>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTenant = () => {
      setLoading(true);
      if (!id) return;
      getTenant(id)
        .then((res) => {
          setTenant(res as Tenant);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTenant();
  }, []);

  return loading && !tenant ? (
    <div className="text-center">Loading ...</div>
  ) : (
    <div className="flex flex-col gap-4 mt-4 px-2">
      <Link to="/tenants" className="btn btn-sm w-16 ">
        Back
      </Link>

      {tenant ? (
        <div className="flex flex-col gap-1  px-6 ">
          <DetailsField label="Name" value={tenant.name} />
          <DetailsField label="Mobile" value={tenant.phone} />
          <DetailsField label="House No" value={tenant.houseNo} />
          <div className="divider mb-0" />
        </div>
      ) : (
        <div className="text-center"> No Data Found</div>
      )}
      {id && tenant && (
        <BillsList id={id} initialUnit={tenant.lastBillFinalUnit} />
      )}
    </div>
  );
};

export default TenantsDetails;

// typescript

function DetailsField({
  label,
  value,
}: {
  label: string;
  value: string | Number;
}): JSX.Element {
  return (
    <div className="flex gap-1  ">
      <div className="text-lg">{label} :</div>
      <div className="text-xl">{value.toString()}</div>
    </div>
  );
}

const BillsList = ({
  id,
  initialUnit,
}: {
  id: string;
  initialUnit: number;
}): JSX.Element => {
  const [electricBill, setElectricBill] = React.useState<ElectricBill[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [reFetch, setReFetch] = React.useState(false);
  useEffect(() => {
    const fetchBills = () => {
      setLoading(true);
      setReFetch(false);
      if (!id) {
        console.log("No id");
        return;
      }
      getTenantElectricBill(id)
        .then((res) => {
          setElectricBill(res);
          console.log(res, "BILL FETCHED");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (reFetch || loading) fetchBills();
  }, [reFetch]);

  const handleReFetch = () => {
    setReFetch(true);
  };

  return loading ? (
    <div className="text-center">Loading ...</div>
  ) : (
    <div className="flex flex-col gap-4 mt-4 px-2">
      <div className="flex justify-between">
        <div className="text-2xl text-bold px-4 "> Bills</div>

        <CreateEletricBill
          initialUnit={initialUnit}
          tenantId={id}
          handleReFetch={handleReFetch}
        />
      </div>
      <div className="flex-1 flex flex-col items-center md:flex-row md:flex-wrap  gap-4 mt-8">
        {electricBill.map(
          (bill) =>
            bill && (
              <div className="w-11/12 md:w-[500px] p-2 flex flex-col shadow rounded-lg  shadow-violet-100 relative">
                <div className="flex sm:justify-center">
                  {/* <div className="text-lg">Bill No : {bill.id}</div> */}
                  <DetailsField label="Date" value={bill.date} />
                </div>
                <DetailsField label="Initial Unit" value={bill.initialUnit} />
                <DetailsField label="Final Unit" value={bill.finalUnit} />
                <DetailsField label="Amount" value={bill.amount} />
                <DetailsField label="Unit Consumed" value={bill.unitConsumed} />
                {/* copy btn */}
                <div className="absolute top-2 right-2 btn btn-sm btn-primary">
                  Copy
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

const CreateEletricBill = ({
  initialUnit,
  tenantId,
  handleReFetch,
}: {
  initialUnit: number;
  tenantId: string;
  handleReFetch: () => void;
}): JSX.Element => {
  const [finalUnit, setFinalUnit] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [unitConsumed, setUnitConsumed] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [costPerUnit, setCostPerUnit] = React.useState(0);
  const todaysDate = new Date().toLocaleDateString();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getCostPerUnit()
      .then((res) => {
        setCostPerUnit(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    setFinalUnit(value);
    let { amount, unitConsumed } = calculateBill(value, initialUnit);
    setUnitConsumed(unitConsumed);
    setAmount(amount);
  };

  const handleSubmit = () => {
    setLoading(true);
    // createBill
    const payload = {
      unitConsumed,
      amount,
      date: date.toLocaleDateString(),
      finalUnit,
      initialUnit,
    };
    createTenantElectricBill(tenantId, payload);
    setLoading(false);
    handleToggle();
    handleReFetch();
  };

  const calculateBill = (final: number, initial: number) => {
    const unitConsumed = final - initial;
    if (unitConsumed > 0 && !!costPerUnit) {
      const amount = unitConsumed * costPerUnit;
      return { unitConsumed, amount };
    } else {
      return { unitConsumed: 0, amount: 0 };
    }
  };

  return (
    <>
      {/* The button to open modal */}
      <div className="btn btn-primary btn-sm" onClick={handleToggle}>
        Create New Bill
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
          <h3 className="font-bold text-lg text-center">{todaysDate}</h3>
          <div className="flex flex-col gap-1">
            <InputField label="Initial Unit" value={initialUnit} />
            <InputField
              label="Final Unit"
              value={finalUnit}
              onChange={handleChange}
              editable
            />
            <InputField label="Unit Consumed" value={unitConsumed} />
            <InputField label="Amount" value={amount} />
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
  label,
  value,
  editable = false,
  onChange,
}: {
  label: string;
  value: number;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg font-bold">{label}</label>
      <input
        type="number"
        className="input input-md border border-gray-100 p-2 rounded-md disabled:border-gray-500 "
        value={value}
        onChange={onChange}
        disabled={!editable}
        readOnly={!editable}
      />
    </div>
  );
};
