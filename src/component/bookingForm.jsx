import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router";

export default function BookingForm() {
  const location = useLocation();
  const roomId = location?.state?.roomId; // Getting the roomId from the location

  console.log(roomId);

  const [formData, setFormData] = useState({
    roomId: roomId,
    email: "",
    start: "",
    end: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClickHandleSubmit = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/booking`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No token found");
    }
  };

  return (
    <div className="h-full bg-primary flex justify-center items-center p-5">
      <div className="sm:w-[50%] w-full mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 ">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Book a Room
        </h2>

        {/* Room ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Room ID
          </label>
          <input
            type="text"
            name="roomId"
            required
            value={formData.roomId}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Room ID"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="start"
            required
            value={formData.start}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="end"
            required
            value={formData.end}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requests?"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button" // changed to type="button" to avoid page reload on form submit
            onClick={onClickHandleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
