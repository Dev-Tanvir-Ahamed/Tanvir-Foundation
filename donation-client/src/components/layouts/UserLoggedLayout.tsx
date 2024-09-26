import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import UserLoggedNavbar from "../UserNavbar";

const UserLoggedLayout = () => {
  return (
    <>
      <Header />
      <UserLoggedNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLoggedLayout;
