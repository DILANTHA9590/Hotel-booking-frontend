import { Link, Route, Routes } from "react-router";

import { useState, useEffect } from "react";
import Navigationbar from "../component/navigationbar";
import Header from "../component/header";

import Categories from "../component/categories";
import Services from "../component/services";
import StandardRoom from "../component/standardRoom";
import RoomOverView from "../component/roomOverview";
import DuluxRoom from "../component/duluxRoom";
import LuxuryRoom from "../component/luxuryRoom";
import BookingForm from "../component/bookingForm";
import About from "../component/about";
import Rooms from "../component/admin/admin-panel-components/rooms";
import AllRooms from "../component/admin/admin-panel-components/rooms";
import ContactUs from "../component/contact";
import Student from "../component/student";
import Myaccount from "../component/myaccount";
import ViewMyBooking from "../component/viewUserBooking";
import NotFoundPage from "../component/admin/notFound";
import PageNotFound from "../component/404customers";

export default function HomePage() {
  const images = [
    "https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2739666/pexels-photo-2739666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ]; // Replace with your actual images

  const [currentImage, setCurrentImage] = useState(images[0]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prevImage) => {
  //       const currentIndex = images.indexOf(prevImage);
  //       return images[(currentIndex + 1) % images.length];
  //     });
  //   }, 90000); // Change image every 20 seconds

  //   return () => clearInterval(interval); // Cleanup
  // }, [images]);

  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center relative transition-all duration-1000 rounded-b-2xl"
        // style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-0"></div>

        <section>
          <Navigationbar />
        </section>

        <div className="w-full h-[calc(100vh-15vh)]">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/standard" element={<StandardRoom />} />
            <Route path="/dulux" element={<DuluxRoom />} />
            <Route path="/luxury" element={<LuxuryRoom />} />
            <Route path="/roominfo/:roomId" element={<RoomOverView />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/student" element={<Student />} />
            <Route path="/myaccount" element={<Myaccount />} />
            <Route path="/mybooking" element={<ViewMyBooking />} />
            <Route path="/category" element={<Categories />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
