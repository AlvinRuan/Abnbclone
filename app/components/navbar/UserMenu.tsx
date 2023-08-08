"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import React, { useState } from "react";

const UserMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const openMenuClicked = () => {
    setOpenMenu(!openMenu);
    console.log("clicked!", openMenu);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm py-3 px-4 rounded-full hover: bg-white transition cursor-pointer">
          Rent Out Your Home
        </div>
        <div
          onClick={() => {
            openMenuClicked();
          }}
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 cursor-pointer flex flex-row items-center rounded-full gap-3 hover:shadow-md transition"
        >
          <GiHamburgerMenu className="hidden md:block" size={20} />
          <Avatar />
        </div>
        <div className="hidden md:block"></div>
      </div>
      {openMenu && (
        <div className="">
          <div className="flex flex-col cursor-pointer absolute rounded-xl right-0 shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 text-sm">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Sign Up!" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
