import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="grid h-dvh place-items-center">
      <div className="rounded-md px-6 py-8">
        <div>
          <h1 className="text-9xl font-black">404</h1>
        </div>
        <h2 className="mb-4 text-3xl font-bold">صفحه مورد نظر یافت نشد!</h2>
        <p className="mb-6 font-medium">
          با عرض پوزش، صفحه مورد نظر شما وجود ندارد. حذف شده یا نام آن تغییر
          کرده یا به طور موقت در دسترس نیست.
        </p>
        <Button onClick={() => navigate("/dashboard")} className="h-10">
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
