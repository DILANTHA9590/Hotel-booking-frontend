import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loding, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }

    axios
      .get("http://localhost:5000/api/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data.bookings);
        if (!setBookings) {
          toast.success("No bookings available at the moment.");
        }

        // console.log(res.data.bookings);
      });

    console.log(token);
  }, []);

  return (
    <>
      <div className="container mx-auto bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Booking Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">Room ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Reason</th>
                <th className="py-3 px-6 text-left">Start</th>
                <th className="py-3 px-6 text-left">End</th>
                <th className="py-3 px-6 text-left">Notes</th>
                <th className="py-3 px-6 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              Row 1
              {bookings.map((booking, index) => (
                <tr
                  key={booking.bookingId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{booking.bookingId}</td>
                  <td className="py-3 px-6 text-left">{booking.roomId}</td>
                  <td className="py-3 px-6 text-left">{booking.email}</td>
                  <td className="py-3 px-6 text-left">{booking.status}</td>
                  <td className="py-3 px-6 text-left">{booking.reason}</td>
                  <td className="py-3 px-6 text-left">{booking.start}</td>
                  <td className="py-3 px-6 text-left">{booking.end}</td>
                  <td className="py-3 px-6 text-left">{booking.notes}</td>
                  <td className="py-3 px-6 text-left">{booking.timeStamps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
