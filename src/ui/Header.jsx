import { FiMenu } from "react-icons/fi";
import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import Logo from "./Logo";
import { useLogout } from "../features/authentication/useLogout";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Header({ sidebarOpenToggle }) {
  const { logout, isLoggingOut } = useLogout();
  const navigate = useNavigate();

  return (
    <header className="dark:bg-bg-dark flex h-fit items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
      <div onClick={sidebarOpenToggle} className="w-fit lg:hidden">
        <FiMenu className="text-3xl dark:stroke-gray-400" />
      </div>
      <div>
        <Logo className={"hidden size-14 sm:block lg:hidden"} />
      </div>
      <ul className="flex items-center gap-4 [&_svg]:size-6 [&_svg]:text-indigo-600 [&_svg]:dark:text-indigo-400">
        <li className="hidden lg:block">
          <UserAvatar />
        </li>
        <li className="cursor-pointer">
          <button
            className="rounded p-1 transition hover:bg-gray-100 hover:dark:bg-gray-700"
            onClick={() => navigate("/account")}
          >
            <HiOutlineUser />
          </button>
        </li>
        <li className="cursor-pointer">
          <DarkModeToggle />
        </li>
        <li className="cursor-pointer">
          <button
            className="rounded p-1 transition hover:bg-gray-100 hover:dark:bg-gray-700"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            <HiArrowRightOnRectangle />
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
