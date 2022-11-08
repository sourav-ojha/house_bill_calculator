import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { ElectricBill, Tenant } from "./types";
import { db } from "./firebase";

export const getTenantsList = async () => {
  const colRef = collection(db, "tenants");
  const querySnapshot = await getDocs(colRef);
  const tenants: Tenant[] = [];
  console.log("yup  ");
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
export const createTenant = async (tenant: Tenant) => {};
export const updateTenant = async (tenant: Tenant) => {};
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
  const docRef = await addDoc(colRef, body);
  console.log("Document written with ID: ", docRef.id);
  return { ...body, id: docRef.id } as ElectricBill;
};
