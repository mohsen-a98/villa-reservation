import BookingsTable from "../features/bookings/BookingsTable";
import BookingsTableOperation from "../features/bookings/BookingsTableOperation";

function Bookings() {
  return (
    <div className="flex flex-col gap-8 overflow-x-auto">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          لیست رزروها
        </h1>
        <BookingsTableOperation />
      </div>
      <div className="overflow-x-auto">
        <BookingsTable />
      </div>
    </div>
  );
}

export default Bookings;
