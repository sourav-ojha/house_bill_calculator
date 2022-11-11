import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ElectricBill, Tenant } from "./types";
import { db } from "./firebase";
import { pricingDocId } from "../constants";

export const getTenantsList = async () => {
  const colRef = collection(db, "tenants");
  const querySnapshot = await getDocs(colRef);
  const tenants: Tenant[] = [];
  querySnapshot.forEach((doc) => {
    tenants.push({ ...doc.data(), id: doc.id } as Tenant);
  });
  return tenants;
};

export const getTenant = async (tenantId: string) => {
  const docRef = doc(db, "tenants", tenantId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as Tenant;
  } else {
    return null;
  }
};
export const createTenant = async (tenant: Tenant) => {
  const colRef = collection(db, "tenants");
  const docRef = await addDoc(colRef, {
    ...tenant,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
};

export const updateTenant = async (tenant: Partial<Tenant>) => {
  if (!tenant.id) return;
  const docRef = doc(db, "tenants", tenant.id);
  await updateDoc(docRef, tenant);
};
export const deleteTenant = async (tenantId: string) => {};

export const getTenantElectricBill = async (tenantId: string) => {
  const colRef = collection(db, "tenants", tenantId, "bills");
  const q = query(colRef, orderBy("timestamp", "desc"), limit(3));
  const querySnapshot = await getDocs(q);
  const bills: ElectricBill[] = [];
  querySnapshot.forEach((doc) => {
    bills.push({ ...doc.data(), id: doc.id } as ElectricBill);
  });
  return bills;
};
export const createTenantElectricBill = async (
  tenantId: string,
  body: ElectricBill
) => {
  const colRef = collection(db, "tenants", tenantId, "bills");
  const docRef = await addDoc(colRef, {
    ...body,
    timestamp: serverTimestamp(),
  });
  await updateTenant({
    id: tenantId,
    lastBillAmount: body.amount,
    lastBillDate: body.date,
    lastBillFinalUnit: body.finalUnit,
    lastBillUnitConsumed: body.unitConsumed,
  });
  console.log("Document written with ID: ", docRef.id);
  return { ...body, id: docRef.id } as ElectricBill;
};

export const getCostPerUnit = async () => {
  const docRef = doc(db, "pricing", pricingDocId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().costPerUnit;
  } else {
    return null;
  }
};

export const updateCostPerUnit = async (costPerUnit: number) => {
  const docRef = doc(db, "pricing", pricingDocId);
  // await updateDoc(docRef, { costPerUnit });
  await setDoc(docRef, { costPerUnit });
  return costPerUnit;
};
