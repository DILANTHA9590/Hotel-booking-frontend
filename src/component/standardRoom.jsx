import { useEffect, useState } from "react";
import axios from "axios";

export default function StandardRoom() {
  const [rooms, setRooms] = useState([
    {
      roomId: 101,
      category: "deluxe",
      maxGuests: 4,
      available: true,
      photos: [
        "https://th.bing.com/th/id/OIP.e96S2cWQlu_Qgz-C3EkOHQHaE8?w=660&h=440&rs=1&pid=ImgDetMain",
        "deluxe2.jpg",
      ],
      specialsDescriptions: "A spacious room with a beautiful sea view.",
      notes: "Includes breakfast for two.",
    },
    {
      roomId: 102,
      category: "standard",
      maxGuests: 2,
      available: true,
      photos: [
        "https://ssl.cdn-redfin.com/photo/440/bigphoto/189/293189_7_5.jpg",
        "standard2.jpg",
      ],
      specialsDescriptions: "Cozy room for a comfortable stay.",
      notes: "Free Wi-Fi available.",
    },
    {
      roomId: 103,
      category: "luxury",
      maxGuests: 6,
      available: false,
      photos: [
        "https://images.pexels.com/photos/1470945/pexels-photo-1470945.jpeg?cs=srgb&dl=architecture-apartment-room-1470945.jpg&fm=jpg",
        "luxury2.jpg",
      ],
      specialsDescriptions: "Exclusive luxury suite with a private balcony.",
      notes: "Includes a private butler service.",
    },
    {
      roomId: 104,
      category: "family",
      maxGuests: 5,
      available: true,
      photos: [
        "https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,fl_lossy/v1664312896/g5/g5-c-5m5d9vuh1-harbor-group-international-single-domain-client/g5-cl-1ki6k4fcoj-arvada-village-apartment-homes/uploads/Arvada_Village_6_mpbhfa.jpg",
        "family2.jpg",
      ],
      specialsDescriptions: "Spacious family room with kids' play area.",
      notes: "Child-friendly amenities available.",
    },
    {
      roomId: 105,
      category: "economy",
      maxGuests: 1,
      available: true,
      photos: [
        "https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_1200/s3/2/84711/seaside-grove-web_27.jpg",
        "economy2.jpg",
      ],
      specialsDescriptions: "Affordable room for solo travelers.",
      notes: "No additional amenities.",
    },
  ]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/`, {
        params: {
          category: "standard",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <>
      <div className="bg-primary h-full py-8 overflow-hidden overflow-y-scroll">
        <div className="w-[90%] bg-green-200 mx-auto p-6 rounded-lg shadow-lg">
          <div className="w-full flex gap-x-5 flex-wrap justify-center h-full">
            {rooms.map((room, index) => (
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
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
