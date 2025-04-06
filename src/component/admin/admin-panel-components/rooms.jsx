import DuluxRoom from "../../duluxRoom";
import LuxuryRoom from "../../luxuryRoom";
import StandardRoom from "../../standardRoom";

export default function AllRooms() {
  return (
    <>
      <section>
        <StandardRoom />
      </section>

      <section>
        <DuluxRoom />
      </section>
      <section>
        <LuxuryRoom />
      </section>
    </>
  );
}
