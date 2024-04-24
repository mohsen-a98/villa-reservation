import { cn } from "../utils/cn";

function Spinner({ className }) {
  return (
    <div className="dark:bg-bg-dark flex size-full items-center justify-center">
      <div
        className={cn(
          "mx-auto my-auto inline-block size-16 animate-spin rounded-full border-8 border-indigo-600 border-l-transparent",
          className,
        )}
      ></div>
    </div>
  );
}

export default Spinner;
