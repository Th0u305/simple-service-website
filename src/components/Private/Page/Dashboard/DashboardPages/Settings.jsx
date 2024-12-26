import React, { useContext } from 'react';
import { AuthContext } from '../../../../Context/ContextProvider';
import { Helmet } from "react-helmet-async";


const Settings = ({handleDeleteUser}) => {
    const {user}= useContext(AuthContext)
    return (
        <div className="flex h-full justify-evenly items-center flex-col w-full col-span-2 bg-gray-100 rounded-2xl">
              <Helmet>
        <title>EcoVenture | Dashboard/setting</title>
      </Helmet>
              <div className="flex justify-center items-center flex-col gap-2">
                <img
                  className="w-28 h-28 rounded-full"
                  src={user?.photoURL || avatarLogo}
                  alt=""
                />
                <h1 className="text-2xl">{user.displayName || "John Doe"}</h1>
                <p>{user?.email || "example@gmail.com"}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteUser()}
                className="w-[15em] mb-8 py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                Delete Account
              </button>
            </div>
    );
};

export default Settings;