import DonationForm from "@/components/DonationForm";
import { useGetDonationPostQuery } from "@/redux/api/baseApi";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";

const DonationPost = () => {
  const { _id } = useParams<{ _id: string }>();

  const { data: post, isLoading, isError } = useGetDonationPostQuery(_id);
  console.log(post);

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        There was an error loading the donation post.
      </p>
    );

  return (
    <div className="">
      <div className=" bg-primary_color h-24 w-full flex justify-center items-center">
        <p className=" text-4xl font-semibold text-white">{post?.title}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto  md:gap-10 my-10">
        <div className="youtube_video justify-self-center w-full">
          <div className="relative pb-[56.25%] h-0">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=KFfSJNMPGoQ&pp=ygUVZG9uYXRpb24gY2xvdGggdmlkZW9z"
              controls={true}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
        <div className="shadow-lg p-5 h-[650px] md:h-[600px]">
          <h1 className="text-3xl my-5">{post.title}</h1>
          <p className="mb-5">
            About 26,000 sq km (18%) of Bangladesh is flooded by monsoons every
            year. At this time, especially in the northern part of the country,
            the flood-affected people are the victims of extreme misery. Every
            year, the As-Sunnah Foundation carries out relief activities in the
            flood-hit districts of the country and takes the initiative to stand
            by the needy and helpless people.
          </p>
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default DonationPost;
