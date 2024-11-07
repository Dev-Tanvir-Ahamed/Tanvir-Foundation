import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
  useGetGratitudeWallQuery,
  usePostGratitudeWallMutation,
} from "@/redux/api/baseApi";
import { SendIcon } from "lucide-react";

export default function CommunityGratitudeWall() {
  const { register, handleSubmit, reset } = useForm();
  const { data, isLoading } = useGetGratitudeWallQuery(undefined); // Fetch comments
  const [postGratitude, { isLoading: isPosting }] =
    usePostGratitudeWallMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const newComment = {
      author: formData.author,
      content: formData.content,
    };
    try {
      await postGratitude(newComment).unwrap();
      reset(); // Clear the form
      //   refetch(); // Refetch comments to update the list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Gratitude Wall
        </h1>

        {/* Form to Submit Gratitude */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center text-gray-700">
              Share Your Appreciation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register("author", { required: true })}
                placeholder="Your Name"
                className="w-full"
              />
              <Textarea
                {...register("content", { required: true })}
                placeholder="Express your gratitude here..."
                className="w-full"
                rows={3}
              />
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isPosting}
              >
                <SendIcon className="mr-2 h-4 w-4" />{" "}
                {isPosting ? "Sharing..." : "Share Gratitude"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Displaying Comments */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {isLoading ? (
              <p>Loading comments...</p>
            ) : data?.data?.length > 0 ? (
              data.data.map((comment, index) => (
                <div
                  key={comment.id || index}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {comment.author}
                      </h3>
                      <p className="text-gray-600 mt-1">{comment.content}</p>
                    </div>
                  </div>
                  {comment.timestamp && (
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to share your gratitude!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
