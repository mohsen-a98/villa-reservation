import CreateVillaForm from "./CreateVillaForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddVilla() {
  return (
    <Modal>
      <Modal.Open name={"addVilla"}>
        <Button>افزودن ویلا</Button>
      </Modal.Open>
      <Modal.Window name={"addVilla"}>
        <CreateVillaForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddVilla;
