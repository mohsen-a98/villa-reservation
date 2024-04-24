import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

function BookingsTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <Table
      gridColumnsStyles={"grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem]"}
      className={"min-w-[750px]"}
    >
      <Table.Header>
        <div>ویلا</div>
        <div>مهمان</div>
        <div>تاریخ</div>
        <div>وضعیت</div>
        <div>مقدار هزینه</div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(row) => <BookingRow key={row.id} data={row} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default BookingsTable;
