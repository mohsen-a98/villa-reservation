import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

function Tag({ type, children, className }) {
  const tagStyles = cva("w-max rounded-full px-2 py-1 text-sm lg:text-base", {
    variants: {
      type: {
        blue: "bg-sky-100 text-sky-700 dark:bg-sky-800 dark:text-sky-100",
        green:
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100",
        gray: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
      },
    },
  });

  return (
    <span className={cn(tagStyles({ type: type }), className)}>{children}</span>
  );
}

export default Tag;
