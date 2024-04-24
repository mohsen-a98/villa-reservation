import { useVillas } from "./useVillas";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import VillaRow from "./VillaRow";

function VillaTable() {
  const { villas, isLoading } = useVillas();

  if (isLoading) return <Spinner />;

  return (
    <Table
      gridColumnsStyles={"grid-cols-[0.8fr_1fr_1.8fr_1fr_1fr_0.6fr]"}
      className={"min-w-[600px]"}
    >
      <Table.Header>
        <div></div>
        <div>ویلا</div>
        <div>ظرفیت</div>
        <div>قیمت</div>
        <div>تخفیف</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={villas}
        render={(villa) => <VillaRow key={villa.id} data={villa} />}
      />
    </Table>
  );
}

export default VillaTable;
