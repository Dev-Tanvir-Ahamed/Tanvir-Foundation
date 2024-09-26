// import NavbarBase from "@/components/NavbarBase";
import ReusableNavbar from "@/components/shared/ReusableNavbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const items = [
    {
      key: "All Donations",
      label: (
        <NavLink to="/donations">
          <span className="text-white text-lg hover:text-primary_color">
            All Donations
          </span>
        </NavLink>
      ),
    },
    {
      key: "Running Projects",
      label: (
        <span className="text-white text-lg hover:text-primary_color">
          Running Projects
        </span>
      ),
    },
    {
      key: "Gallery",
      label: (
        <span className="text-white text-lg hover:text-primary_color">
          Gallery
        </span>
      ),
    },
    {
      key: "Contact Us",
      label: (
        <span className="text-white text-lg hover:text-primary_color">
          Contact Us
        </span>
      ),
    },
  ];

  return (
    <ReusableNavbar
      items={items}
      backgroundColor="bg-[#0A3B1E]"
      textColor="text-white"
    />
  );
};

export default Navbar;
