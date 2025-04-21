import React, { useContext } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/ContextProvider";

export function NestedMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(true);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Menu>
      <MenuHandler>
        <button>
          {openMenu2 && (
            <svg
              onClick={() => setOpenMenu2(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}

          {!openMenu2 && (
            <svg
              onClick={() => setOpenMenu2(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </MenuHandler>
      <MenuList className="ml-2 md:ml-6 mt-5">
        <MenuItem key="^&r" onClick={() => navigate("/")}>Home</MenuItem>
        <Menu
          placement="right-start"
          open={openMenu}
          handler={setOpenMenu}
          allowHover
          offset={15}
        >
          <MenuHandler className="flex items-center justify-between">
            <MenuItem key=";;;12">
              Service
              <ChevronUpIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform ${
                  openMenu ? "rotate-90" : ""
                }`}
              />
            </MenuItem>
          </MenuHandler>
          <MenuList>
            <MenuItem key="eee11" onClick={() => navigate("/services")}> All Services</MenuItem>
            {user && (
              <>
                <MenuItem key="eee22" onClick={() => navigate("/addService")}> Add Service</MenuItem>
                <MenuItem key="eee33" onClick={() => navigate("/myReviews")}> My Reviews</MenuItem>
                <MenuItem key="eee44" onClick={() => navigate("/myService")}> My Services</MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
        <MenuItem key="[[[22" onClick={() => navigate("/contact")}>Contact</MenuItem>
        <MenuItem key="[[[44" onClick={() => navigate("/about")}> About us</MenuItem>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </MenuList>
    </Menu>
  );
}
