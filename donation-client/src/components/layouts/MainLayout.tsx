import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
