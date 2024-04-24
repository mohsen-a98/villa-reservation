import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          داشبورد
        </h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
