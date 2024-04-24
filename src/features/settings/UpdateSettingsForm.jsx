import { useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSettings, isUpdatingSettings } = useUpdateSettings();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit(data) {
    updateSettings(data);
  }

  function handleReset(e) {
    e.preventDefault();
    reset();
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className="dark:bg-bg-dark flex flex-col gap-3 divide-y rounded-md border border-gray-200 bg-white px-5 py-6 dark:divide-gray-700 dark:border-gray-800 [&>*:not(:first-child)]:pt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow
        label={"حداقل زمان رزرو"}
        error={errors?.minBookingLength?.message}
      >
        <input
          type="number"
          id="minBookingLength"
          defaultValue={settings[0].minBookingLength}
          disabled={isUpdatingSettings}
          {...register("minBookingLength", {
            required: "وارد کردن این فیلد الزامی است",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "حداقل زمان رزرو باید 1 باشد",
            },
          })}
        />
      </FormRow>
      <FormRow
        label={"حداکثر زمان رزرو"}
        error={errors?.maxBookingLength?.message}
      >
        <input
          type="number"
          id="maxBookingLength"
          defaultValue={settings[0].maxBookingLength}
          disabled={isUpdatingSettings}
          {...register("maxBookingLength", {
            required: "وارد کردن این فیلد الزامی است",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "حداکثر زمان رزرو باید 1 یا بیشتر از آن باشد",
            },
          })}
        />
      </FormRow>
      <FormRow
        label={"حداکثر نفر در رزرو"}
        error={errors?.maxGuestsPerBooking?.message}
      >
        <input
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={settings[0].maxGuestsPerBooking}
          disabled={isUpdatingSettings}
          {...register("maxGuestsPerBooking", {
            required: "وارد کردن این فیلد الزامی است",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "حداکثر نفر در رزرو باید 1 یا بیشتر از آن باشد",
            },
          })}
        />
      </FormRow>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          variation={"secondary"}
          className={"h-10"}
          onClick={handleReset}
          disabled={isUpdatingSettings}
        >
          بازگشت به تنظیمات قبلی
        </Button>
        <Button
          className={"h-10"}
          type={"submit"}
          disabled={isUpdatingSettings}
        >
          ذخیره تغییرات
        </Button>
      </div>
    </form>
  );
}

export default UpdateSettingsForm;
