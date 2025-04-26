import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function ExpireBookings() {
  const navigate = useNavigate();

  const [expiredBookings, setExpiredBooking] = useState([]); // Ensure it's an empty array initially

  const [loaded, setLoaded] = useState(false);
  const [update, setUpdate] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    if (!loaded) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + "/api/booking/getexpirebookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setExpiredBooking(res.data.expiredBooking || []); // Ensure data is always an array
          setLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    }
  }, [loaded]);

  function updateRoomStatus(roomId, update) {
    setLoaded(false);
    console.log(roomId);
    console.log(update);
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + roomId,
        {
          update: update,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🕒 Expired Bookings
      </h1>

      {expiredBookings && expiredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No expired bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expiredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Room: {booking.roomId}
              </h2>
              <p className="text-gray-700">
                <strong>User:</strong> {booking.email}
              </p>

              <p className="text-gray-700">
                <strong>Start Date:</strong>{" "}
                {new Date(booking.start).toDateString()}
              </p>
              <p className="text-gray-700">
                <strong>End Date:</strong>{" "}
                {new Date(booking.end).toDateString()}
              </p>

              <p className="text-secondry content text-center p-1 text-2xl">
                <strong>{booking.bookingId}</strong>{" "}
              </p>
              <span className="inline-block mt-4 px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full ">
                Expired
              </span>
              <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg">
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    <strong>Set room availability:</strong>
                  </p>
                  <span className="text-sm text-gray-500">
                    Choose the availability status for the room.
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    name="roomAvailability"
                    id="roomAvailability"
                    onChange={(e) => setUpdate(e.target.value)}
                  >
                    <option value="false" className="text-red-600">
                      Not Available
                    </option>
                    <option value="true" className="text-green-600">
                      Available
                    </option>
                  </select>

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all focus:outline-none"
                    onClick={() => updateRoomStatus(booking.roomId, update)}
                  >
                    Set Available
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
