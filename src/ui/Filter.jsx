import { useSearchParams } from "react-router-dom";
import { cn } from "../utils/cn";

function Filter({ filterFiled, options, className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterFiled) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterFiled, value);
    setSearchParams(searchParams);
  }

  return (
    <div
      className={cn(
        "dark:bg-bg-dark flex items-center gap-2 rounded border border-gray-200 bg-white  p-1 dark:border-gray-700",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
          type="button"
          className={cn(
            "w-max cursor-pointer rounded p-1 transition-colors hover:bg-indigo-600 hover:text-white dark:text-gray-100 ",
            option.value === currentFilter && "bg-indigo-600 text-white",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
