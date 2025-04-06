import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export default function RoomOverView() {
  const { roomId } = useParams(); // Get roomId from URL
  const [room, setRoom] = useState(null); // Store room data
  const [loaded, setLoaded] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(false); // Reset loading state before fetching data

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`)
      .then((res) => {
        setRoom(res.data.roomsData);
        setLoaded(true); // Set loading to true after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching room data:", err);
        setLoaded(true); // Even if error, stop loading animation
      });
  }, [roomId]); // Re-fetch if roomId changes

  function onClickBookNow() {
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Oops! You need to sign in to make a reservation.");
    }

    navigate("/booking", {
      state: {
        roomId: room.roomId,
      },
    });
  }

  return (
    <>
      <div className="w-full h-full bg-primary text-white py-10 px-4 justify-around items-center flex">
        {loaded ? (
          room ? (
            <div className="flex flex-col sm:flex-row gap-8 max-w-7xl mx-auto">
              {/* Room Image */}
              <div className="w-full sm:w-[90%]">
                <img
                  src={
                    room?.photos?.length > 0 ? room.photos[0] : "default.jpg"
                  }
                  alt="Room"
                  className="rounded-xl shadow-xl w-full h-[400px] object-cover"
                />
              </div>

              {/* Room Details */}
              <div className="w-full sm:w-[50%] flex flex-col justify-center gap-5 text-black ">
                <h2 className="text-4xl font-bold tracking-wide">
                  Room {room.roomId}
                </h2>
                <p className="text-xl font-medium">{room.category} Room</p>
                <p className="text-lg">Max Guests: {room.maxGuests}</p>
                {room.specialsDescriptions && (
                  <p className="italic text-secondry">
                    {room.specialsDescriptions}
                  </p>
                )}
                <button
                  className="mt-4 w-fit bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300"
                  onClick={onClickBookNow}
                >
                  Book Now
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg text-white">
              No Room Data Found
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}
