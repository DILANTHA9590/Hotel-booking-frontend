import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Categories() {
  return (
    <>
      <section className="relative bg-primary -z-40">
        {/* Background div with lower z-index */}
        <div className="bg-gray-800 h-[30vh] absolute w-full bottom-0 ">
          oooss
        </div>

        {/* Cards Container - Higher z-index */}
        <div className=" sm:h-[60vh] font-bold pt-4 z-50">
          <h1 className="text-4xl text-center text-title">
            <span className="text-secondry">Explore</span> Stays by Category
          </h1>

          <div className="flex sm:w-[60%] w-full mx-auto gap-x-4 mt-6 flex-col sm:flex-row gap-y-4 relative">
            {/* Card 1 */}
            <div className=" bg-white relative z-50">
              <img
                className="p-4 sm:p-0"
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt="Standard Room"
              />
              <h2 className="text-secondry text-2xl text-center">
                Standard Room
              </h2>
              <p className="text-center text-gray-500">Accommodates 2 people</p>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl h-[40px] ml-4">
                    <Link to="/standard">Explore More</Link>
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
                className="p-4 sm:p-0"
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt="Deluxe Room"
              />
              <h2 className="text-secondry text-2xl text-center">
                Deluxe Room
              </h2>
              <p className="text-center text-gray-500">Accommodates 3 people</p>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl h-[40px] ml-4">
                    <Link to="/dulux">Explore More</Link>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="pr-4">
                  <h2>$100.00</h2>
                  <h2>per night</h2>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className=" bg-white relative z-50">
              <img
                className="p-4 sm:p-0"
                src="https://th.bing.com/th/id/OIP.yybHXZkwrX_eXpNERNrMzAHaE7?rs=1&pid=ImgDetMain"
                alt="Luxury Room"
              />
              <h2 className="text-secondry text-2xl text-center">
                Luxury Room
              </h2>
              <p className="text-center text-gray-500">Accommodates 4 people</p>
              <div className="flex justify-between">
                <div>
                  <div className="flex justify-center items-center bg-secondry p-4 rounded-4xl max-h-[40px] ml-4">
                    <Link to="/luxury">Explore More</Link>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="pr-4">
                  <h2>$150.00</h2>
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
