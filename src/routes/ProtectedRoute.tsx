import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import LoadingState from "../components/ui/LoadingState";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-dvh bg-miora-snow">
        <LoadingState />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
