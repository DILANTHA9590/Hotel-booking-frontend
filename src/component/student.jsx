import axios from "axios";
import { useEffect, useState } from "react";

export default function Student() {
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/student`,
        {
          params: { search }, // ✅ dynamically pass search
        }
      );
      setStudent(res.data.student);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 👉 Fetch all students at first load
    fetchStudents();
  }, []);

  // 👇 Watch for clearing search input and refetch
  useEffect(() => {
    if (searchTerm === "") {
      fetchStudents(""); // 🔁 reload all when empty
    }
  }, [searchTerm]);

  const handleSearch = () => {
    fetchStudents(searchTerm);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* 🔍 Search bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {student.map((stu) => (
            <div
              key={stu.studentId}
              className="border p-3 mb-3 rounded shadow-sm"
            >
              <h3 className="font-semibold">Name: {stu.name}</h3>
              <p>Student ID: {stu.studentId}</p>
              <p>Age: {stu.age}</p>
              <p>Enrolled: {stu.enrolled ? "Yes" : "No"}</p>
              <p>Subjects: {stu.subjects.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
