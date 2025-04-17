import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPhone } from "react-icons/bi";
import { useNavigate } from "react-router";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Myaccount() {
  const [userdata, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        toast.error("Failed to fetch user data");
        console.log(error);
      });
  }, []);

  if (!userdata) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl sm:h-auto h-full">
      <div className="flex flex-col items-center text-center">
        <FaUserCircle className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold capitalize">
          {userdata.firstName} {userdata.lastName}
        </h2>
        <p className="text-sm text-gray-500 capitalize">
          Account Type: {userdata.type}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <MdEmail className="text-xl" />
          <span>{userdata.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <BiPhone className="text-xl" />
          <span>{userdata.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FaWhatsapp className="text-xl" />
          <span>{userdata.whatsApp}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Email Verified:</span>
          <span
            className={
              userdata.emailVerified
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }
          >
            {userdata.emailVerified ? "Yes" : "No"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Account Status:</span>
          <span
            className={
              userdata.disabled
                ? "text-red-600 font-medium"
                : "text-green-600 font-medium"
            }
          >
            {userdata.disabled ? "Disabled" : "Active"}
          </span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/mybooking")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
