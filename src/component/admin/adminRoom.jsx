import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminRooms() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <h1>Admin Room</h1>
    </>
  );
}
