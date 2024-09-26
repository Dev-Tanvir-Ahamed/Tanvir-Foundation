import { useGetDonationByTransactionIdQuery } from "@/redux/api/baseApi";
import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";

const DonationSuccess = () => {
  // const location = useLocation();

  // Assuming the URL structure is /donation-success/:tran_id
  const { tran_id } = useParams(); // Extract tran_id from the route params
  console.log("Transaction ID from URL:", tran_id);

  const { data, error, isLoading } =
    useGetDonationByTransactionIdQuery(tran_id);
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching donation details</div>;

  return (
    <div className="bg-[#f5f5f5] h-screen">
      <div className="max-w-4xl mx-auto px-3">
        <div className="text-center space-y-5 mb-10">
          <h1 className="text-4xl pt-10 text-gray-700 font-bold">
            Your Donation Was Successfully Completed!
          </h1>
          <p className="text-2xl">
            Thank you for your kind donation! Your gift was processed
            successfully and you will receive a SMS or Email shortly!
          </p>
        </div>
        <div className=" shadow-xl max-w-2xl mx-auto h-60 space-y-2 bg-white p-5 mb-10">
          <h1 className="text-2xl font-semibold">Donation Information</h1>
          <div className="grid grid-cols-12">
            <div className=" col-span-4">
              <p>Donation Type </p>
              <p>Donation Amount </p>
              <p>Transaction ID </p>
              <p>Date </p>
            </div>
            <div className=" col-span-8">
              <p>Mosjid Complex</p>
              <p>{data.data.amount}</p>
              <p>{data.data.tran_id}</p>
              <p>{data.data.paymentDate}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to="/home">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
