import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import uplaodMediaSuperbase from "../../../pages/utils/mediaUpload";
export default function AdminAddGallery() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [loaded, setloaded] = useState(true);

  async function handleAddGalley() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    if (!name) {
      toast.error("Name field cannot be empty. Please enter a valid name.");
      return;
    }

    if (!image || image.length === 0) {
      toast.error("Image field cannot be empty. Please enter a valid name.");
      return;
    }

    if (!description || description.trim() === "") {
      toast.error(
        "Description field cannot be empty. Please enter a valid name."
      );
      return;
    }

    const promiseArray = [];
    let imgUrl;

    for (let i = 0; i < image.length; i++) {
      promiseArray[i] = uplaodMediaSuperbase(image[i]);
    }

    try {
      setloaded(false);
      imgUrl = await Promise.all(promiseArray);
      setloaded(true);

      setloaded(true);
    } catch (error) {
      toast.error(
        "Something went wrong uploading your image. Please check your internet connection."
      );
      console.log("upload Error", error.message);
    }

    const galleryData = {
      name: name,
      image: imgUrl,
      description: description,
    };

    axios
      .post("http://localhost:5000/api/gallery", galleryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Gallery item added successfully");
        console.log(res);
        navigate("/admin/gallery");
      })
      .catch((err) => {
        toast.error("something went a  wrong please try again");
        console.log("ERROR", err);
      });
  }

  return (
    <>
      <div className=" bg-gray-100 py-10 w-full overflow-hidden overflow-y-scroll h-full flex flex-col justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Add Gellery
          </h2>

          <div className="space-y-4">
            {/* Name */}
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
              />
            </div>
            {/* Features */}
            {/* Image */}
            {loaded ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImage(e.target.files)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className=" flex justify-center flex-col items-center">
                <div className="flex gap-x-2 mt-7">
                  <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
                  <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
                  <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
                </div>

                <h2 className="mt-7 mb-7">
                  ✅ "Just a moment! We're uploading your image..."
                </h2>
              </div>
            )}
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter description"
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAddGalley}
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
