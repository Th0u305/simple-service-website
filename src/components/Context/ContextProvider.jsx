import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/firebase.config";
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
import { useRef } from 'react';
import axios from "axios";
import Loading from "../loader/Loading";

const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewWallet, setViewWallet] = useState(false);
  const [viewProfile, setVieProfile] = useState(true);
  const [viewSetting, setViewSetting] = useState(false);
  const [service, setService] = useState([])
  const [service2, setService2] = useState([])
  const [loader, setLoader] = useState(true)
  const myRef = useRef(null)


  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/allService")
      .then((response) => {
        setService(response.data.sort(() => Math.random() - 0.5).slice(0, 12));
        const data2 = response.data
          .map((item) => item?.reviews?.find((item2) => item2?.userName))
          ?.filter(Boolean);

        setService2(data2);
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  // register or create account
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // sign in method

  const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(firebaseAuth, email, password)
}

  // check for current logged user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {      
      if (currentUser?.email) {
        setUser(currentUser);
        const {data} = await axios.post ('https://service-web-server.vercel.app/jwt', {email:currentUser?.email}, {withCredentials : true})  
      }else{
        setUser(currentUser)
        const {data} = await axios.get ('https://service-web-server.vercel.app/logout', {withCredentials : true})
      }
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // sign out user
  const signOutUser = () => {
    setLoading(true)
    return signOut(firebaseAuth);
  };

  //  google pop up
  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  
  // reset password 

  const resetUserPassword =(email)=>{
    return sendPasswordResetEmail(firebaseAuth, email)
  }

 // update user profile
  const updateUserProfile = (updateData) =>{
    return updateProfile(firebaseAuth.currentUser, updateData)
  }


  const contextData = {
    signInWithGoogle,
    signOutUser,
    user,
    setUser,
    loading,
    setLoading,
    signInUser,
    createUser,
    updateUserProfile,
    resetUserPassword,
    myRef,
    viewProfile,
    setVieProfile,
    viewWallet,
    setViewWallet,
    viewSetting,
    setViewSetting,
    loader,
    setLoader,
    service2, setService2,
    service, setService
  };

  return (
    <AuthContext.Provider value={contextData}>{service.length === 0 ? (<Loading/>) : children}</AuthContext.Provider>
  );
};

export default ContextProvider;
