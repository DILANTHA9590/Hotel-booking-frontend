import { MdDelete } from "react-icons/md";
export default function AdminBookingPanel(props) {
  const booking = props;
  return (
    <>
      <td className="py-3 px-6 text-left border">{booking.bookingId}</td>
      <td className="py-3 px-6 text-left border">{booking.roomId}</td>
      <td className="py-3 px-6 text-left border">{booking.email}</td>
      <td className="py-3 px-6 text-left border">
        <select
          name="status"
          id="status"
          className="w-[80px]"
          value={booking.status}
          onChange={(e) =>
            booking.handleStatusChange(booking.bookingId, e.target.value)
          }
        >
          <option value="">Status</option>
          <option value="Confirm">Confirmed</option>
          <option value="Reject">Rejected</option>
          <option value="Processing">Processing</option>
        </select>
      </td>

      <td className="py-3 px-6 text-left border">{booking.reason}</td>
      <td className="py-3 px-6 text-left border">{booking.start}</td>
      <td className="py-3 px-6 text-left border">{booking.end}</td>
      <td className="py-3 px-6 text-left border">{booking.notes}</td>
      <td className="py-3 px-6 text-left border">{booking.timeStamps}</td>
      <td className="py-3 px-6 text-left border">
        <button className="py-3 px-6 ">
          <MdDelete
            className=" text-center"
            onClick={() => booking.deleteBooking(booking.bookingId)}
          />
        </button>
      </td>
    </>
  );
}
