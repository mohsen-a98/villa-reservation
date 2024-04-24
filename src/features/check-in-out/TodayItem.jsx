import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import { formatNumber } from "../../utils/helper";
import { useCheckOut } from "./useCheckOut";

function TodayItem({ item }) {
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <li className="grid grid-cols-[0.6fr_1fr_0.6fr_1fr] items-center py-3 dark:text-gray-300">
      {item.status === "unconfirmed" && (
        <Tag type={"green"} className={"text-sm"}>
          رسیدن
        </Tag>
      )}
      {item.status === "checked-in" && <Tag type={"blue"}>خروج</Tag>}
      <span>{item.guests.fullName}</span>
      <span>{formatNumber(item.numNights)} شب</span>

      {item.status === "unconfirmed" && (
        <Button
          className={"h-8 w-max"}
          onClick={() => navigate(`/checking/${item.id}`)}
        >
          تایید ورود
        </Button>
      )}
      {item.status === "checked-in" && (
        <Button
          className={"h-8 w-max"}
          disabled={isCheckingOut}
          onClick={() => checkOut(item.id)}
        >
          تایید خروج
        </Button>
      )}
    </li>
  );
}

export default TodayItem;
