import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const loginData = useAppSelector((state) => state.auth.user); // Fetch logged-in user info from Redux

  if (!loginData) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the child component
  return children;
};

export default ProtectedRoute;
