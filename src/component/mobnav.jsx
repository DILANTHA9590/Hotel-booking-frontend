import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BiSolidContact } from "react-icons/bi";
import { BiCategory } from "react-icons/bi";
import { BiSolidLogInCircle } from "react-icons/bi";
import { IoCreateSharp } from "react-icons/io5";

export default function MobileNavigationBar(props) {
  return (
    <>
      <div className="fixed w-screen h-screen bg-black/40  sm:hidden z-50">
        <div className="w-[60%] h-full relative  backdrop-blur-xl">
          <div>
            <img
              src="logo.webp"
              alt=""
              className="transform skew-x-12 rounded-bl-2xl rounded-tr-2xl w-[60px] h-[4 0px]"
            />
          </div>
          <div
            className="absolute top-0 right-0 p-1 "
            onClick={props.navbarclose}
          >
            <AiOutlineClose className="w-[30px] h-[30px]" />
          </div>

          <div className="flex flex-col gap-y-4 mt-20 ml-1">
            <div className="flex flex-col items-center">
              <BiSolidLogInCircle size={24} />
              <Link to="/login">Login</Link>
            </div>

            <div className="flex flex-col items-center">
              <IoCreateSharp size={24} />
              <Link to="/signup">Sign up</Link>
            </div>

            <div className="flex flex-col items-center">
              <FaHome size={24} />
              <Link to="/">Home</Link>
            </div>

            <div className="flex flex-col items-center">
              <FcAbout size={24} />
              <Link to="/about">About</Link>
            </div>

            <div className="flex flex-col items-center">
              <BiSolidContact size={24} />
              <Link to="/contact">Contact</Link>
            </div>

            <div className="flex flex-col items-center">
              <BiCategory size={24} />
              <Link to="/category">Categories</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
