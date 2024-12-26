import React, { useContext, useState } from "react";
import avatarLogo from "../../../../assets/face.gif";
import {  useNavigate } from "react-router-dom";
import Money from "./DashboardPages/Money";
import { AuthContext } from "../../../Context/ContextProvider";
import { firebaseAuth } from "../../../firebase/firebase.config";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";
import Settings from "./DashboardPages/Settings";
import Profile from "./DashboardPages/Profile";

const Dashboard = () => {
  const {
    loading,
    user,
    myRef,
    viewSetting,
    setViewSetting,
    viewWallet,
    setViewWallet,
    viewProfile,
    setVieProfile,
  } = useContext(AuthContext);
 
  const navigate = useNavigate();

  if (loading) {
    return <span class="loading loading-ring loading-lg hidden"></span>;
  }
  const handleBtn = (id) => {
    if (id === "wallet") {
      setVieProfile(false);
      setViewWallet(true);
      setViewSetting(false);
    } else if (id === "profile") {
      setVieProfile(true);
      setViewWallet(false);
      setViewSetting(false);
    } else if (id === "setting") {
      setVieProfile(false);
      setViewWallet(false);
      setViewSetting(true);
    }
  };

 

  const handleDeleteUser = async () => {
    const user = firebaseAuth.currentUser;

    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to enter your password.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed && user) {
      const { value: password } = await Swal.fire({
        title: "Enter your password",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      });

      try {
        // Reauthenticate the user
        const credential = EmailAuthProvider.credential(user.email, password); // Replace with actual password
        await reauthenticateWithCredential(user, credential);

        // Delete the user
        await deleteUser(user);
        toast.success("User Deleted");
        navigate("/");
      } catch (error) {
        toast.error("Please give correct credential");
      }
    }
  };

  return (
    <div className="flex mt-12 mb-12 lg:items-end p-8" ref={myRef}>
      <Helmet>
        <title>EcoVenture | Dashboard</title>
      </Helmet>
      <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
        <h2 className="text-5xl font-bold mb-6 text-center">Dashboard</h2>
        <div className="bg-white grid grid-cols-1 lg:grid-cols-3 p-8 shadow-md rounded-md overflow-hidden gap-5 ">
          <div className="border-2 rounded-2xl pt-12 flex flex-col justify-start items-center mb-12">
            <div className="mb-6 text-center">
              <img
                src={user ? user.photoURL : avatarLogo}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-300"
              />
              <div className="mt-8">
                <h1 className="text-2xl">{user?.displayName || "John Doe"}</h1>
                <p className="text-lg">{user?.email || "example@gmail.co"}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleBtn("profile")}
              className="w-[90%] mt-5 mb-5 py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => handleBtn("wallet")}
              className="w-[90%] mb-5 py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Wallet
            </button>
            <button
              type="button"
              onClick={() => handleBtn("setting")}
              className="w-[90%] mb-8 py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Settings
            </button>
          </div>

          {/* profile form  */}

          {viewProfile && (
           <Profile></Profile>
          )}
          <div className="col-span-2">
            {viewWallet && <Money></Money>}
            {viewSetting && (
              <Settings handleDeleteUser={handleDeleteUser}></Settings>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
