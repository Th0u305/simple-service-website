import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";
import logoNav from "../../assets/working.png";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaLifeRing } from "react-icons/fa";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { AuthContext } from "../Context/ContextProvider";
import { NestedMenu } from "./MenuBtn";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOutUser = () => {
    if (!user && !user?.email) {
      return toast.error("You're Not Logged In");
    }
    signOutUser()
      .then(() => {
        if (user) {
          toast.success("Signed Out Successfully");
        }
      })
      .catch(() => {
        toast.error("Please Try Again");
      });
  };

  return (
    <Navbar
      maxWidth="full"
      className="rounded-xl container mx-auto fixed top-12 z-50 shadow w-[95%]"
    >
      <NavbarContent className="">
        <div className="flex justify-center items-center lg:hidden">
          <NestedMenu></NestedMenu>
        </div>
        <NavbarBrand className="hidden lg:flex gap-2">
          <img src={logoNav} className="w-8" alt="" />
          <a href="/" className="font-bold text-inherit">
            TrustWise
          </a>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="" justify="center">
        <NavbarBrand className="lg:hidden gap-2">
          <img src={logoNav} className="w-8" alt="" />
          <a href="/" className="font-bold text-inherit">
            TrustWise
          </a>
        </NavbarBrand>
        <div className="hidden lg:flex gap-5 justify-center items-center">
          <NavbarItem>
            <Link
              className="text-lg"
              color="foreground"
              href="/"
              onPress={() =>
                myRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Home
            </Link>
          </NavbarItem>

          <NavbarContent
            className="hidden sm:flex gap-4 w-fit p-0"
            justify="center"
          >
            <Dropdown className="">
              <NavbarItem className="flex justify-center items-center">
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="text-lg w-12"
                    radius="sm"
                    variant="light"
                  >
                    Services
                  </Button>
                </DropdownTrigger>
                <MdKeyboardArrowDown className="text-2xl" />
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className=""
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem key="autoscaling" className="w-fit mx-auto" textValue="daw">
                  <Link
                    className="text-lg "
                    color="foreground"
                    aria-current="page"
                    href="/services"
                    onPress={() =>
                      myRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    All Services
                  </Link>
                </DropdownItem>
                <DropdownItem key="usage_metrics" className="w-fit mx-auto" textValue="oad">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/addService"
                    onPress={() =>
                      myRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    Add Service
                  </Link>
                </DropdownItem>
                <DropdownItem key="production_ready" className="w-fit mx-auto" textValue="3e">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/myReviews"
                    onPress={() =>
                      myRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    My Reviews
                  </Link>
                </DropdownItem>
                <DropdownItem key="production_ready" className="w-fit mx-auto" textValue="90f">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/myService"
                    onPress={() =>
                      myRef.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  >
                    My Services
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>

          <NavbarItem>
            <Link
              className="text-lg"
              color="foreground"
              href="/contact"
              onPress={() =>
                myRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Contact
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-lg"
              color="foreground"
              href="/about"
              onPress={() =>
                myRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              About us
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Button
          as={Link}
          color="primary"
          href="/login"
          variant="flat"
          className="hidden lg:flex bg-[#000000d8] text-white text-base"
        >
          Login
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.displayName}
              size="sm"
              src={user?.photoUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="" textValue="--">
              <p className="font-semibold">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.displayName}
                  size="sm"
                  src={user?.photoUrl}
                />
              </p>
              <p className="font-semibold mt-3">
                {user?.email || "example@gmail.com"}
              </p>
            </DropdownItem>
            <DropdownItem key="settings2" href="/dashboard" textValue="12">
              <p className="flex justify-start items-center gap-2">
                <FaUser className="text-xl"></FaUser>
                My profile
              </p>
            </DropdownItem>
            <DropdownItem key="settings" href="/dashboard" textValue="44">
              <p className="flex justify-start items-center gap-2">
                <MdDashboard className="text-xl text-blue-500"></MdDashboard>
                Dashboard
              </p>
            </DropdownItem>
            <DropdownItem key="system" href="/dashboard" textValue="66">
              <p className="flex justify-start items-center gap-2">
                <IoMdSettings className="text-xl"></IoMdSettings>
                Settings
              </p>
            </DropdownItem>
            <DropdownItem key="configurations" href="/dashboard" textValue="69">
              <p className="flex justify-start items-center gap-2">
                <MdOutlineAttachMoney className="text-xl text-green-600"></MdOutlineAttachMoney>
                Billings
              </p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback" textValue=";l">
              {" "}
              <p className="flex justify-start items-center gap-2">
                <FaLifeRing className="text-xl text-yellow-800"></FaLifeRing>
                Help & Feedback
              </p>
            </DropdownItem>
            <DropdownItem onPress={handleSignOutUser} textValue="2fv">
              <p className="flex justify-center items-center gap-2 bg-red-100 p-3 rounded-2xl">
                <MdLogout className="text-xl text-red-600"></MdLogout>
                Log out
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
