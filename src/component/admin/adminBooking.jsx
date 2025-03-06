export default function AdminBooking() {
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
