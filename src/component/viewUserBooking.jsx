import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function ViewMyBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setBookings(res.data.bookings || []);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings"
        );
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full h-full mx-auto px-4 py-8 overflow-hidden overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div className=" ">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Booking ID:{" "}
                  <span className="text-indigo-600">{booking.bookingId}</span>
                </h2>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <span
                    className={
                      booking.expired
                        ? "text-red-600  p-1 border-2"
                        : "text-green-600 border p-1 border-2"
                    }
                  >
                    {booking.expired ? " 🛑 Expired" : "🚀 In Progress"}
                  </span>
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Room ID:</span> {booking.roomId}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {booking.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Start:</span>{" "}
                {new Date(booking.start).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">End:</span>{" "}
                {new Date(booking.end).toLocaleDateString()}
              </p>
              {booking.notes && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Notes:</span> {booking.notes}
                </p>
              )}
              <p className="text-sm font-semibold mt-2">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    booking.status === "pending"
                      ? "bg-yellow-500"
                      : booking.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
