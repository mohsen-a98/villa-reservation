import Table from "../../ui/Table";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
  formatNumber,
} from "../../utils/helper";
import { HiEllipsisVertical } from "react-icons/hi2";
import DropDown from "../../ui/DropDown";
import { HiEye, HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Tag from "../../ui/Tag";

function BookingRow({
  data: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    villaPrice,
    status,
    villas: { name: villaName },
    guests: { fullName: guestName, email },
  },
}) {
  const navigate = useNavigate();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const checkStatus =
    status === "unconfirmed"
      ? "تایید نشده"
      : status === "checked-in"
        ? "بررسی شده - ورود"
        : "بررسی شده - خروج";

  const statusToTagType = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "gray",
  };

  return (
    <Table.Row>
      <div>{formatNumber(villaName)}</div>
      <div className="flex flex-col gap-1">
        <span>{guestName}</span>
        <span className="overflow-hidden break-words text-sm text-gray-500 dark:text-gray-400">
          {email}
        </span>
      </div>
      <div className="flex w-max flex-col items-center gap-1">
        <span>
          {formatDistanceFromNow(startDate)}{" "}
          <span className="text-xl">&larr;</span> {numNights} شب اقامت
        </span>
        <span>
          {formatDate(new Date(startDate))} &mdash;{" "}
          {formatDate(new Date(endDate))}
        </span>
      </div>
      <Tag type={statusToTagType[status]}>{checkStatus}</Tag>
      <div>{formatCurrency(villaPrice)}</div>

      <Modal>
        <DropDown>
          <DropDown.Open>
            <HiEllipsisVertical className="size-6 rounded-md transition-colors hover:bg-gray-200 hover:dark:bg-gray-700" />
          </DropDown.Open>
          <DropDown.Content>
            <DropDown.List>
              <DropDown.Item onClick={() => navigate(`/bookings/${bookingId}`)}>
                <HiEye />
                <span>مشاهده جزئیات</span>
              </DropDown.Item>
              <DropDown.Item onClick={() => navigate(`/checking/${bookingId}`)}>
                <HiArrowDownOnSquare />
                <span>تغییر وضعیت</span>
              </DropDown.Item>
              <Modal.Open name={"delete"}>
                <DropDown.Item>
                  <HiTrash />
                  <span>حذف رزرو</span>
                </DropDown.Item>
              </Modal.Open>
            </DropDown.List>
          </DropDown.Content>
        </DropDown>
        <Modal.Window name={"delete"}>
          <ConfirmDelete
            resourceName={`رزرو ${formatNumber(bookingId)}`}
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeletingBooking}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
