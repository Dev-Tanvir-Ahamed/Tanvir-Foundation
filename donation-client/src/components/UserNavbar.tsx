// import NavbarBase from "@/components/NavbarBase";
import ReusableNavbar from "@/components/shared/ReusableNavbar";
import { NavLink } from "react-router-dom";

const UserLoggedNavbar = () => {
  const items = [
    {
      key: "Profile",
      label: (
        <NavLink to="/profile">
          <span className="text-white text-lg hover:text-primary_color">
            Profile
          </span>
        </NavLink>
      ),
    },
    {
      key: "Donations",
      label: (
        <NavLink to="/donations">
          <span className="text-white text-lg hover:text-primary_color">
            Donations
          </span>
        </NavLink>
      ),
    },
    {
      key: "Projects",
      label: (
        <NavLink to="/projects">
          <span className="text-white text-lg hover:text-primary_color">
            Projects
          </span>
        </NavLink>
      ),
    },
    {
      key: "Create Donation",
      label: (
        <NavLink to="/user/create-donation">
          <span className="text-white text-lg hover:text-primary_color">
            Create Donation
          </span>
        </NavLink>
      ),
    },
    {
      key: "Show Donation",
      label: (
        <NavLink to="/user/show-createDonationPosts">
          <span className="text-white text-lg hover:text-primary_color">
            Show DonationPosts
          </span>
        </NavLink>
      ),
    },
    {
      key: "LeaderBoard",
      label: (
        <NavLink to="/leaderboard">
          <span className="text-white text-lg hover:text-primary_color">
            LeaderBoard
          </span>
        </NavLink>
      ),
    },
  ];

  return (
    <ReusableNavbar
      items={items}
      backgroundColor="bg-[#0A3B1E]"
      textColor="text-[#ffffff]"
    />
  );
};

export default UserLoggedNavbar;
