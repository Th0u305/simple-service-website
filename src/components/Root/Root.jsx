import { FooterWithSocialLinks } from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carrousel from "../Home/Carrousel";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../Context/ContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import "./loader.css";

const Root = () => {
  const { pathname } = useLocation();
  const [views, setViews] = useState(true);
  const { setViewWallet, setVieProfile, setViewSetting, loader , loading} =
    useContext(AuthContext);

  useEffect(() => {
    if (
      pathname === "/dashboard" ||
      pathname === "/login" ||
      pathname === "/register"
    ) {
      setViews(false);
    } else {
      setViews(true);
    }

    if (pathname === "/dashboard/profile") {
      setViewWallet(false);
      setVieProfile(true);
      setViewSetting(false);
    }

    if (pathname === "/dashboard/billing") {
      setViewWallet(true);
      setVieProfile(false);
      setViewSetting(false);
    }
    if (pathname === "/dashboard/setting") {
      setViewWallet(false);
      setVieProfile(false);
      setViewSetting(true);
    }
  }, [pathname]);

  return (
    <NextUIProvider>
      {loading ? (
        <div className="loader h-screen mx-auto my-auto"></div>
      ) : (
        <div>
          <Helmet></Helmet>
          <Toaster />
          <Navbar></Navbar>
          {views && <Carrousel></Carrousel>}
          <div className="container mx-auto p-3 md:p-0">
            <Outlet></Outlet>
          </div>
          <FooterWithSocialLinks></FooterWithSocialLinks>
        </div>
      )}
    </NextUIProvider>
  );
};

export default Root;
