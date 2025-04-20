import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  let number = 1;

  function fetchData(search, page) {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/getall", {
        params: {
          page: page,
          pageSize: 10,
          email: search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setUsers(res.data.users || []);
        console.log(res);
        setTotalPages(res.data.pagination.totalPages);
      });
  }

  useEffect(() => {
    fetchData(search, page);
  }, [page]);

  useEffect(() => {
    if (search === "") {
      setPage(1);
      fetchData(search, 1);
    }
  }, [search]);

  function handleSearch() {
    setPage(1);
    fetchData(search, 1);
  }

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
        <div className="flex  gap-x-1 pb-3">
          <input
            type="text"
            className="border w-[90%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-amber-600 px-2 py-0.2" onClick={handleSearch}>
            Search Here
          </button>
        </div>

        {users.length == 0 ? (
          <>
            <div class="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-2xl shadow p-6">
              <div class="text-center space-y-4">
                <div class="text-[80px]">😔</div>
                <h1 class="text-5xl font-bold text-gray-800">404</h1>
                <h2 class="text-2xl font-semibold text-gray-700">
                  Oops! User Not Found
                </h2>
                <p class="text-gray-500 max-w-md mx-auto">
                  We couldn't find any user matching your search. Please check
                  the spelling or try again.
                </p>
                <button class="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                  Go Back
                </button>
              </div>
            </div>
          </>
        ) : (
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
                    <td className="py-3 px-6  border text-center">
                      {number++}
                    </td>
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

                    <td className="py-3 px-6  border text-center">
                      {user.type}
                    </td>

                    <td className="py-3 px-6  border text-center">
                      <button
                        className="py-3 px-6"
                        onClick={() => navigate("")}
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

            <div className="flex gap-x-5 justify-center p-3">
              <button
                onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              >
                <MdArrowBackIosNew />
              </button>
              {Array.from({ length: totalPages }).map((item, index) => {
                return (
                  <div>
                    <button
                      onClick={() => setPage(index + 1)}
                      key={index}
                      className={`p-6 bg-blue-400 w-[40px] h-[40px] flex items-center justify-center text 
                    ${page == index + 1 && `border-2 border-black`}`}
                    >
                      {index + 1}
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() =>
                  setPage((prevPage) => Math.min(prevPage + 1, totalPages))
                }
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
