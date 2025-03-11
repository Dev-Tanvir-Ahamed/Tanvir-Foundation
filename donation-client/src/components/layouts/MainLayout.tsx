import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";
import HeaderTop from "../ui/HeaderTop";

const MainLayout = () => {
  return (
    <>
      <HeaderTop />
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
