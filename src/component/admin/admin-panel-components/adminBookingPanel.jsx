import { MdDelete } from "react-icons/md";
export default function AdminBookingPanel({
  bookingId,
  roomId,
  email,
  status,
  handleStatusChange,
  reason,
  start,
  end,
  notes,
  timeStamps,
  deleteBooking,
}) {
  return (
    <>
      <td className="py-3 px-6 text-left border">{bookingId}</td>
      <td className="py-3 px-6 text-left border">{roomId}</td>
      <td className="py-3 px-6 text-left border">{email}</td>
      <td className="py-3 px-6 text-left border">
        <select
          name="status"
          id="status"
          className="w-[80px]"
          value={status}
          onChange={(e) => handleStatusChange(bookingId, e.target.value)}
        >
          <option value="">Status</option>
          <option value="Confirm">Confirmed</option>
          <option value="Reject">Rejected</option>
          <option value="Processing">Processing</option>
        </select>
      </td>

      <td className="py-3 px-6 text-left border">{reason}</td>
      <td className="py-3 px-6 text-left border">{start}</td>
      <td className="py-3 px-6 text-left border">{end}</td>
      <td className="py-3 px-6 text-left border">{notes}</td>
      <td className="py-3 px-6 text-left border">{timeStamps}</td>
      <td className="py-3 px-6 text-left border">
        <button className="py-3 px-6 ">
          <MdDelete
            className=" text-center text-red-500 text-2xl"
            onClick={() => deleteBooking(bookingId)}
          />
        </button>
      </td>
    </>
  );
}
