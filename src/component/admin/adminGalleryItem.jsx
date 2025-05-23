import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
export default function AdminGalleryItem() {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItem] = useState([]);
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!loaded) {
      axios
        .get(
          `
          ${import.meta.env.VITE_BACKEND_URL}/api/gallery`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setGalleryItem(res.data.gallery);
          setloaded(true);
        })
        .catch((err) => {
          toast.error("something went a  wrong fetch data");
          console.log("ERROR", err);
        });
    }
  }, [loaded]);

  let number = 1;

  function handleOnDelete(_id) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setloaded(false);
        toast.success("Gallery item deletd Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="container mx-auto bg-white p-4 h-screen  overflow-hidden overflow-y-scroll relative ">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-50 flex justify-center items-center"> </div> */}
        {loaded ? (
          <div>
            <button
              className="flex items-center justify-centr font-bold bg-green-600 p-3 mb-1"
              onClick={() => navigate("/admin/addgallery")}
            >
              Add Gallery
              <IoIosAdd className="text-2xl ml-3 font-bold transition-transform duration-500 hover:rotate-[360deg]" />
            </button>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
                    <th className="py-3 px-6 text-left border">Count</th>
                    <th className="py-3 px-6 text-left border">Name</th>
                    <th className="py-3 px-6 text-left border">Image</th>
                    <th className="py-3 px-6 text-left border">description</th>

                    <th className="py-3 px-6 text-left border">Edit</th>
                    <th className="py-3 px-6 text-left border">delete</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {galleryItems.map((galleryItem, index) => (
                    <tr
                      key={galleryItem._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6  border text-center">
                        {number++}
                      </td>
                      <td className="py-3 px-6 text-left border">
                        {galleryItem.name}
                      </td>

                      <td className="py-3 px-6 text-left border max-w-[200px] truncate overflow-hidden">
                        {galleryItem.image}
                      </td>
                      <td className="py-3 px-6 text-left border">
                        {galleryItem.description}
                      </td>

                      <td className="py-3 px-6 text-left border">
                        <button
                          className="py-3 px-6 "
                          onClick={() => {
                            navigate("/admin/editgallery", {
                              state: { galleryItem: galleryItem },
                            });
                          }}
                        >
                          <AiFillEdit className="w-[25px] h-[25px] text-yellow-400 cursor-pointer" />
                        </button>
                      </td>

                      <td className="py-3 px-6 text-left border">
                        <button
                          className="py-3 px-6"
                          onClick={() => handleOnDelete(galleryItem._id)}
                        >
                          <MdDelete className="w-[25px] h-[25px] text-red-400 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
            <p className="w-[100px] h-[100px] border border-primary border-t-4 border-t-blue-700 rounded-full animate-spin"></p>
          </div>
        )}
      </div>
    </>
  );
}
