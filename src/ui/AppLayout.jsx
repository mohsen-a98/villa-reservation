import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-dvh lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr]">
      <Sidebar
        isOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        className={"row-start-1 row-end-3"}
      />
      <Header sidebarOpenToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="h-full overflow-auto bg-gray-50 px-10 py-12 dark:bg-gray-900">
        {<Outlet />}
      </main>
    </div>
  );
}

export default AppLayout;
