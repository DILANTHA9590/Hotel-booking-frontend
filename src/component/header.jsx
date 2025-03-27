export default function Header() {
  return (
    <>
      <div className=" h-full flex items-center justify-center flex-col">
        <h1 className="sm:text-6xl font-bold text-[#ffce46] text-center text-3xl p-5">
          Discover Comfort & Luxury <br /> Book Your Stay Today!
        </h1>
        <div className="text-white font-bolds flex gap-y-10  sm:gap-x-10 text-2xl items-center  p-5 flex-col sm:flex-row sm:transform  rounded-bl-2xl rounded-tr-2xl border-2">
          <div className="flex flex-col">
            <label htmlFor="">Check In</label>
            <input type="date" className="border border-[#FFD700] b- w-64" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Check In</label>
            <input type="date" className="border border-[#FFD700] w-64" />
          </div>
          <div>
            <select name="category" id="category">
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
            <button className="bg-amber-300 p-4 rounded-[130px] ">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
