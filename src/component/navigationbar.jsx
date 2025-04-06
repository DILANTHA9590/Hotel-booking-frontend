import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
export default function Navigationbar() {
  const [mobNavbarOpen, setMobNavbarOpen] = useState(false);
  return (
    <>
      {mobNavbarOpen && (
        <div className="fixed w-screen h-screen bg-black/40 z-1">
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
              onClick={() => setMobNavbarOpen(false)}
            >
              <AiOutlineClose className="w-[30px] h-[30px]" />
            </div>

            <div className=" mt-[100px-] ">
              <p>test1</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
              <p>test</p>
            </div>
          </div>
        </div>
      )}

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

          <Link>category</Link>
          <Link to="/rooms">Rooms</Link>
        </ul>

        <ul className="flex items-center justify-center">
          <li className="sm:flex gap-x-6 hidden">
            <button>SignUp</button>
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
