import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AdminBookingPanel from "./admin-panel-components/adminBookingPanel";
import { MdDelete } from "react-icons/md";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loaded, setloaded] = useState(false);

  const [status, setStatus] = useState(bookings.status);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function fetchData(id = "") {
    console.log("ssssssssssssssssssss", id);

    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }
    setloaded(false);
    axios
      .get("http://localhost:5000/api/booking", {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data.bookings);
        setloaded(true);

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

  useEffect(() => {
    if (!loaded) {
      fetchData();
    }
  }, [loaded]);

  useEffect(() => {
    if (search === "") {
      fetchData("");
    }
  }, [search]);

  //DELETE BOOKINS
  function deleteBooking(bookingId) {
    const token = localStorage.getItem("token");

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Deleted Successfully");
        setloaded(false);
      })
      .catch((erorr) => {
        toast.error("Error occurd");
        console.log(erorr);
      });
  }

  //STATUS CHNAGE
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
          : booking
      )
    );

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/status/${bookingId}`,
        {
          newStatus,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error("status update unsuccessfully");
        console.log(error);
      });
  }

  function handleSearch() {
    fetchData(search);
  }

  if (!loaded) {
    return (
      <div className="flex justify-center items-center w-full bg-primary ">
        <p className="w-[100px] h-[100px] border border-primary border-t-4 border-t-blue-700 rounded-full animate-spin"></p>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto bg-gray-100 p-4 h-screen  overflow-hidden overflow-y-scroll relative">
        {/* {!loaded && (
          <div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
            <p className="w-[100px] h-[100px] border border-primary border-t-4 border-t-blue-700 rounded-full animate-spin"></p>
          </div>
        )} */}
        <div className="flex  gap-x-1 pb-3">
          <input
            type="text"
            className="border w-[90%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-amber-600 px-2 py-0.2" onClick={handleSearch}>
            Search Here
          </button>
        </div>

        {bookings.length == 0 ? (
          <div>
            <>
              <div class="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl shadow p-6">
                <div class="text-center space-y-4">
                  <div class="text-[80px]">😔</div>
                  <h1 class="text-5xl font-bold text-gray-800">404</h1>
                  <h2 class="text-2xl font-semibold text-gray-700">
                    Oops! Booking' Not Found
                  </h2>
                  <p class="text-gray-500 max-w-md mx-auto">
                    We couldn't find any Booking ID matching your search. Please
                    check the spelling or try again.
                  </p>
                  <button class="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                    Go Back
                  </button>
                </div>
              </div>
            </>
          </div>
        ) : (
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
                    <AdminBookingPanel
                      {...booking}
                      deleteBooking={deleteBooking}
                      handleStatusChange={handleStatusChange}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
