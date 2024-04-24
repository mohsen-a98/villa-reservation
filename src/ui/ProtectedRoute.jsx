import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex h-dvh w-dvw items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
