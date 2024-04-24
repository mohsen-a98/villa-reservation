import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

function Stat({ title, value, icon, color }) {
  const colorStyles = cva("", {
    variants: {
      color: {
        blue: "bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-sky-200",
        green:
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
        yellow:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
        indigo:
          "bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200",
      },
    },
  });

  return (
    <div className="dark:bg-bg-dark grid grid-cols-[64px_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800">
      <div
        className={cn(
          "row-start-1 row-end-3 flex aspect-square items-center justify-center rounded-full [&>svg]:size-8",
          colorStyles({ color: color }),
        )}
      >
        {icon}
      </div>
      <h5 className="h-fit self-end font-medium text-gray-700 dark:text-gray-400">
        {title}
      </h5>
      <p className="h-fit text-xl font-semibold dark:text-gray-200">{value}</p>
    </div>
  );
}

export default Stat;
