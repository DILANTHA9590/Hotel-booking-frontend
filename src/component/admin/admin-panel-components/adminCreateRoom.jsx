import { useState } from "react";
import uplaodMediaSuperbase from "../../../pages/utils/mediaUpload";

export default function AdminCreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState([]);
  const [specialsDescriptions, setSpecialsDescriptions] = useState("");
  const [notes, setNotes] = useState("");

  const [loaded, setloaded] = useState(false);
  console.log(image);

  async function onclickAddRoomBtn() {
    console.log("working here");

    // const roomData = {
    //   roomId: roomId,
    //   category: category,
    //   maxGuests: maxGuests,
    //   available: available,

    //   image,
    //   specialsDescriptions: specialsDescriptions,
    //   notes: notes,
    // };

    try {
      let promiseArrey = [];
      for (let i = 0; i < image.length; i++) {
        promiseArrey[i] = uplaodMediaSuperbase(image[i]);
      }
      setloaded(false);
      imgUrl = await Promise.all(promiseArrey);
      setloaded(true);
      console.log("lllll");
      console.log(imgUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 py-10 w-full min-h-screen flex justify-center items-center overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-4">
          {/* Room ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room ID
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Room ID"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Category"
            />
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Guests
            </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Max Guests"
            />
          </div>

          {/* Available */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available
            </label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value === "true")}
              className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Image Upload */}
          {loaded ? (
            <div className="text-center">
              <div className="flex gap-x-2 mt-7">
                <p className="w-5 h-5 bg-blue-600 rounded-full animate-pulse"></p>
                <p className="w-5 h-5 bg-blue-600 rounded-full animate-pulse"></p>
                <p className="w-5 h-5 bg-blue-600 rounded-full animate-pulse"></p>
              </div>
              <h2 className="mt-7 mb-7">✅ "Uploading your image..."</h2>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setImage(e.target.files)}
                className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Special Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Description
            </label>
            <textarea
              value={specialsDescriptions}
              onChange={(e) => setSpecialsDescriptions(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter special details"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full sm:w-3/4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onclickAddRoomBtn}
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Add Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
