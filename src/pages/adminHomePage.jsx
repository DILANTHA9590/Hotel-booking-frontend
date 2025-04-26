import { Link, Route, Routes, useNavigate } from "react-router";
import AdminBooking from "../component/admin/adminBooking";

import AdminRooms from "../component/admin/adminRoom";
import AdminCategories from "../component/admin/adminCategoies";

import AdminFeedback from "../component/admin/adminFeedback";
import AdminTicketing from "../component/admin/adminTicketing";

import AdminEditCategory from "../component/admin/admin-panel-components/editCategoryItem";
import AddGallery from "../component/admin/admin-panel-components/addGallery";
import AdminAddGallery from "../component/admin/admin-panel-components/addGallery";
import AdminEditGallery from "../component/admin/admin-panel-components/adminEditGallery";
import AdminGalleryItem from "../component/admin/adminGalleryItem";
import AdminUsers from "../component/admin/adminUsers";
import AdminCreateRoom from "../component/admin/admin-panel-components/adminCreateRoom";
import { TbBrandBooking } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";
import { BsHouse } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { BsTicketPerforated } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import BookedRooms from "../component/admin/allBookedRoom";
import { FaCalendarCheck } from "react-icons/fa";
import NotFoundPage from "../component/admin/notFound";
import ExpireBookings from "../component/admin/allBookedRoom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImBlocked } from "react-icons/im";
export default function AdminHomePage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/getcurrentuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.user.type != "admin") {
          toast.error("Unautherized access");
          navigate("/login");
        } else {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="bg-gray-500 w-screen h-screen flex p-l">
        <div className=" h-screen flex flex-col w-[20%] bg-blue-500 pl-4 gap-y-4 font-bold color-g text-white text-2xl relative  ">
          {user != null && (
            <>
              <div className=" border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <TbBrandBooking />
                <Link to="/admin/booking">Booking</Link>
              </div>

              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <GrGallery />
                <Link to="/admin/gallery">Gallery</Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <BsHouse />
                <Link to="/admin/rooms">Rooms</Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <BiCategoryAlt />
                <Link to="/admin/category">Categories</Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <FaRegUserCircle />
                <Link to="/admin/customer">Customers</Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <VscFeedback />
                <Link to="/admin/customerreview">Feedback</Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <BsTicketPerforated />
                <Link to="/admin/ticketing">Ticketing</Link>
              </div>
              <div>
                <Link to="/admin/editcategory"></Link>
              </div>
              <div>
                <Link to="/admin/createroom"></Link>
              </div>
              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <FaCalendarCheck />
                <Link to="/admin/checkexpirebookings">
                  Check expire bookings
                </Link>
              </div>

              <div className="border-t-white border hover:bg-dashboardlinks hover:text-black transition-all duration-1000">
                <IoMdLogOut />
                <button onClick={handleLogout}>Log out</button>
              </div>
            </>
          )}
        </div>
        <div className="h-screen flex  w-[80%] bg-blue-400">
          {user != null && (
            <Routes>
              <Route path="/booking" element={<AdminBooking />} />
              <Route path="/gallery" element={<AdminGalleryItem />} />
              <Route path="/rooms" element={<AdminRooms />} />
              <Route path="/category" element={<AdminCategories />} />
              <Route path="/customer" element={<AdminUsers />} />
              <Route path="/customerreview" element={<AdminFeedback />} />
              <Route path="/ticketing" element={<AdminTicketing />} />
              <Route path="/editcategory" element={<AdminEditCategory />} />
              <Route path="/Gallery" element={<AdminGalleryItem />} />
              <Route path="/addgallery" element={<AdminAddGallery />} />
              <Route path="/editgallery" element={<AdminEditGallery />} />
              <Route path="/createroom" element={<AdminCreateRoom />} />

              <Route path="/checkexpirebookings" element={<ExpireBookings />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}

          {user == null && (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <p>
                {" "}
                <ImBlocked className="text-9xl text-red-600" />
              </p>
              <h1 className="text-2xl p-2">Unauthrized Access ditected</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
