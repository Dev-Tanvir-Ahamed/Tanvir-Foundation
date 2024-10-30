import { useGetUserDonationStatsQuery } from "@/redux/api/baseApi";
import UserName from "./shared/CapitalizeNameComponent.js";
const UserDonationStats = () => {
  const name = JSON.parse(localStorage.getItem("user")!).name;
  const email = JSON.parse(localStorage.getItem("user")!).email;
  console.log(email);

  // Use the RTK Query hook
  const { data, isLoading } = useGetUserDonationStatsQuery(email);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  if (data) {
    const {
      lastDonation,
      totalDonationNumber,
      minDonation,
      maxDonation,
      totalDonationAmount,
    } = data;

    return (
      <div className="col-span-12 md:col-span-4 shadow-xl p-5 space-y-3 dark:bg-dark_mode">
        <div className="text-[20px] font-semibold text-center">
          <p>
            <UserName name={name} />
          </p>
          <p className="font-normal">{email}</p>
        </div>
        <div className="flex justify-around items-center">
          <div className=" font-bold text-gray-700 dark:text-white text-[18px] space-y-2">
            <p>Last Donation</p>
            <p>Total Donation Number</p>
            <p>Minimum Donation</p>
            <p>Maximum Donation</p>
            <p>Total Donation</p>
          </div>
          <div className="space-y-2">
            <p>৳ {lastDonation?.amount} </p>
            <p>৳ {totalDonationNumber}</p>
            <p>৳ {minDonation} </p>
            <p>৳ {maxDonation} </p>
            <p>৳ {totalDonationAmount} </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UserDonationStats;
