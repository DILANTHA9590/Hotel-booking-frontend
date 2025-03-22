import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Navigationbar() {
  return (
    <>
      <div className="flex justify-between p-6 backdrop-blur-sm  bg-white/20 text-2xl font-bold  text-primary items-center h-[15vh]">
        <div>
          <img
            src="logo.webp"
            alt=""
            className="sm:w-40 sm:h-20 w-25 h-13 bg-blue-500 transform skew-x-12 rounded-bl-2xl rounded-tr-2xl "
          />
        </div>

        <ul className="sm:flex gap-x-6 hidden">
          <Link>Home</Link>

          <Link to="/about">About</Link>
          <Link>Gallery</Link>
          <Link>category</Link>
          <Link>Rooms</Link>
        </ul>

        <ul className="flex items-center justify-center">
          <li className="sm:flex gap-x-6 hidden">
            <button>SignUp</button>
            <button>Login</button>
          </li>
          <li className="sm:hidden flex flex-col gap-y-1.5 transform rotate-180">
            <div className="w-13 h-1.5 bg-white"></div>
            <div className="w-8 h-1.5 bg-white"></div>
            <div className="w-13 h-1.5 bg-white"></div>
          </li>
        </ul>
      </div>
    </>
  );
}
