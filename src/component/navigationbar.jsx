import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MobileNavigationBar from "./mobnav";
export default function Navigationbar() {
  const [mobNavbarOpen, setMobNavbarOpen] = useState(false);

  function navBarClose() {
    setMobNavbarOpen(false);
  }
  return (
    <>
      {mobNavbarOpen && <MobileNavigationBar navbarclose={navBarClose} />}

      <div className="flex justify-between p-6 backdrop-blur-sm   text-2xl font-bold items-center h-[15vh] text-primary">
        <div>
          <img
            src="logo.webp"
            alt=""
            className="sm:w-40 sm:h-20 w-25 h-13 bg-blue-500 transform skew-x-12 rounded-bl-2xl rounded-tr-2xl "
          />
        </div>

        <ul className="sm:flex gap-x-6 hidden">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact us</Link>
          <Link to="/rooms">Rooms</Link>
        </ul>

        <ul className="flex items-center justify-center">
          <li className="sm:flex gap-x-6 hidden">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </li>
          <li
            className="sm:hidden flex flex-col gap-y-1.5 transform rotate-180"
            onClick={() => setMobNavbarOpen(true)}
          >
            <div className="w-13 h-1.5 bg-white"></div>
            <div className="w-8 h-1.5 bg-white"></div>
            <div className="w-13 h-1.5 bg-white"></div>
          </li>
        </ul>
      </div>
    </>
  );
}
