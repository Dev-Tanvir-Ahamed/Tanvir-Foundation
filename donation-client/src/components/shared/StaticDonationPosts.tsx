/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { useGetDonationPostsQuery } from "@/redux/api/baseApi";
import { Link } from "react-router-dom";

const StaticDonationPosts = () => {
  const {
    data: donationPosts,
    isLoading,
    isError,
  } = useGetDonationPostsQuery(undefined);
  console.log(donationPosts);

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        There was an error loading the donation posts.
      </p>
    );

  return (
    <div className="dark:bg-dark-background dark:text-dark-text">
      <h1 className="text-3xl font-semibold text-center mb-8 font-heading">
        Latest Events & Programs
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donationPosts?.map((post: any) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-dark_mode dark:text-dark-text"
          >
            <img
              src={`https://tanvir-foundation-server.vercel.app${post.image}`}
              alt={post.title}
              className=" h-64 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4 dark:text-dark-text">
                {post.details}
              </p>
              <p className="text-gray-600 mb-2 dark:text-dark-text">
                <strong>Category:</strong> {post.category}
              </p>

              <Link to={`/donations/${post._id}`}>
                <Button className="w-full py-2 px-4 bg-primary_color text-white rounded-md hover:bg-secondary_color transition duration-300 dark:bg-blue-600">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticDonationPosts;
