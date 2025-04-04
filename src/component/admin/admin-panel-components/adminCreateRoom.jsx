import { useState } from "react";
import uplaodMediaSuperbase from "../../../pages/utils/mediaUpload";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("Standard");
  const [maxGuests, setMaxGuests] = useState(1);
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState([]);
  const [specialsDescriptions, setSpecialsDescriptions] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const [loaded, setloaded] = useState(false);
  console.log(image);

  async function onClickAddRoomBtn() {
    const token = localStorage.getItem("token");

    if (!token) {
    }
    try {
      let promiseArrey = [];
      for (let i = 0; i < image.length; i++) {
        promiseArrey[i] = uplaodMediaSuperbase(image[i]);
      }
      setloaded(true);
      const imgUrl = await Promise.all(promiseArrey);
      setloaded(false);

      const roomData = {
        roomId: roomId,
        category: category,
        maxGuests: maxGuests,
        available: available,
        photos: imgUrl,
      };
      if (specialsDescriptions) {
        roomData.specialsDescriptions = specialsDescriptions;
      }

      if (notes) {
        roomData.notes = notes;
      }

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
        roomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.message);
      navigate("/admin/rooms");
    } catch (error) {
      console.log(error);
      toast.error("Something went a Wrong please try again");
    }
  }

  return (
    <div className="bg-gray-50 py-10 w-full min-h-screen flex justify-center items-center overflow-hidden">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Add a New Room
        </h2>

        <div className="space-y-5">
          {/* Room ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Room ID
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onBlur={() => setTouched(true)} // Mark field as touched when leaving input
              className={`w-full p-3 border rounded-lg focus:ring-2 ${
                touched && roomId === "" ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Room ID"
            />
            {touched && roomId === "" && (
              <p className="text-red-500 text-sm mt-1">
                ⚠️ Room ID is required
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <div className="flex gap-4">
              {/* Standard */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Standard"
                  checked={category === "Standard"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-5 w-5 text-blue-600"
                />
                <span>Standard</span>
              </label>

              {/* Deluxe */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Deluxe"
                  checked={category === "Deluxe"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-5 w-5 text-blue-600"
                />
                <span>Deluxe</span>
              </label>

              {/* Luxury */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Luxury"
                  checked={category === "Luxury"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-5 w-5 text-blue-600"
                />
                <span>Luxury</span>
              </label>
            </div>
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Max Guests
            </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              onBlur={() => setTouched(true)} // Mark field as touched when leaving input
              className={`w-full p-3 border rounded-lg focus:ring-2 ${
                touched && maxGuests === ""
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter Max guest"
            />
            {touched && maxGuests === "" && (
              <p className="text-red-500 text-sm mt-1">
                ⚠️ Max Guest is required
              </p>
            )}
          </div>

          {/* Available */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Available
            </label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value === "true")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Image Upload */}
          {loaded ? (
            <div className="flex flex-col items-center">
              <div className="flex gap-x-2 mt-5">
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="mt-4 text-gray-600">Uploading your image...</p>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setImage(e.target.files)}
                onBlur={() => setTouched(true)} // Mark field as touched when leaving input
                className={`w-full p-3 border rounded-lg focus:ring-2 ${
                  touched && image.length === 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter Room ID"
              />
              {touched && image === "" && (
                <p className="text-red-500 text-sm mt-1">⚠️Image is required</p>
              )}
            </div>
          )}

          {/* Special Descriptions */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Special Description
            </label>
            <textarea
              value={specialsDescriptions}
              onChange={(e) => setSpecialsDescriptions(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter special details"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={onClickAddRoomBtn}
              type="submit"
              className={`px-6 py-3 rounded-lg shadow-md text-white ${
                !roomId || !category || !maxGuests || image.length == 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={!roomId || !category || !maxGuests || image.length == 0}
            >
              Add Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
