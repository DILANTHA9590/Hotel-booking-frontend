import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);

  const [loading, setloading] = useState(false);
  const [status, setStatus] = useState(bookings.status);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }

    if (!loading) {
      axios
        .get("http://localhost:5000/api/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setBookings(res.data.bookings);
          setloading(true);
          if (!setBookings) {
            toast.success("No bookings available at the moment.");
          }

          // console.log(res.data.bookings);
        })
        .catch((error) => {
          toast.error("Something went wrong. Please try again later.");
          console.log(error);
        });
    }

    console.log(token);
  }, [loading]);

  function deleteBooking(bookingId) {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:5000/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Deleted Successfully");
        setloading(false);
      })
      .catch((erorr) => {
        toast.error("Error occurd");
        console.log(erorr);
      });
  }

  function handleStatusChange(bookingId, newStatus) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unautherized Access please login to admin account");
      navigate("/login");
    }

    if (newStatus === "") {
      return; 
    }

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: newStatus } 
      )
    );

    axios
      .put(`http://localhost:5000/api/booking/status/${bookingId}`, {
        newStatus,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("status update unsuccessfully");
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mx-auto bg-gray-100 p-4 h-screen  overflow-hidden overflow-y-scroll ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
                <th className="py-3 px-6 text-left border">Booking ID</th>
                <th className="py-3 px-6 text-left">Room ID</th>
                <th className="py-3 px-6 text-left border">Email</th>
                <th className="py-3 px-6 text-left border">Status</th>
                <th className="py-3 px-6 text-left border">Reason</th>
                <th className="py-3 px-6 text-left border">Start</th>
                <th className="py-3 px-6 text-left border">End</th>
                <th className="py-3 px-6 text-left border">Notes</th>
                <th className="py-3 px-6 text-left border">Timestamp</th>
                <th className="py-3 px-6 text-left border">delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {bookings.map((booking, index) => (
                <tr
                  key={booking.bookingId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left border">
                    {booking.bookingId}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {booking.roomId}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {booking.email}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    <select
                      name="status"
                      id="status"
                      className="w-[80px]"
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.bookingId, e.target.value)
                      }
                    >
                      <option value="">Status</option>
                      <option value="Confirm">Confirmed</option>
                      <option value="Reject">Rejected</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </td>

                  <td className="py-3 px-6 text-left border">
                    {booking.reason}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {booking.start}
                  </td>
                  <td className="py-3 px-6 text-left border">{booking.end}</td>
                  <td className="py-3 px-6 text-left border">
                    {booking.notes}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {booking.timeStamps}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    <button className="py-3 px-6 ">
                      <MdDelete
                        className=" text-center"
                        onClick={() => deleteBooking(booking.bookingId)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
