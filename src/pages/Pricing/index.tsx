import React, { useEffect } from "react";
import { getCostPerUnit, updateCostPerUnit } from "../../services/tenants";

const Pricing = () => {
  const [costPerUnit, setCostPerUnit] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);

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

  const handleCostPerUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPerUnit(parseFloat(e.target.value));
  };

  const handleSave = () => {
    // save costPerUnit
    setLoading(true);
    updateCostPerUnit(costPerUnit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-center text-xl p-4 pb-0  ">Pricing</h1>
      <div className="divider" />
      <div className="flex gap-6 justify-center items-center">
        <label htmlFor="name" className="p-2 pl-4 text-lg">
          Electric-Bill
        </label>
        <input
          type="number"
          id="name"
          className="input h-8 w-20 input-bordered text-center "
          value={costPerUnit}
          onChange={handleCostPerUnitChange}
        />
      </div>
      {/* space ga  */}
      <div className="h-10" />

      {/* save btn */}
      <div className="flex justify-center">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Pricing;
