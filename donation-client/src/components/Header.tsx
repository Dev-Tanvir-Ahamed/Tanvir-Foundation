import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { logout } from "@/redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/tanvir.jpeg";

const Header = () => {
  const loginData = useAppSelector((state) => state.auth.user);
  console.log("loginData", loginData);
  // Get user from Redux state
  const dispatch = useAppDispatch(); // Get the dispatch function

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear user state
  };

  return (
    <div className="flex justify-around h-24 items-center">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/home">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="header_nav space-x-3">
        {/* Conditionally show Login or Logout based on loginData */}
        {loginData ? (
          <>
            {/* Welcome message and Logout Button */}
            {/* <span>Welcome, {loginData.name}</span> */}
            <Button onClick={handleLogout} className="md:px-8">
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <NavLink to="/login">
              <Button className="md:px-8">Login</Button>
            </NavLink>
          </>
        )}

        {/* Donate Button */}
        <NavLink to="/donations">
          <Button className="md:px-8">Donate Now</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
