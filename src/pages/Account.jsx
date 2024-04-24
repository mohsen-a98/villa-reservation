import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        بروزرسانی حساب کاربری
      </h1>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </div>
  );
}

export default Account;
