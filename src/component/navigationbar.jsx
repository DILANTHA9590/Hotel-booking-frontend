import { Link, Route, Routes } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MobileNavigationBar from "./mobnav";
import axios from "axios";
import AdminBooking from "./admin/adminBooking";
import { HiH1 } from "react-icons/hi2";
export default function Navigationbar() {
  const [mobNavbarOpen, setMobNavbarOpen] = useState(false);
  const [token, setToken] = useState();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  function navBarClose() {
    setMobNavbarOpen(false);
  }

  function onclick() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <>
      {mobNavbarOpen && <MobileNavigationBar navbarclose={navBarClose} />}

      <div className="flex justify-between p-6 backdrop-blur-sm   text-2xl font-bold items-center h-[15vh] text-primary relative">
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
          <Link to="/category">category</Link>
          {token && <Link to="/myaccount">My account</Link>}

          <button onClick={onclick}>Click me</button>
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
      {/* 
      <div>
        {isOpen && (
          <div className=" absolute w-full h-full z-60 ">
            <div className="w-[60%]  h-[85vh] bg-black/80 mx-auto">
              <div className="h-[20%] bg-amber-200 flex justify-center gap-5 p-4">
                <Link to="/mybooking">My Booking</Link>
                <Link to="/mybooking">My account</Link>
              </div>

              <div className="h-[80%] bg-amber-500">
                <Routes>
                  <Route path="/mybooking" element={<h1>lllllllllllll</h1>} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
}
