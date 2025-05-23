import { useEffect, useState } from "react";
import Categories from "./categories";
import Services from "./services";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "./footer";

export default function Header() {
  const [startdate, setStartDate] = useState();
  const [enddate, setEndtDate] = useState();
  const [category, setCategory] = useState();

  const images = [
    "https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2739666/pexels-photo-2739666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ]; // Replace with your actual images

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        return images[(currentIndex + 1) % images.length];
      });
    }, 10000); // Change image every 20 seconds

    return () => clearInterval(interval); // Cleanup
  }, [images]);

  function onClickBooking() {
    const token = localStorage.getItem("token");

    if (!token) {
      return toast.error("Please Login first");
    }

    if (!startdate || !enddate || !category) {
      return toast.error("All input filed required");
    }
    const bookingData = {
      start: startdate,
      end: enddate,
      category: category.toLowerCase(), // Convert category to lowercase
    };

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/booking/createbycategory`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div
        className=" h-full  flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <h1 className="sm:text-6xl font-bold text-secondry text-center text-3xl p-5">
          Discover Comfort & Luxury <br />{" "}
          <span className="text-primary"> Book Your Stay Today!</span>
        </h1>
        <div className="text-white font-bolds flex gap-y-10  sm:gap-x-10 text-2xl items-center  p-5 flex-col sm:flex-row sm:transform  rounded-bl-2xl rounded-tr-2xl border-2">
          <div className="flex flex-col">
            <label htmlFor="">Check In</label>
            <input
              type="date"
              className="border border-primary b- w-64"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Check In</label>
            <input
              type="date"
              className="border border-primary w-64"
              onChange={(e) => setEndtDate(e.target.value)}
            />
          </div>
          <div>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" className="text-black">
                Select Category
              </option>
              <option value="Luxury" className="text-black">
                Luxury
              </option>
              <option value="Normal" className="text-black">
                Normal
              </option>
              <option value="Dulux" className="text-black">
                Dulux
              </option>
            </select>
          </div>

          <div>
            <button
              className="bg-secondry p-4 rounded-[130px] cursor-pointer"
              onClick={onClickBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <section>
        <Services />
      </section>
      <section>
        <Categories />
      </section>
    </>
  );
}
