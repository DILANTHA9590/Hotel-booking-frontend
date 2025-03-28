import { Link, Routes } from "react-router";

import { useState, useEffect } from "react";
import Navigationbar from "../component/navigationbar";
import Header from "../component/header";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function HomePage() {
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

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center relative transition-all duration-1000 rounded-b-2xl"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-0"></div>

        <section>
          <Navigationbar />
        </section>

        <div className="w-full h-[calc(100vh-20vh)]">
          <Header />
        </div>
      </div>

      <section className="relative bg-pri">
        {/* Background div with lower z-index */}
        <div className="bg-gray-800 h-[30vh] absolute w-full bottom-0 z-10">
          oooss
        </div>

        {/* Cards Container - Higher z-index */}
        <div className="relativ sm:h-[60vh] font-bold pt-4 z-50">
          <h1 className="text-4xl text-center text-title">
            <span className="text-secondry">Explore</span> Stays by Category
          </h1>

          <div className="flex sm:w-[60%] w-full mx-auto gap-x-4 mt-6 flex-col sm:flex-row gap-y-4 relative">
            {/* Card 1 */}
            <div className=" bg-white relative z-50">
              <img
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt=""
              />
              <h2 className="text-secondry text-2xl text-center">
                Standard Room
              </h2>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl h-[40px]">
                    <Link>Explore more</Link>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="pr-4">
                  <h2>$60.00</h2>
                  <h2>per night</h2>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className=" bg-white relative z-50">
              <img
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt=""
              />
              <h2 className="text-secondry text-2xl text-center">
                Deluxe Room
              </h2>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl h-[40px]">
                    <Link>Explore more</Link>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="pr-4">
                  <h2>$60.00</h2>
                  <h2>per night</h2>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className=" bg-white relative z-50">
              <img
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt=""
              />
              <h2 className="text-secondry text-2xl text-center">
                Luxury Room
              </h2>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl max-h-[40px]">
                    <Link>Explore more</Link>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="pr-4">
                  <h2>$60.00</h2>
                  <h2>per night</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
