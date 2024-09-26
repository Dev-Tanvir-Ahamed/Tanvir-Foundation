import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDonationPostMutation } from "@/redux/api/baseApi";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateDonationPost = () => {
  const { register, handleSubmit } = useForm();
  const [createDonationPost] = useCreateDonationPostMutation();
  const navigate = useNavigate();
  const notify = () =>
    toast("Donation Post Successfully Created!!!", { autoClose: 1000 });
  const onSubmit = async (data : FieldValues) => {
    console.log("Form data before FormData:", data);

    // Create a new FormData object
    const formData = new FormData();

    // Ensure the image input has files
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Append the first selected file
    } else {
      console.error("No image file selected");
      return; // Exit if no image is selected
    }

    // Append other fields to the FormData
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("amount", data.amount);
    formData.append("description", data.description);

    try {
      // Send the FormData to the API
      const response = await createDonationPost(formData).unwrap();
      console.log(response);

      // After successful creation, navigate to the show donations page
      navigate("/user/show-createDonationPosts");
    } catch (error) {
      console.error("Failed to create donation post:", error);
    }
  };
  return (
    <div className=" bg-[#f5f5f5]">
      <Container>
        <div className=" w-1/2 mx-auto">
          <h1 className="text-[20px] font-semibold text-gray-700 my-5">
            Create your Donation Post
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-[16px]">Donation Image</Label>
              <Input
                className="mt-2"
                type="file"
                {...register("image", { required: true })}
              />
            </div>
            <div>
              <Label className="text-[16px]">Category</Label>
              <Input
                className="mt-2"
                type="text"
                {...register("category", { required: true })}
              />
            </div>
            <div>
              <Label className="text-[16px]">Title</Label>
              <Input
                className="mt-2"
                type="text"
                {...register("title", { required: true })}
              />
            </div>
            <div>
              <Label className="text-[16px]">Amount</Label>
              <Input
                className="mt-2"
                type="number"
                {...register("amount", { required: true })}
              />
            </div>
            <div>
              <Label className="text-[16px]">Description</Label>
              <Textarea
                className="mt-2"
                placeholder="Write Down Somthing For Donation Post"
                {...register("description", { required: true })}
              ></Textarea>
            </div>
            {/* <Link to="/user/show-createDonationPosts"> */}
            <div className="pb-8">
              <Button type="submit" onClick={notify}>
                Create Post
              </Button>
            </div>
            {/* </Link> */}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateDonationPost;
