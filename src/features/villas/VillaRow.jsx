import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";
import CreateVillaForm from "./CreateVillaForm";
import { formatCurrency } from "../../utils/helper";
import DropDown from "../../ui/DropDown";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteVilla } from "./useDeleteVilla";

function VillaRow({ data }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = data;
  const { deleteVilla, isDeletingVilla } = useDeleteVilla();

  return (
    <Table.Row>
      <img src={image} alt={`villa ${name}`} className="min-w-20" />
      <div>{name}</div>
      <div>برای {maxCapacity} مهمان مناسب است</div>
      <div>{formatCurrency(regularPrice)}</div>
      <div className="">{discount === 0 ? "—" : formatCurrency(discount)}</div>
      <div>
        <Modal>
          <DropDown>
            <DropDown.Open>
              <HiEllipsisVertical className="text-2xl" />
            </DropDown.Open>
            <DropDown.Content>
              <DropDown.List>
                <Modal.Open name={"edit"}>
                  <DropDown.Item>
                    <HiPencil className="text-xl" />
                    ویرایش
                  </DropDown.Item>
                </Modal.Open>
                <Modal.Open name={"delete"}>
                  <DropDown.Item>
                    <HiTrash className="text-xl" />
                    حذف
                  </DropDown.Item>
                </Modal.Open>
              </DropDown.List>
            </DropDown.Content>
          </DropDown>
          <Modal.Window name={"edit"}>
            <CreateVillaForm villa={data} />
          </Modal.Window>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={`ویلا ${name}`}
              onConfirm={() =>
                deleteVilla(id, {
                  onSuccess: () => {},
                })
              }
              disabled={isDeletingVilla}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default VillaRow;
