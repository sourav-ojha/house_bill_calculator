import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { loginWithGoogle } from "../services/auth";
import { auth } from "../services/firebase";
import { User } from "../services/types";
import { createUser, getUser } from "../services/user";

type contextProps = {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = React.createContext<contextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => {
  let context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userPayload = await getUser(user.uid);
        if (!userPayload) {
          let res = await createUser({
            id: user.uid,
            email: user.email,
            // @ts-ignore
            name: user.displayName,
            photoURL: user.photoURL,
            role: "user",
          });
          if (res.status && res.user) userPayload = res.user;
          else return;
        }
        setUser(userPayload);
        setLoading(false);
        console.log("auth state changed");
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    console.log("Inside UseEffect", loading);
  }, []);

  const login = async () => {
    setLoading(true);
    let { status, token, errorCode, errorMessage, user } =
      await loginWithGoogle();
    console.log(status, errorCode, errorMessage, user);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="absolute top-0 w-screen h-screen opacity-50 ">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
