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
import { db } from "./firebase";
import { User } from "./types";

export const getUsersList = async () => {
  const colRef = collection(db, "users");
  const querySnapshot = await getDocs(colRef);
  const users: User[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id } as User);
  });
  return users;
};

export const updateRole = async (id: string, role: string) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, { role });
};
