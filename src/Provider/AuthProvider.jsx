import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";
import { baseUrl } from "../URL/baseUrl";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  // Google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // Email sign in
  const signInWithEmailPass = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  // Email sign up
  const signUpWithEmailPass = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // sign out
  const logOut = () => {
    return signOut(auth);
  };
  // update profile
  const updateUser = (updatedUser) => {
    return updateProfile(auth.currentUser, updatedUser);
  };

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      axios.get(`${baseUrl}/users?email=${currentUser.email}`).then((res) => {
        const role = res.data.user.role;
        setUser({ ...currentUser, role });
      });
      setLoading(false);
   
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    signInWithGoogle,
    signInWithEmailPass,
    signUpWithEmailPass,
    logOut,
    updateUser,
    user,
    setUser,
    loading,
    setLoading,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
