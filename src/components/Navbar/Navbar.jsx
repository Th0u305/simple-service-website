import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSignOutUser = () => {
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
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="rounded-xl container mx-auto fixed top-12 z-50 shadow"
    >
      <NavbarContent className="">
        <div className="flex justify-center items-center lg:hidden">
          <NestedMenu></NestedMenu>
        </div>
        <NavbarBrand className="hidden lg:flex">
          <AcmeLogo />
          <p className="font-bold text-inherit">TrustWise</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="" justify="center">
        <NavbarBrand className="lg:hidden">
          <AcmeLogo />
          <p className="font-bold text-inherit">TrustWise</p>
        </NavbarBrand>
        <div className="hidden lg:flex gap-5 justify-center items-center">
          <NavbarItem>
            <Link className="text-lg" color="foreground" href="/">
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
                <DropdownItem key="autoscaling" className="w-fit mx-auto">
                  <Link
                    className="text-lg "
                    color="foreground"
                    aria-current="page"
                    href="/services"
                  >
                    All Services
                  </Link>
                </DropdownItem>
                <DropdownItem key="usage_metrics" className="w-fit mx-auto">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/addService"
                  >
                    Add Service
                  </Link>
                </DropdownItem>
                <DropdownItem key="production_ready" className="w-fit mx-auto">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/myReviews"
                  >
                    My Reviews
                  </Link>
                </DropdownItem>
                <DropdownItem key="production_ready" className="w-fit mx-auto">
                  {" "}
                  <Link
                    className="text-lg"
                    color="foreground"
                    aria-current="page"
                    href="/myService"
                  >
                    My Services
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>

          <NavbarItem>
            <Link className="text-lg" color="foreground" href="/contact">
              Contact
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-lg" color="foreground" href="/about">
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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user?.displayName}</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" href="dashboard/profile">
              My profile
            </DropdownItem>
            <DropdownItem key="system" href="/dashboard/billing">
              Settings
            </DropdownItem>
            <DropdownItem key="configurations" href="/dashboard/billing">
              Billings
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={handleSignOutUser}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
