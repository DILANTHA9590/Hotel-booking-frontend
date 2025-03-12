import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";

export default function AdminCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      axios
        .get("http://localhost:5000/api/catagories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCategories(res.data.categories);
          setloaded(true);
        })
        .catch((err) => {
          toast.error("something went a  wrong fetch data");
          console.log("ERROR", err);
        });
    }
  }, [loaded]);

  function handleOnDelete(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .delete(`http://localhost:5000/api/catagories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(`${id} category deleted successfully`);
        setloaded(false);
      })
      .catch((error) => {
        toast.message("Some thing wentr a wrong .category deleted unsuccsess");
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mx-auto bg-gray-500 p-4 h-screen  overflow-hidden overflow-y-scroll ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
                <th className="py-3 px-6 text-left border">description</th>
                <th className="py-3 px-6 text-left">feature</th>
                <th className="py-3 px-6 text-left border">Image</th>
                <th className="py-3 px-6 text-left border">Name</th>
                <th className="py-3 px-6 text-left border">Price</th>

                <th className="py-3 px-6 text-left border">Delete</th>

                <th className="py-3 px-6 text-left border">Update</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {categories.map((category, index) => (
                <tr
                  key={category.name}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left border">
                    {category.name}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {category.feature}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {category.image}
                  </td>

                  <td className="py-3 px-6 text-left border">
                    {category.name}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {category.price}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    <button
                      className="py-3 px-6"
                      onClick={() => handleOnDelete(category.name)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                  <td className="py-3 px-6 text-left border">
                    <button className="py-3 px-6">
                      <AiFillEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
