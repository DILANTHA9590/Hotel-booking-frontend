import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loaded, setloaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    if (!loaded) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/getall`,
          {
            page: page,
            pageSize: 10,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setRooms(res.data.rooms);
          setTotalPages(res.data.pagination.totalPages);
          setloaded(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went a wrong please try again");
        });
    }
  }, [page, loaded]);

  function handleOnDelete(roomid) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success(`${roomid} S Deleted successfully `);
        setloaded(false);
      })
      .catch((err) => {
        toast.success("");
      });
  }

  function createRoom() {}
  return (
    <>
      <div className="container mx-auto bg-primary p-4 h-screen  overflow-hidden relative overflow-y-scroll">
        <button
          className="flex items-center justify-centr font-bold bg-green-600 p-3 mb-1"
          onClick={() => navigate("/admin/createroom")}
        >
          Add Rooms
          <IoIosAdd className="text-2xl ml-3 font-bold" />
        </button>
        {loaded ? (
          <div className="overflow-x-auto">
            {rooms.length != 0 && (
              <table className="min-w-full bg-gray-200s shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border">
                    <th className="py-3 px-6 text-left border">Room id</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left border">Maxguests</th>
                    <th className="py-3 px-6 text-left border">Availbale</th>
                    <th className="py-3 px-6 text-left border">Photos</th>
                    <th className="py-3 px-6 text-left border">
                      Special description
                    </th>
                    <th className="py-3 px-6 text-left border">Note</th>

                    <th className="py-3 px-6 text-left border">Delete</th>

                    <th className="py-3 px-6 text-left border">Update</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {rooms.map((room, index) => (
                    <tr
                      key={room.roomId}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left border">
                        {room.roomId}
                      </td>
                      <td className="py-3 px-6 text-left border">
                        {room.category}
                      </td>

                      <td className="py-3 px-6 text-left border">
                        {room.maxGuests}
                      </td>

                      <td className="py-3 px-6 text-left border ">
                        {room.available ? "availble" : "not availble"}
                      </td>
                      <td className="py-3 px-6 text-left border max-w-[200px] truncate overflow-hidden">
                        {room.photos[0]}
                      </td>

                      <td className="py-3 px-6 text-left border">
                        {room.specialsDescriptions}
                      </td>
                      <td className="py-3 px-6 text-left border">
                        {room.notes}
                      </td>
                      <td className="py-3 px-6 text-left border">
                        <button
                          className="py-3 px-6"
                          onClick={() => handleOnDelete(room.roomId)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                      <td className="py-3 px-6 text-left border">
                        <button
                          className="py-3 px-6 "
                          onClick={() => {
                            navigate("", {
                              state: {},
                            });
                          }}
                        >
                          <AiFillEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {rooms.length != 0 && (
              <div className="flex gap-x-5 justify-center p-3">
                <button
                  onClick={() =>
                    setPage(
                      (prevPage) => Math.max(prevPage - 1, 1),
                      setloaded(false)
                    )
                  }
                >
                  <MdArrowBackIosNew />
                </button>
                {Array.from({ length: totalPages }).map((item, index) => {
                  return (
                    <div>
                      <button
                        onClick={() => setPage(index + 1) || setloaded(false)}
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
                    setPage(
                      (prevPage) => Math.min(prevPage + 1, totalPages),
                      setloaded(false)
                    )
                  }
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
            <p className="w-[100px] h-[100px] border border-primary border-t-4 border-t-blue-700 rounded-full animate-spin"></p>
          </div>
        )}
        {rooms.length == 0 && (
          <div className="absolute bg-primary h-full w-full flex justify-center items-center">
            <h1 className="font-bold">No Rooms Found</h1>
          </div>
        )}
      </div>
    </>
  );
}
