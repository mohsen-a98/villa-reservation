import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function BookingsTableOperation() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Filter
        filterFiled={"status"}
        options={[
          { value: "all", label: "همه" },
          { value: "unconfirmed", label: "تایید نشده" },
          { value: "checked-in", label: "بررسی شده - ورود" },
          { value: "checked-out", label: "بررسی شده - خروج" },
        ]}
        className={"flex-col sm:flex-row"}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "جدیدترین" },
          { value: "startDate-asc", label: "قدیمی ترین" },
          { value: "villaPrice-asc", label: "کمترین قیمت" },
          { value: "villaPrice-desc", label: "بیشترین قیمت" },
        ]}
      />
    </div>
  );
}

export default BookingsTableOperation;
