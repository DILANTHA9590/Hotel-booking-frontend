import { Link, Routes } from "react-router";

import { useState, useEffect } from "react";
import Navigationbar from "../component/navigationbar";
import Header from "../component/header";

import Categories from "../component/categories";
i;
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

      <section>
        <Categories />
      </section>

      <section>
        <div className=" h-[60vh] bg-primary  sm:flex p-10">
          <div className="pt-4 font-bold">
            <h3 className="text-center text-2xl">Services designed for</h3>
            <h1 className="text-center text-4xl text-secondry">
              your comfort and enjoyment
            </h1>
          </div>

          <div className="flex   items-center justify-center gap-x-4.5 sm:text-2xl mt-20">
            <div className="">
              <img
                className="w-[200px]"
                src="/services-icon/cocktail.png
              "
                alt=""
              />
              <h2 className="bg-secondry p-2 mt-4 font-bold font-sans">Bar</h2>
            </div>

            <div>
              <img
                className="w-[200px]"
                src="/services-icon/dumbbell.png
                
              "
                alt=""
              />
              <h2 className="bg-secondry p-2 mt-4 font-bold font-sans">Gym</h2>
            </div>

            <div>
              <img
                className="w-[200px]"
                src="/services-icon/restaurant.png
              "
                alt=""
              />
              <h2 className="bg-secondry p-2 mt-4 font-bold font-sans">
                Resturant
              </h2>
            </div>

            <div>
              <img
                className="w-[200px]"
                src="/services-icon/free-wifi.png
              "
                alt=""
              />
              <h2 className="bg-secondry p-2 mt-4 font-bold font-sans">wifi</h2>
            </div>

            <div>
              <img
                className="w-[200px]"
                src="/services-icon/swimming-pool.png"
                alt=""
              />
              <h2 className="bg-secondry p-2 mt-4 font-bold font-sans">pool</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
