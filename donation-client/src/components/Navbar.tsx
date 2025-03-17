// import NavbarBase from "@/components/NavbarBase";
import ReusableNavbar from "@/components/shared/ReusableNavbar";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const items = [
    {
      key: "All Donations",
      label: (
        <NavLink to="/donations">
          <span className="text-white text-lg hover:text-primary_color font-heading">
            All Donations
          </span>
        </NavLink>
      ),
    },
    {
      key: "Running Projects",
      label: (
        <span className="text-white text-lg hover:text-primary_color font-heading">
          Running Projects
        </span>
      ),
    },
    {
      key: "Gallery",
      label: (
        <span className="text-white text-lg hover:text-primary_color font-heading">
          Gallery
        </span>
      ),
    },
    {
      key: "LeaderBoard",
      label: (
        <NavLink to="/leaderboard">
          <span className="text-white text-lg hover:text-primary_color font-heading">
            LeaderBoard
          </span>
        </NavLink>
      ),
    },
    {
      key: "Community Gratitude Wall",
      label: (
        <NavLink to="/community">
          <span className="text-white text-lg hover:text-primary_color font-heading">
            Community Gratitude Wall
          </span>
        </NavLink>
      ),
    },
    {
      key: "Volunteer Registration",
      label: (
        <NavLink to="/volunteer-registration">
          <span className="text-white text-lg hover:text-primary_color font-heading">
            Volunteer Registration
          </span>
        </NavLink>
      ),
    },
    {
      key: "Contact Us",
      label: (
        <NavLink to="/contact-us">
          <span className="text-white text-lg hover:text-primary_color font-heading">
            Contact Us
          </span>
        </NavLink>
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
