import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { updateUser, isPending } = useUpdateUser();
  const {
    user: {
      email,
      user_metadata: { fullName, avatar },
    },
  } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email,
      fullName,
      avatar,
    },
  });

  function onSubmit({ fullName, avatar }) {
    console.log({ fullName, avatar: avatar[0] });
    updateUser({ fullName, avatar: avatar[0] });
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
        بروزرسانی اطلاعات کاربر
      </h2>
      <form
        className="dark:bg-bg-dark flex flex-col gap-3 divide-y rounded-md border border-gray-200 bg-white px-10 py-6 dark:divide-gray-700 dark:border-gray-700 [&>*:not(:first-child)]:pt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow label={"ایمیل"} error={errors?.email?.message}>
          <input
            type="email"
            id="email"
            disabled={true}
            className={"h-10"}
            {...register("email")}
          />
        </FormRow>
        <FormRow label={"نام و نام خانوادگی"} error={errors?.fullName?.message}>
          <input
            type="text"
            id="fullName"
            className={"h-10"}
            disabled={isPending}
            {...register("fullName", {
              required: "نام و نام خانوادگی الزامی است",
              minLength: {
                value: 3,
                message: "نام و نام خانوادگی نمیتواند کمتر از ۳ حرف باشد",
              },
            })}
          />
        </FormRow>
        <FormRow label={"تصویر پروفایل"} error={errors?.avatar?.message}>
          <label
            htmlFor="avatar"
            className=" w-fit cursor-pointer rounded bg-indigo-600 px-3 py-2 text-gray-50 transition hover:bg-indigo-700"
          >
            انتخاب تصویر
          </label>
          <input
            type="file"
            id="avatar"
            className="hidden"
            disabled={isPending}
            {...register("avatar")}
          />
        </FormRow>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            variation={"secondary"}
            className={"h-10 w-full sm:w-max"}
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            حذف تغییرات
          </Button>
          <Button
            className={"h-10 w-full sm:w-max"}
            type={"submit"}
            disabled={isPending}
          >
            بروزرسانی حساب کاربری
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
