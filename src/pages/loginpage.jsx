import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function onLoginClick() {
    // const loginData = {
    //   email: email,
    //   password: password,
    // };
    axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);

        if (res.data.user.type == "admin") {
          console.log("admin");
          navigate("/admin/booking");
        } else {
          navigate("/");
        }

        // const token = localStorage.getItem("token");
      })
      .catch((err) => {
        toast.error("Incorrect email or password");
      });
  }

  return (
    <>
      <div className=" bg-black">
        <div
          className="bg-[url('/backround.jpg')] bg-cover bg-center h-[100vh] w-screen flex  justify-center items-center 
      "
        >
          <div>
            <div className="absolute inset-0 bg-black/20"></div>
            <div
              className="w-[350px] h-[450px] sm:w-[450px] sm:h-[450px] backdrop-blur-lg rounded-xl bg-white/20
            flex flex-col  items-center justify-center"
            >
              <h1 className="text-3xl font-bold text-white text-center pt-2 absolute top-0">
                Login Form
              </h1>

              <h5 className="text-center text-xl text-white absolute top-[80px]">
                please sign into your account
              </h5>

              <input
                type="text"
                className="border border-amber-50 bg-[#00000000] w-[80%] placeholder:text-white rounded-sm px-4 py-3 mb-5"
                placeholder="Enter your Email address 

                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="bg-[#ff5748]  w-[80%] py-2 text-white font-bold absolute bottom-6 rounded-md"
                onClick={onLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// admin
// "email": "sse@gmail.com",
//   "password": "dilantha",

// customer
// "email": "ssse@gmail.com",
// "password": "dilantha",
