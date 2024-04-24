import Button from "./Button";

function ConfirmDelete({ resourceName, disabled, onCloseModal, onConfirm }) {
  return (
    <div className="flex flex-col gap-5 text-gray-800 dark:text-gray-300">
      <h1 className="text-2xl font-semibold">حذف {resourceName}</h1>
      <p className="text-lg">
        آیا از حذف {resourceName} اطمینان دارید؟ این عمل قابل بازگشت نیست.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <Button
          variation="secondary"
          onClick={onCloseModal}
          disabled={disabled}
          className={"h-11"}
        >
          بازگشت
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          className={"h-11"}
        >
          حذف
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
