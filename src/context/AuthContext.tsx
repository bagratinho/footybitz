import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
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
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(r => console.log(r))
      .catch(e => {
        setIsLoading(false);
        setAuthError(e)
      });
  };

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetAuthError = () => {
    setAuthError(null);
  }

  const signOut = () => firebaseSignOut(auth);

  const resetPassword = async (email: string) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser: any) => {
      console.log({ currentUser });
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authError,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
        resetAuthError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;