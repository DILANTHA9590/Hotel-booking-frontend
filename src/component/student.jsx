import axios from "axios";
import { useEffect, useState } from "react";

export default function Student() {
  const [student, setStudent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/student`)
        .then((res) => {
          console.log(res.data);
          setStudent(res.data.student); // Ensure response contains 'student' array
          setLoaded(true); // ✅ Mark data as loaded
        });
    }
  }, [loaded]);

  return (
    <div className="w-full h-full relative">
      {!loaded ? (
        // 🔄 Loading state
        <div className="w-full h-full bg-white absolute flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        // ✅ Show student data
        <>
          <h1>Student List</h1>
          <div>
            {student.map((stu) => (
              <div
                key={stu.studentId}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>Name: {stu.name}</h3>
                <p>Student ID: {stu.studentId}</p>
                <p>Age: {stu.age}</p>
                <p>Enrolled: {stu.enrolled ? "Yes" : "No"}</p>
                <p>Subjects: {stu.subjects.join(", ")}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
