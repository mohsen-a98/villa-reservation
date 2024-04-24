import { cva } from "class-variance-authority";
import { cn } from "../utils/cn";

function Button({ children, onClick, variation, className, type, disabled }) {
  const button = cva(
    "px-4 py-3 rounded transition font-medium flex items-center gap-1 disabled:cursor-not-allowed justify-center focus:outline-indigo-700",
    {
      variants: {
        variation: {
          primary: "bg-indigo-600 text-indigo-50 hover:bg-indigo-700 shadow-sm",
          secondary:
            "bg-white dark:bg-bg-dark text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 hover:dark:bg-gray-900 shadow-sm",
          danger: "bg-red-700 text-red-100 hover:bg-red-800 shadow-sm",
          text: "bg-transparent text-indigo-600 hover:text-indigo-800 dark:text-indigo-500",
        },
      },
      defaultVariants: {
        variation: "primary",
      },
    },
  );

  return (
    <button
      className={cn(button({ variation: variation }), className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
