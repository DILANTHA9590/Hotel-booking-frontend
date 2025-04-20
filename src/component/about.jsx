import { Link } from "react-router";
import Footer from "./footer";

export default function About() {
  return (
    <>
      <div className="bg-primary text-gray-800 font-sans">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1618220179428-22790f2e66b5')]">
          <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center text-yellow-800 px-6">
            <h1 className="text-5xl font-bold mb-4 font-serif">
              Welcome to Hotelo
            </h1>
            <p className="text-xl">
              Luxury, Comfort, and Memorable Experiences Await You.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/7532113/pexels-photo-7532113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Hotelo interior"
              className="rounded-2xl shadow-lg relative z-50"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-yellow-600 mb-6">
              Our Story
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Hotelo was founded on the belief that luxury should feel personal.
              Nestled in a peaceful corner of the city, our boutique hotel
              offers a perfect blend of modern elegance and warm hospitality.
            </p>
            <p className="mt-4 text-gray-600">
              Whether you're here for a romantic getaway, a business trip, or a
              family vacation, we ensure every stay is memorable. From our cozy
              rooms to our top-tier service, Hotelo is designed for your comfort
              and joy.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-yellow-50 py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                className="w-16 h-16 mx-auto mb-4"
                alt="Luxury Rooms"
              />
              <h3 className="text-xl font-semibold text-yellow-700">
                Luxury Rooms
              </h3>
              <p className="mt-2 text-gray-600">
                Designed for comfort, filled with charm and elegance.
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png"
                className="w-16 h-16 mx-auto mb-4"
                alt="Fine Dining"
              />
              <h3 className="text-xl font-semibold text-yellow-700">
                Fine Dining
              </h3>
              <p className="mt-2 text-gray-600">
                Delight your palate with exquisite international cuisine.
              </p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                className="w-16 h-16 mx-auto mb-4"
                alt="24/7 Service"
              />
              <h3 className="text-xl font-semibold text-yellow-700">
                24/7 Service
              </h3>
              <p className="mt-2 text-gray-600">
                Your satisfaction is our mission, anytime, any day.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center bg-gray-900 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg mb-6">
            Book your stay today and make unforgettable memories at Hotelo.
          </p>
          <Link
            to="/"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300"
          >
            Book
          </Link>
        </section>

        <section>
          <Footer />
        </section>
      </div>
    </>
  );
}
