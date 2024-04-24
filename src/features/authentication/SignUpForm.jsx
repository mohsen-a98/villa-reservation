import { useForm } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    console.log({ fullName, email, password });
    signUp(
      { fullName, email, password },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  return (
    <form
      className="dark:bg-bg-dark flex flex-col gap-3 divide-y rounded-md border border-gray-200 bg-white px-5 py-6 dark:divide-gray-700 dark:border-gray-800 [&>*:not(:first-child)]:pt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label={"نام و نام خانوادگی"} error={errors?.fullName?.message}>
        <input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "وارد کردن این فیلد الزامی است",
          })}
        />
      </FormRow>
      <FormRow label={"ایمیل"} error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "وارد کردن این فیلد الزامی است",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "ایمیل معتبر نیست",
            },
          })}
        />
      </FormRow>
      <FormRow
        label={"رمز عبور (حداقل 8 کاراکتر)"}
        error={errors?.password?.message}
      >
        <div className="relative flex items-center gap-3">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            disabled={isSigningUp}
            {...register("password", {
              required: "وارد کردن این فیلد الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور حداقل باید 8 کاراکتر باشد",
              },
            })}
          />
          {!showPassword && (
            <HiEye
              className="cursor-pointe absolute left-2 top-1/4 fill-gray-800 text-lg after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 dark:fill-gray-300 "
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
          {showPassword && (
            <HiEyeSlash
              className="cursor-pointe absolute left-2 top-1/4 fill-gray-800 text-lg after:absolute after:right-2 after:top-1/2 after:-translate-y-1/2 dark:fill-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </FormRow>
      <FormRow label={"تکرار رمز عبور"} error={errors?.repeatPassword?.message}>
        <input
          type="password"
          id="repeatPassword"
          disabled={isSigningUp}
          {...register("repeatPassword", {
            required: "وارد کردن این فیلد الزامی است",
            validate: (value) =>
              value === getValues("password") || "رمز ها یکسان نیستند",
          })}
        />
      </FormRow>
      <div className="flex items-center gap-3 ">
        <Button
          variation={"secondary"}
          className={"h-10"}
          type="reset"
          disabled={isSigningUp}
        >
          ریست
        </Button>
        <Button className={"h-10"} type="submit" disabled={isSigningUp}>
          ایجاد کاربر جدید
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm;
