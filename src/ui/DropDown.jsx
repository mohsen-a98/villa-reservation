import { createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const DropDownContext = createContext();
function DropDown({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropDownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative w-fit">{children}</div>
    </DropDownContext.Provider>
  );
}

function Open({ children }) {
  const { isOpen, setIsOpen } = useContext(DropDownContext);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      {children}
    </button>
  );
}

function Content({ children }) {
  const { isOpen, setIsOpen } = useContext(DropDownContext);
  const ref = useOutsideClick(() => setIsOpen(false), false);

  if (!isOpen) return null;

  return (
    <div ref={ref} className={"absolute left-0 top-full z-10 min-w-40"}>
      {children}
    </div>
  );
}

function List({ children }) {
  return (
    <ul className="dark:bg-bg-dark divide-y rounded border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700">
      {children}
    </ul>
  );
}

function Item({ children, onClick }) {
  return (
    <li
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 px-4 py-3  text-gray-500 transition *:w-max hover:bg-gray-100 dark:text-gray-400 hover:dark:bg-gray-800 [&_svg]:fill-current"
    >
      {children}
    </li>
  );
}

DropDown.Open = Open;
DropDown.Content = Content;
DropDown.List = List;
DropDown.Item = Item;

export default DropDown;
