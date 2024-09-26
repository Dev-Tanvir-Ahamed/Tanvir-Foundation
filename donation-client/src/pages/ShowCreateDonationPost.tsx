import { Button } from "@/components/ui/button";
import { useGetAllCreateDonationPostQuery } from "@/redux/api/baseApi";
import { Link } from "react-router-dom";

const ShowCreateDonation = () => {
  const { data: showDonation, isLoading } =
    useGetAllCreateDonationPostQuery(undefined);
  console.log(showDonation);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {showDonation.data?.map((post: any) => (
        <div
          key={post._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={`${post.image}`}
            alt={post.title}
            className=" h-64 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.details}</p>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {post.category}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Amount:</strong> {post.amount}
            </p>
            <Link to={`/donations/${post._id}`}>
              <Button className="w-full py-2 px-4 bg-primary_color text-white rounded-md hover:bg-secondary_color transition duration-300">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowCreateDonation;
