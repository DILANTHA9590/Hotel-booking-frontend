import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const navigate = useNavigate();
  let number = 1;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  }, []);

  async function blockUser(email, status) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    try {
      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.email === email
            ? { ...user, oldStatus: user.disabled, disabled: status }
            : user
        )
      );

      const updateUser = {
        disabled: status,
      };

      const result = await axios.put(
        `http://localhost:5000/api/users/${email}`,
        updateUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `${email} User ${status ? "block" : "unblock"} Successfully`
      );
    } catch (error) {
      console.log(error);
      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.email === email ? { ...user, disabled: user.oldStatus } : user
        )
      );

      console.log(error);
      toast.error("Something went a wrong please try again");
    }
  }

  return (
    <>
      <div className="container mx-auto bg-white p-4 h-screen  overflow-hidden overflow-y-scroll ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
                <th className="py-3 px-6 text-left border">user Count</th>
                <th className="py-3 px-6 text-left border">Is blocked</th>
                <th className="py-3 px-6 text-left border">Email</th>
                <th className="py-3 px-6 text-left border">First Name</th>
                <th className="py-3 px-6 text-left border">Last Name</th>
                <th className="py-3 px-6 text-left border">Type</th>
                <th className="py-3 px-6 text-left border">add Customer</th>
                <th className="py-3 px-6 text-left border">Edit</th>
                <th className="py-3 px-6 text-left border">delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6  border text-center">{number++}</td>
                  <td className="py-3 px-6 text-left border">
                    <button
                      className={`px-4 py-2 rounded text-white ${
                        user.disabled ? "bg-red-500" : "bg-green-500"
                      }`}
                      onClick={() => blockUser(user.email, !user.disabled)}
                    >
                      {user.disabled ? "Block" : "Unblock"}
                    </button>
                  </td>
                  <td className="py-3 px-6 text-left border">{user.email}</td>

                  <td className="py-3 px-6 text-left border max-w-[200px] truncate overflow-hidden">
                    {user.firstName}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {user.lastName}
                  </td>

                  <td className="py-3 px-6  border text-center">{user.type}</td>

                  <td className="py-3 px-6  border text-center">
                    <button className="py-3 px-6" onClick={() => navigate("")}>
                      <IoMdAdd className="w-[25px] h-[25px] text-green-400 cursor-pointer" />
                    </button>
                  </td>

                  <td className="py-3 px-6 text-left border">
                    <button
                      className="py-3 px-6 "
                      onClick={() => {
                        navigate("", {
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
    </>
  );
}
