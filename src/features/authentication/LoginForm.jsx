import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { login, isLoggingIn } = useLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit(data) {
    login(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  const inputStyles =
    "rounded border border-gray-300 outline-indigo-600 px-2 py-1 w-full h-10 dark:border-gray-600 dark:bg-transparent dark:text-gray-300";
  return (
    <div className="dark:bg-bg-dark flex h-dvh w-dvw items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-3">
        <Logo className="size-40 self-center" />
        <h1 className="mb-6 self-center text-3xl font-semibold text-gray-800 dark:text-gray-100">
          ورود به حساب کاربری
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="dark:bg-bg-dark w-80 space-y-5 rounded-md border border-gray-200 bg-white p-6 sm:w-96 dark:border-gray-700 dark:text-gray-300"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">ایمیل</label>
            <input
              type="email"
              id="email"
              className={inputStyles}
              defaultValue={"mohsen@email.com"}
              disabled={isLoggingIn}
              {...register("email", { required: "نوشتن ایمیل الزامی است" })}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              id="password"
              className={inputStyles}
              defaultValue={"mohsen1234"}
              disabled={isLoggingIn}
              {...register("password", {
                required: "نوشتن رمز عبور الزامی است",
              })}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={isLoggingIn}>
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
