export default function HomePage() {
  return (
    <>
      <div className="w-full h-screen bg-blue-500 ">
        <div className="bg-white  flex items-center justify-between h-[10vh] w-[700px] rounded-b-sm  p-4  ">
          <input type="date" />
          <input type="date" />

          <select name="" id="">
            <option value="">Select Room Type</option>
            <option value="Luxury">Luxury</option>
            <option value="Standard">Standard</option>
            <option value="Normal">Normal</option>
          </select>

          <button>Book Now</button>
        </div>

        <h1 className="text-8xl text-center">Welcome</h1>
      </div>
    </>
  );
}
