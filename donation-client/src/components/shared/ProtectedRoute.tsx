import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const location = useLocation(); // Get the current route

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token) as any;
    const userRole = decodedToken.role;

    if (userRole === "admin" && location.pathname.startsWith("/admin")) {
      return children; // Allow admin to access admin routes
    } else if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (userRole !== "admin" && location.pathname.startsWith("/admin")) {
      return <Navigate to="/" replace />; // Non-admins can't access admin routes
    }

    return children; // Default return
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
