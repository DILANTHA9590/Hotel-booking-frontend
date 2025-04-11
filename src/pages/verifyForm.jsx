import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function VerifyEmailForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  function onLoginClick() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyemail`, {
        email: email,
        otp: otp,
      })
      .then((res) => {
        toast.success(res.data.message);

        navigate("/");
      })
      .catch((error) => {
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
              className="w-[350px] h-[450px] sm:w-[450px] sm:h-[450px] backdrop-blur-lg rounded-xl bg-white/20
            flex flex-col  items-center justify-center"
            >
              <h1 className="text-3xl font-bold text-white text-center pt-2 absolute top-0">
                Verify Your Email Address
              </h1>
              <p className="text-sm font-bold text-black text-center pt-2 absolute top-25">
                A verification code has been sent to your email. Please enter it
                below to verify your account.
              </p>

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
                placeholder="Enter Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                className="bg-[#ff5748]  w-[80%] py-2 text-white font-bold absolute bottom-6 rounded-md"
                onClick={onLoginClick}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
