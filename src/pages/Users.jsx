import SignUpForm from "../features/authentication/SignUpForm";

function Users() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        ایجاد کاربر جدید
      </h1>
      <SignUpForm />
    </div>
  );
}

export default Users;
