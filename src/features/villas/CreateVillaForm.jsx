import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreateVilla } from "./useCreateVilla";
import { useUpdateVilla } from "./useUpdateVilla";

function CreateVillaForm({ villa = {}, onCloseModal }) {
  const { createVilla, isCreatingVilla } = useCreateVilla();
  const { updateVilla, isUpdatingVilla } = useUpdateVilla();
  const { id: editId, ...editValue } = villa;

  const isEditSession = Boolean(editId);

  const isWorking = isCreatingVilla || isUpdatingVilla;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updateVilla(
        { id: editId, newVilla: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }

    if (!isEditSession) {
      createVilla(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"نام ویلا"} error={errors?.villaName?.message}>
        <input
          type="text"
          className={"h-9"}
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "وارد کردن این فیلد الزامی است",
          })}
        />
      </FormRow>
      <FormRow label={"بیشترین ظرفیت"} error={errors?.maxCapacity?.message}>
        <input
          type="number"
          className={"h-9"}
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "وارد کردن این فیلد الزامی است",
            validate: {
              min: (value) => +value > 0 || "ظرفیت باید بزرگتر از صفر باشد",
            },
          })}
        />
      </FormRow>
      <FormRow label={"قیمت"} error={errors?.price?.message}>
        <input
          type="number"
          className={"h-9"}
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "وارد کردن این فیلد الزامی است",
            validate: {
              min: (value) => +value > 0 || "قیمت باید بزرگتر از صفر باشد",
            },
          })}
        />
      </FormRow>
      <FormRow label={"تخفیف"} error={errors?.discount?.message}>
        <input
          type="number"
          className={"h-9"}
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "وارد کردن این فیلد الزامی است",
            validate: {
              min: (value) =>
                +value >= 0 || "قیمت باید بزرگتر یا مساوی صفر باشد",
              max: (value) =>
                +value <= +getValues("regularPrice") ||
                "تخفیف نمی تواند بیشتر از قیمت باشد",
            },
          })}
        />
      </FormRow>
      <FormRow label={"توضیحات برای سایت"} error={errors?.description?.message}>
        <textarea
          id="description"
          cols="30"
          rows="5"
          className={
            "h-30 w-full resize-none overflow-auto rounded border border-gray-300 px-2 py-1 outline-indigo-600 dark:border-gray-600 dark:bg-transparent dark:text-gray-300"
          }
          placeholder="توضیحات برای سایت"
          disabled={isWorking}
          {...register("description")}
        ></textarea>
      </FormRow>
      <FormRow label={"عکس ویلا"} error={errors?.image?.message}>
        <label
          htmlFor="image"
          className="w-fit cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-indigo-50 transition hover:bg-indigo-700"
        >
          انتخاب عکس
        </label>
        <input
          type="file"
          accept="image/*"
          className={"hidden"}
          id="image"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "وارد کردن این فیلد الزامی است",
          })}
        />
      </FormRow>
      <div className="mt-5 flex items-center gap-3">
        <Button
          className={"h-10"}
          variation={"secondary"}
          onClick={onCloseModal}
          disabled={isWorking}
        >
          لغو
        </Button>
        <Button className={"h-10"} type="submit" disabled={isWorking}>
          {isEditSession ? "ویرایش اطلاعات ویلا" : "ایجاد ویلای جدید"}
        </Button>
      </div>
    </form>
  );
}

export default CreateVillaForm;
