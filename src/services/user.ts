import {
  collection,
  doc,
  getDoc,
  getDocs,
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

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as User;
  } else {
    return null;
  }
};

export const createUser = async (user: User) => {
  if (user.id) {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
    return { status: true, user };
  }
  return { status: false };
};
