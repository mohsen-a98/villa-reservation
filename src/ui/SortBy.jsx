import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      onChange={handleChange}
      value={searchParams.get("sortBy") || ""}
      className="dark:bg-bg-dark h-10 rounded border border-gray-200 bg-white p-1 focus:outline-indigo-600 dark:border-gray-700 dark:text-gray-200"
    >
      {options.map((option) => (
        <option className="" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
