function FormRow({ label, children, error }) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_1fr_1.2fr] [&_input]:w-full [&_input]:rounded [&_input]:border [&_input]:border-gray-300 [&_input]:px-2 [&_input]:py-1 [&_input]:outline-indigo-600 [&_input]:dark:border-gray-600 [&_input]:dark:bg-transparent [&_input]:dark:text-gray-300">
      {label && (
        <label htmlFor={children?.props?.id} className="dark:text-gray-300">
          {label}
        </label>
      )}
      {children}
      {error && <span className="mr-3 text-sm text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
