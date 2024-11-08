import { Navigate } from "react-router-dom";
import { useAuth } from "../../../pages/admin/Private/Auth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Hoặc một loading spinner nếu bạn muốn hiển thị trong lúc chờ
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
