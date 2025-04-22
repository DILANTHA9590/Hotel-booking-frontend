import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

export default function Signupform() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    whatsApp: "",
    phone: "",
  });

  console.log(formData);

  const [value, setValue] = useState(false);

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  function onLoginClick() {
    // Check if all required fields are filled (basic client-side validation)
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.whatsApp ||
      !formData.phone
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, formData)
      .then(() => {
        toast.success(res.data.message);
        navigate("/verifyemail");
      })
      .catch((error) => {
        navigate("/verifyemail");
        toast.error("error", error.response.data);
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
              className="w-[350px] h-[620px] sm:w-[450px] sm:h-[650px] backdrop-blur-lg rounded-xl bg-white/20
            flex flex-col  items-center justify-center"
            >
              <h1 className="text-3xl font-bold text-white text-center pt-2 absolute top-0">
                Signup
              </h1>

              <input
                type="text"
                name="email"
                className="border border-amber-50 bg-[#00000000] w-[80%] placeholder:text-white rounded-sm px-4 py-3 mb-5"
                placeholder="Enter your Email address"
                value={formData.email}
                onChange={handlechange}
                required
              />
              <input
                type="password"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3  mb-5"
                placeholder="Enter Password"
                value={formData.password}
                name="password"
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3 mb-5"
                placeholder="Enter first name"
                value={formData.firstName}
                name="firstName"
                onChange={handlechange}
                required
              />
              <input
                type="text"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3 mb-5"
                placeholder="Enter last name"
                value={formData.lastName}
                name="lastName"
                onChange={handlechange}
                required
              />

              <input
                type="text"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3 mb-5"
                placeholder="Enter whats app number"
                value={formData.whatsApp}
                name="whatsApp"
                onChange={handlechange}
                required
              />

              <input
                type="text"
                className="  px-4 border  border-amber-50 bg-[#00000000] w-[80%]  placeholder:text-white rounded-sm py-3 mb-5"
                placeholder="Enter phone number"
                value={formData.phone}
                name="phone"
                onChange={handlechange}
                required
              />

              <button
                className="bg-[#ff5748]  w-[80%] py-2 text-white font-bold absolute bottom-6 rounded-md "
                onClick={onLoginClick}
              >
                Signup
              </button>

              <p className="p-1 text-white">
                Already have an account?{" "}
                <Link className="text-blue-600 underline font-bold" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
