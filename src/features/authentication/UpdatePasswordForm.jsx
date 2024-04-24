import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { updateUser, isPending } = useUpdateUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  function onSubmit({ password }) {
    updateUser({ password });
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
        بروزرسانی رمزعبور
      </h2>
      <form
        className="dark:bg-bg dark:bg-bg-dark flex flex-col gap-3 divide-y rounded-md border border-gray-200 bg-white px-10 py-6 dark:divide-gray-700 dark:border-gray-700
         [&>*:not(:first-child)]:pt-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow
          label={"رمز عبور (حداقل 8 کاراکتر)"}
          error={errors?.password?.message}
        >
          <input
            type="password"
            id="password"
            className={"h-10"}
            disabled={isPending}
            {...register("password", {
              required: "نوشتن رمز عبور الزامی است",
              minLength: { value: 8, message: "حداقل 8 کاراکتر" },
            })}
          />
        </FormRow>
        <FormRow
          label={"تکرار رمز عبور"}
          error={errors?.repeatPassword?.message}
        >
          <input
            type="password"
            id="repeatPassword"
            className={"h-10"}
            disabled={isPending}
            {...register("repeatPassword", {
              required: "تکرار رمز عبور الزامی است",
              validate: (value) =>
                value === getValues("password") || "رمز ها یکسان نیستند",
            })}
          />
        </FormRow>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            variation={"secondary"}
            className={"h-10 w-full sm:w-max"}
            disabled={isPending}
            type={"reset"}
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

export default UpdatePasswordForm;
