import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        بروز رسانی تنظیمات
      </h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
