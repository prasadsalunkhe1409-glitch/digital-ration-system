import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // If no user → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role required but user has no role OR wrong role
  if (role && (!user.role || user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
