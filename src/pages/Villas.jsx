import AddVilla from "../features/villas/AddVilla";
import VillaTable from "../features/villas/VillaTable";
import VillaTableOperation from "../features/villas/VillaTableOperation";

function Villas() {
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          همه ویلاها
        </h1>
        <VillaTableOperation />
      </div>
      <div className="overflow-x-auto">
        <VillaTable />
      </div>
      <AddVilla />
    </div>
  );
}

export default Villas;
