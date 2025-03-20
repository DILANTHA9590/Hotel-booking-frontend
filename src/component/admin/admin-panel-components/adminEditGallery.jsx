import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import uplaodMediaSuperbase from "../../../pages/utils/mediaUpload";

export default function AdminEditGallery() {
  const navigate = useNavigate();
  const location = useLocation();
  const galleryItem = location.state.galleryItem;
  const [name, setName] = useState(galleryItem.name);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState(galleryItem.description);

  const [loaded, setLoaded] = useState(true);

  async function Onclickupdate(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("please login to admin account updtate details");
      return;
    }

    const updateGalleryData = {
      name: name,
      description: description,
    };

    let promiseArrey = [];
    let imgUrl = "";

    try {
      if (image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          promiseArrey[i] = uplaodMediaSuperbase(image[i]);
        }
        setLoaded(false);
        imgUrl = await Promise.all(promiseArrey);
        setLoaded(true);

        updateGalleryData.image = imgUrl;
      }

      console.log("update data", updateGalleryData);
      axios;
      // .put(
      //   import.meta.env.VITE_BACKEND_URL + "/api/users/" + customer.email,
      //   updateUserData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`,
        updateGalleryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/gallery");
      toast.success("Gallery Item Updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update gallery item. Please try again.");
    }
  }

  return (
    <>
      <div className=" bg-gray-100 py-10 w-full overflow-hidden overflow-y-scroll h-full flex flex-col justify-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Edit Gellery
          </h2>

          <div className="space-y-4">
            {/* Name */}
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                disabled
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
                onClick={() => Onclickupdate(galleryItem._id)}
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
