import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import NavbarItem from "./NavbarItem";
import { BsChevronDown } from "react-icons/bs";
import Menu from "../ui/Menu";
const Navbar = () => {
  return (
    <nav className="w-full fixed z-40 ">
      <div className="px-4 md:px-16 flex items-center transition py-6 flex-row duration-500 bg-opacity-90 bg-zinc-900">
        <div className="relative aspect-video p-0 m-0 overflow-hidden w-[70px] lg:w-[100px] h-4 lg:h-7">
          <Image src={logo.src} alt="logo" fill />
        </div>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="News & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse By Language" />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative ml-8 ">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown size={14} className="text-white transition-all" />
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
