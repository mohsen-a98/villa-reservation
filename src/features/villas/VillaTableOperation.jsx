import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function VillaTableOperation() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Filter
        filterFiled={"discount"}
        options={[
          { value: "all", label: "همه" },
          { value: "yes", label: "دارای تخفیف" },
          { value: "no", label: "بدون تخفیف" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "نام (صعودی)",
          },
          { value: "name-desc", label: "نام (نزولی)" },
          { value: "regularPrice-asc", label: "قیمت (کمترین)" },
          { value: "regularPrice-desc", label: "قیمت (بیشترین)" },
          { value: "maxCapacity-asc", label: "ظرفیت (کمترین)" },
          { value: "maxCapacity-desc", label: "ظرفیت (بیشترین)" },
        ]}
      />
    </div>
  );
}

export default VillaTableOperation;
