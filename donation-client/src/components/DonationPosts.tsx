import StaticDonationPosts from "@/components/shared/StaticDonationPosts";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const DonationPosts = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f5f5f5] dark:bg-dark-background dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-3">
        <StaticDonationPosts />
        <div className="w-full text-center pt-5">
          <Button
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => navigate("/donations")}
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationPosts;
