import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import Logo from "./Logo";
import { useOutsideClick } from "../hooks/useOutsideClick";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const navLinks = [
  {
    name: "داشبورد",
    path: "dashboard",
    icon: <HiOutlineHome />,
  },
  {
    name: "رزرو ها",
    path: "bookings",
    icon: <HiOutlineCalendarDays />,
  },
  {
    name: "ویلاها",
    path: "villas",
    icon: <HiOutlineHomeModern />,
  },
  {
    name: "کاربران",
    path: "users",
    icon: <HiOutlineUsers />,
  },
  {
    name: "تنظیمات",
    path: "settings",
    icon: <HiOutlineCog6Tooth />,
  },
];
function Sidebar({ className, isOpen, setSidebarOpen }) {
  const ref = useOutsideClick(() => setSidebarOpen(false));

  return (
    <>
      <aside
        className={cn(
          "dark:bg-bg-dark fixed inset-y-0 z-50 w-64 border-l border-l-gray-200 bg-gray-50 px-4 py-6 text-lg transition-all duration-300 ease-in-out dark:border-l-gray-700",
          isOpen ? "translate-x-0" : "translate-x-full",
          "lg:relative lg:translate-x-0",
          className,
        )}
        ref={ref}
      >
        <button
          className="absolute left-5 top-5 text-[40px] text-gray-800 lg:hidden dark:text-gray-100"
          onClick={() => setSidebarOpen(!isOpen)}
        >
          &times;
        </button>
        <div className="grid place-items-center">
          <Logo className={"size-24"} />
        </div>
        <nav>
          <ul className="mt-5 divide-y dark:divide-gray-700">
            {navLinks.map((link) => (
              <li
                key={link.path}
                className="px-4 py-3"
                onClick={() => setSidebarOpen(false)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => {
                    return cn(
                      "flex gap-2 text-gray-600 dark:text-gray-300 [&>svg]:size-6",
                      isActive &&
                        "text-gray-800 dark:text-gray-100 [&>svg]:text-indigo-600 [&>svg]:dark:text-indigo-400",
                    );
                  }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div
        className={cn(
          "fixed inset-0 z-40 h-screen w-screen bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      ></div>
    </>
  );
}

export default Sidebar;
