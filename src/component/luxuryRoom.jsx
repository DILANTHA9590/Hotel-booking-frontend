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
      <div className="bg-primary min-h-screen py-8 overflow-hidden overflow-y-auto relative">
        {loaded ? (
          <div className="h-full w-full absolute flex justify-center items-center overflow-hidden">
            <p className="h-30 w-30 border rounded-full border-t-amber-500 border-t-2 border-primary animate-spin"></p>
          </div>
        ) : (
          <div className="w-[90%] mx-auto p-6 rounded-lg shadow-lg">
            <div className="w-full flex gap-6 flex-wrap justify-center text-center">
              {rooms.map((room) => {
                const { roomId, photos, category, maxGuests, available } = room;
                return (
                  <Link to={`/roominfo/${roomId}`} key={roomId}>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 w-[280px] h-[470px] flex flex-col">
                      <img
                        src={photos[0]}
                        alt="Room"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="flex flex-col gap-y-3">
                          <p className="text-xl font-semibold text-gray-700">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Room ID: {roomId}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Max Guests: {maxGuests}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Available:{" "}
                            <span
                              className={
                                available ? "text-green-500" : "text-red-500"
                              }
                            >
                              {available ? "Yes" : "No"}
                            </span>
                          </p>
                        </div>
                        <div className="mt-4">
                          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                            View Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
