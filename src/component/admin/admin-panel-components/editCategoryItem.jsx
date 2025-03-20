import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import uplaodMediaSuperbase from "../../../pages/utils/mediaUpload";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminEditCategory() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state.category;
  const features = category.feature.join(",");

  const [name, setName] = useState(category.name);
  const [price, setPrice] = useState(category.price);
  const [feature, setFeature] = useState(features);
  const [description, setDescription] = useState(category.description);
  const [images, setImages] = useState([]);
  const [loaded, setloaded] = useState(true);

  async function handleUpdateCategory(name) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    const features = feature.split(",");

    const promiseArrey = [];

    const updatecategorry = {
      name: name,
      description: description,
      feature: features,
      price: price,
    };

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        promiseArrey[i] = uplaodMediaSuperbase(images[i]);
      }
      setloaded(false);

      const imgUrl = await Promise.all(promiseArrey);
      setloaded(true);

      updatecategorry.imgUrl = imgUrl;
    }

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/catagories/${name}`,
        updatecategorry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(`${name} Updated successfully`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className=" bg-gray-100 py-10 w-full overflow-hidden overflow-y-scroll">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Category
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              disabled
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
          </div>

          {/* Features */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <input
              type="text"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter features"
            />
          </div>

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

          {/* Image */}
          {loaded ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div className=" flex justify-center flex-col items-center">
              <div className="flex gap-x-2">
                <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
                <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
                <p className="w-[25px] h-[25px] bg-blue-600 rounded-full animate-pulse"></p>
              </div>

              <h2>✅ "Just a moment! We're uploading your image..."</h2>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleUpdateCategory(name)}
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
