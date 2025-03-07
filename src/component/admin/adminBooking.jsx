import { useState } from "react";

export default function AdminBooking() {
  const [bookings, setBookings] = useState([
    {
      bookingId: "B001",
      roomId: "R101",
      email: "user1@example.com",
      status: "pending",
      reason: "N/A",
      start: "2025-04-01",
      end: "2025-04-05",
      notes: "First booking",
      timeStamps: "2025-03-06",
    },
    {
      bookingId: "B002",
      roomId: "R102",
      email: "user2@example.com",
      status: "confirmed",
      reason: "N/A",
      start: "2025-05-10",
      end: "2025-05-15",
      notes: "VIP booking",
      timeStamps: "2025-03-07",
    },
  ]);
  const [arr, setarr] = useState([{ number: 2 }, { number: 3 }, { number: 4 }]);
  console.log(arr);
  function testone() {
    setarr((prevarr) => prevarr.map((ar) => (ar.number += 1)));
  }

  return (
    <>
      <div className="container mx-auto bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Booking Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Booking ID</th>
                <th className="py-3 px-6 text-left">Room ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Reason</th>
                <th className="py-3 px-6 text-left">Start</th>
                <th className="py-3 px-6 text-left">End</th>
                <th className="py-3 px-6 text-left">Notes</th>
                <th className="py-3 px-6 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* Row 1 */}
              {bookings.map((booking, index) => (
                <tr
                  key={booking.bookingId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{booking.bookingId}</td>
                  <td className="py-3 px-6 text-left">{booking.roomId}</td>
                  <td className="py-3 px-6 text-left">{booking.email}</td>
                  <td className="py-3 px-6 text-left">{booking.status}</td>
                  <td className="py-3 px-6 text-left">{booking.reason}</td>
                  <td className="py-3 px-6 text-left">{booking.start}</td>
                  <td className="py-3 px-6 text-left">{booking.end}</td>
                  <td className="py-3 px-6 text-left">{booking.notes}</td>
                  <td className="py-3 px-6 text-left">{booking.timeStamps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={testone}> biii</button>
      </div>
    </>
  );
}
