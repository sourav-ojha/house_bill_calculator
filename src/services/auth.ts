import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

type loginWithGoogleReturnTypes = {
  user?: {
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
      creationTime: string;
      lastSignInTime: string;
    };
    phoneNumber: string;
    photoURL: string;
    uid: string;
  };
  token?: string;
  status: boolean;
  errorCode?: string;
  errorMessage?: string;
};

export const loginWithGoogle =
  async (): Promise<loginWithGoogleReturnTypes> => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        const user = result.user;
        return { user, token, status: true };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage, status: false };
      });
    return { status: false, errorCode: "unknown", errorMessage: "unknown" };
  };
