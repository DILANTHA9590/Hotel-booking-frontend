import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function LuxuryRoom() {
  const [rooms, setRooms] = useState([]);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    if (loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/category`, {
          params: {
            category: "luxury",
          },
        })
        .then((res) => {
          console.log(res);
          setRooms(res.data.rooms);
          setLoaded(false);
        });
    }
  }, []);
  return (
    <>
      <div className="bg-primary h-full py-8 overflow-hidden overflow-y-auto relative">
        {loaded ? (
          <div className=" h-full w-full absolute flex justify-center items-center overflow-hidden">
            <p className=" h-30 w-30 border rounded-full border-t-amber-500 border-t-2 border-primary animate-spin"></p>
          </div>
        ) : (
          <div className="w-[90%] mx-auto p-6 rounded-lg shadow-lg">
            <div className="w-full flex gap-x-5 flex-wrap justify-center h-full text-center">
              {rooms.map((room, index) => (
                <Link to={`/roominfo/${room.roomId}`}>
                  <div
                    key={room.roomId}
                    className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 max-w-xs"
                  >
                    <img
                      src={room.photos[0]}
                      alt="Room"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xl font-semibold text-gray-700">
                        {room.category}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Room ID: {room.roomId}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Max Guests: {room.maxGuests}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Available:{" "}
                        <span
                          className={
                            room.available ? "text-green-500" : "text-red-500"
                          }
                        >
                          {room.available ? "Yes" : "No"}
                        </span>
                      </p>
                      <div className="mt-4">
                        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                          View Room
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
