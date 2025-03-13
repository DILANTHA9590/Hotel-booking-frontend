import { Link, Route, Routes } from "react-router";
import AdminBooking from "../component/admin/adminBooking";

import AdminRooms from "../component/admin/adminRoom";
import AdminCategories from "../component/admin/adminCategoies";

import AdminFeedback from "../component/admin/adminFeedback";
import AdminTicketing from "../component/admin/adminTicketing";
import AdminGalleryItem from "../component/admin/AdminGalleryItem";
import AdminUsers from "../component/admin/AdminUsers";
import AdminEditCategory from "../component/admin/admin-panel-components/editCategoryItem";

export default function AdminHomePage() {
  return (
    <>
      <div className="bg-gray-500 w-screen h-screen flex p-l">
        <div className=" h-screen flex flex-col w-[20%] bg-blue-500 pl-4 gap-y-4 font-bold color-g text-white text-2xl">
          <div>
            <Link to="/admin/booking">Booking</Link>
          </div>
          <Link to="/admin/gallery">Gallery</Link>
          <Link to="/admin/rooms">Rooms</Link>
          <Link to="/admin/category">Categories</Link>
          <Link to="/admin/customer">Customers</Link>
          <Link to="/admin/customerreview">Feedback</Link>
          <Link to="/admin/ticketing">Ticketing</Link>
          <Link to="/admin/editcategory"></Link>
        </div>
        <div className="h-screen flex  w-[80%] bg-blue-400">
          <Routes>
            <Route path="/booking" element={<AdminBooking />} />
            <Route path="/gallery" element={<AdminGalleryItem />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/category" element={<AdminCategories />} />
            <Route path="/customer" element={<AdminUsers />} />
            <Route path="/customerreview" element={<AdminFeedback />} />
            <Route path="/ticketing" element={<AdminTicketing />} />
            <Route path="/editcategory" element={<AdminEditCategory />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
