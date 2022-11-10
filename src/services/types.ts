import { Timestamp } from "firebase/firestore";

export type Tenant = {
  id?: string;
  houseNo: string;
  lastBillAmount: number;
  lastBillDate: string;
  lastBillFinalUnit: number;
  lastBillUnitConsumed: number;
  name: string;
  phone: string;
};

export type ElectricBill = {
  id?: string;
  amount: number;
  date: string;
  finalUnit: number;
  initialUnit: number;
  timestamp?: typeof Timestamp;
  unitConsumed: number;
};
