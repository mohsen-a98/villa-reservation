import { createContext, useContext } from "react";
import { cn } from "../utils/cn";

const TableContext = createContext();

function Table({ children, gridColumnsStyles, className }) {
  return (
    <TableContext.Provider value={{ gridColumnsStyles }}>
      <div
        role="table"
        className={cn(
          "w-full border-separate rounded-md border border-gray-200 dark:border-gray-700",
          className,
        )}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { gridColumnsStyles } = useContext(TableContext);
  return (
    <header
      className={cn(
        "grid gap-x-4 rounded-t-md border-b border-b-gray-200 bg-gray-50 px-3 py-4 font-semibold text-gray-700 dark:border-b-gray-700 dark:bg-gray-900 dark:text-gray-300 ",
        gridColumnsStyles,
      )}
    >
      {children}
    </header>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return <p className="min-h-20 px-5 py-3">اطلاعاتی وجود ندارد</p>;
  return (
    <section className="divide-y dark:divide-gray-700">
      {data.map(render)}
    </section>
  );
}

function Footer({ children }) {
  return <footer>{children}</footer>;
}

function Row({ children, className }) {
  const { gridColumnsStyles } = useContext(TableContext);
  return (
    <div
      role="row"
      className={cn(
        "dark:bg-bg-dark grid items-center gap-x-4 bg-gray-50 px-4 py-3 dark:text-gray-300",
        gridColumnsStyles,
        className,
      )}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;

export default Table;
