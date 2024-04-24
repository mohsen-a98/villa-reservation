import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useBooking } from "../bookings/useBooking";
import BookingDataBox from "../bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { formatCurrency, formatNumber } from "../../utils/helper";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckIn } from "./useCheckIn";

function CheckingBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const { goBack } = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  function handleConfirmCheckIn() {
    if (!confirmPaid) return null;
    checkIn(booking?.id);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {"ورود"} رزرو #{formatNumber(booking?.id)}
        </h1>
        <Button variation={"text"} onClick={() => navigate(-1)}>
          بازگشت
          <HiArrowLongLeft className="text-xl" />
        </Button>
      </div>
      <BookingDataBox booking={booking} />

      <div className="dark:bg-bg-dark flex items-center gap-2 rounded bg-white px-6 py-5 dark:text-gray-300">
        <input
          type="checkbox"
          className="size-4 disabled:cursor-not-allowed"
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={confirmPaid}
        />
        <p>
          من تایید می کنم که {booking?.guests?.fullName} کل مبلغ{" "}
          {formatCurrency(booking?.villaPrice)} را پرداخت کرده است.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleConfirmCheckIn} disabled={isCheckingIn}>
          تایید ورود رزرو #{formatNumber(booking?.id)}
        </Button>
        <Button variation="secondary" onClick={goBack}>
          بازگشت
        </Button>
      </div>
    </div>
  );
}

export default CheckingBooking;
