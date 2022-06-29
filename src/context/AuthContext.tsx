import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext<any|null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

const AuthProvider = (props: any) => {
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (email: string, password: string) => {
    const userCredential: any = await
    createUserWithEmailAndPassword(auth, email, password).catch((e: any) => {
      setIsLoading(false);
      setAuthMessage(e.code);
    });
    sendEmailVerification(userCredential.user);
  };

  const signIn = (email: string, password: string) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(r => console.log(r))
      .catch(e => {
        setIsLoading(false);
        setAuthMessage(e.code);
      });
  };

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetAuthMessage = () => {
    setAuthMessage(null);
  }

  const signOut = () => firebaseSignOut(auth);

  const resetPassword = (email: string) => {
    setIsLoading(true);
    return sendPasswordResetEmail(auth, email).then(() => {
      setAuthMessage("auth/reset-success");
      setIsLoading(false);
    }).catch((e: any) => {
      setIsLoading(false);
      setAuthMessage(e.code);
    });;
  }

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser: any) => {
      console.log({ currentUser });
      setUser(currentUser);
      setIsLoading(false);
      // if (currentUser && currentUser.emailVerified) {
      //   setUser(currentUser);
      //   setIsLoading(false);
      // } else if (currentUser === null) {
      //   setUser(null);
      //   setIsLoading(false);
      // } else if (currentUser && !currentUser.emailVerified) {
      //   setAuthMessage("auth/link-sent");
      //   setIsLoading(false);
      // }
    });
    return () => unsubuscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authMessage,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        resetAuthMessage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;