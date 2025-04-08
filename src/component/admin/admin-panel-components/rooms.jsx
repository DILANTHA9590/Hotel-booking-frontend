import DuluxRoom from "../../duluxRoom";
import LuxuryRoom from "../../luxuryRoom";
import StandardRoom from "../../standardRoom";

export default function AllRooms() {
  return (
    <>
      <div>
        <section className="">
          <h1 className="text-7xl bg-secondry text-center font-bold">
            Standard Rooms
          </h1>
          <StandardRoom />
        </section>
        <section>
          <h1 className="text-7xl bg-secondry text-center font-bold">
            Duluxe Rooms
          </h1>
          <DuluxRoom />
        </section>
        <section>
          <h1 className="text-7xl bg-secondry text-center font-bold">
            Luxury Rooms
          </h1>
          <LuxuryRoom />
        </section>
      </div>
    </>
  );
}
