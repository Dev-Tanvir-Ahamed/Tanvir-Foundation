import DonationStatsChart from "@/components/DonationStatsChart";
import UserDonationStats from "@/components/UserDonationStats";

const User = () => {
  return (
    <div className=" bg-[#F5F5F5] h-screen max-w-full pt-10">
      <div className="grid grid-cols-12 max-w-7xl px-5 mx-auto gap-0 md:gap-10 mt-10">
        <UserDonationStats />
        <div className="col-span-12 md:col-span-8">
          <DonationStatsChart />
        </div>
      </div>
    </div>
  );
};

export default User;
