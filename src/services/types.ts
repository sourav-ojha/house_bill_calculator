import { Timestamp } from "firebase/firestore";

export type Tenant = {
  houseNo: string;
  id: string;
  lastBillAmount: Number;
  lastBillDate: string;
  lastBillFinalUnit: Number;
  lastBillUnitConsumed: Number;
  name: string;
  phone: string;
};

export type ElectricBill = {
  id: string;
  amount: Number;
  date: string;
  finalUnit: Number;
  initialUnit: Number;
  timestamp?: typeof Timestamp;
  unitConsumed: Number;
};
