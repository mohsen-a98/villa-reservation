import { useNavigate, useParams } from "react-router-dom";
import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { formatNumber } from "../../utils/helper";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useMoveBack } from "../../hooks/useMoveBack";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "../../ui/Tag";

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const { goBack } = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  const status =
    booking?.status === "unconfirmed"
      ? "تایید نشده"
      : booking?.status === "checked-in"
        ? "بررسی شده - ورود"
        : "بررسی شده - خروج";

  const statusToTagType = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "gray",
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <h1 className="self-start text-3xl font-semibold text-gray-800 dark:text-gray-100">
          رزرو #{formatNumber(bookingId)}
        </h1>
        <Tag
          type={statusToTagType[booking?.status]}
          className={"self-start sm:self-center"}
        >
          {status}
        </Tag>
        <Button variation={"text"} className={"mr-auto"} onClick={goBack}>
          بازگشت
          <HiArrowLongLeft className="text-xl" />
        </Button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex items-center gap-3">
        {booking?.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checking/${booking?.id}`)}>
            تایید ورود
          </Button>
        )}
        {booking?.status === "checked-in" && (
          <Button
            onClick={() =>
              checkOut(booking?.id, { onSettled: () => navigate(-1) })
            }
            disabled={isCheckingOut}
          >
            تایید خروج
          </Button>
        )}
        <Modal>
          <Modal.Open name={"delete"}>
            <Button
              variation="danger"
              onClick={{}}
              disabled={isDeletingBooking}
            >
              حذف رزرو
            </Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={`رزرو ${formatNumber(bookingId)}`}
              onConfirm={() => deleteBooking(booking?.id)}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={goBack}>
          بازگشت
        </Button>
      </div>
    </div>
  );
}

export default BookingDetail;
