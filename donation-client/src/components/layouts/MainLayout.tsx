import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <>
      {/* <HeaderTop /> */}
      {/* <Header /> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
