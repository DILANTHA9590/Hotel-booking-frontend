import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto bg-white p-4 h-screen  overflow-hidden overflow-y-scroll ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
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
                  <td className="py-3 px-6 text-left border">{user.email}</td>

                  <td className="py-3 px-6 text-left border max-w-[200px] truncate overflow-hidden">
                    {user.firstName}
                  </td>
                  <td className="py-3 px-6 text-left border">
                    {user.lastName}
                  </td>

                  <td className="py-3 px-6  border text-center">
                    <button
                      className="py-3 px-6"
                      onClick={() => navigate("/admin/addgallery")}
                    >
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
