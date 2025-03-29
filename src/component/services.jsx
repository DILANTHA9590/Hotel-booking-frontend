export default function Services() {
  return (
    <>
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
