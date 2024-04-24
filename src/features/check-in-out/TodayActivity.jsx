import { useTodayActivity } from "./useTodayActivity";
import { cn } from "../../utils/cn";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";

function Today({ className }) {
  const { todayActivity, isLoading } = useTodayActivity();

  return (
    <div
      className={cn(
        "dark:bg-bg-dark flex flex-col overflow-auto rounded-md  border border-gray-200 bg-white px-6 py-5 dark:border-gray-800",
        className,
      )}
    >
      <h2 className="border-b-2 border-b-gray-100 pb-4 text-xl font-medium text-gray-800 dark:border-b-gray-800 dark:text-gray-100">
        امروز
      </h2>
      {isLoading ? (
        <Spinner />
      ) : todayActivity?.length > 0 ? (
        <ul className="no-scrollbar w-max divide-y overflow-auto dark:divide-gray-700">
          {todayActivity?.map((item) => (
            <TodayItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <p className="py-6 text-center">امروز هیچ فعالیتی نیست</p>
      )}
    </div>
  );
}

export default Today;
