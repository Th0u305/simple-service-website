import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { CiLink } from "react-icons/ci";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../../../Context/ContextProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";



const Profile = () => {
    
    const {
 
        updateUserProfile,

      } = useContext(AuthContext);
      const [showPassword, setShowPassword] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const navigate = useNavigate();


    const updateProfile = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
    
        updateUserProfile({ displayName: name, email: email, photoURL: photo })
          .then(() => {
            if (name) {
              toast.success("Successfully changed your name");
              e.target.reset();
              navigate("/dashboard");
            }
            if (email) {
              toast.success("Successfully changed your Email Id");
              e.target.reset();
              navigate("/dashboard");
            }
            if (photo) {
              toast.success("Successfully changed your Profile Picture");
              e.target.reset();
              navigate("/dashboard");
            }
            if (password) {
              if (password.length < 6) {
                setErrorMessage("Password should be 6 characters or longer ");
                return;
              }
              const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              if (!passwordRegex.test(password)) {
                setErrorMessage(
                  "Password must contain at least one uppercase, lowercase, number, special character"
                );
                return;
              }
              setErrorMessage("");
              e.target.reset();
              navigate("/dashboard");
    
              return toast.success("Successfully changed your password");
            }
          })
          .catch((err) => {
            toast.error("Please try again");
          });
      };


  return (
    <form
    
      onSubmit={updateProfile}
      className="md:w-[100%] mx-auto p-5 md:p-12 col-span-2 bg-gray-100 rounded-2xl"
    >
      <div className="space-y-6">
        <div>
          <label className="text-gray-800 text-lg mb-2 block">Name</label>
          <div className="relative flex items-center">
            <input
              name="name"
              type="text"
              className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter name"
            />
            <FaUser className="absolute right-4 text-2xl text-gray-400" />
          </div>
        </div>
        <div>
          <div className=" rounded-lg border-2 border-gray-500 mb-8 p-5 flex justify-evenly items-center">
            <div className="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
              <label
                for="upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 fill-white stroke-indigo-500"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-gray-600 font-medium">
                  Upload Picture
                </span>
              </label>
              <input id="upload" type="file" className="hidden" />
            </div>

            <p className="text-xl mt-5">Or upload via link</p>
          </div>
          <label className="text-gray-800 text-lg mb-2 block">Photo Url</label>
          <div className="relative flex items-center">
            <input
              name="photo"
              type="text"
              className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
              placeholder="Url"
            />

            <CiLink className="absolute right-4 text-3xl text-gray-400" />
          </div>
        </div>
        <div>
          <label className="text-gray-800 text-lg mb-2 block">Email Id</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="email"
              className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter email"
            />
            <HiOutlineMailOpen className="absolute right-4 text-2xl text-gray-400" />
          </div>
        </div>
        <div>
          <label className="text-gray-800 text-lg mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4  text-2xl text-gray-400 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
          </div>
          <p className="text-red-600">{errorMessage}</p>
        </div>
      </div>

      <div className="!mt-8">
        <button
          type="submit"
          className="w-full py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Update Profile{" "}
        </button>
      </div>
    </form>
  );
};

export default Profile;
