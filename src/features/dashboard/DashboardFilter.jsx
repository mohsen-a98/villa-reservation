import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterFiled={"last"}
      options={[
        { label: "7 روز گذشته", value: "7" },
        {
          label: "30 روز گذشته",
          value: "30",
        },
        { label: "90 روز گذشته", value: "90" },
      ]}
    />
  );
}

export default DashboardFilter;
