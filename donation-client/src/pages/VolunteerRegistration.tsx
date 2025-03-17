import GlobalDonationForm from "@/components/shared/Form/GlobalDonationForm";
import InputForm from "@/components/shared/Form/InputForm";
import TextareaForm from "@/components/shared/Form/TextAreaForm";
import { volunteerSchema } from "@/validation/volunteerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";

const VolunteerRegistration = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    presentAddress: "",
    permenentAddress: "",
    education: "",
    occupation: "",
    volunteerFor: "",
    specialSkills: "",
  };

  return (
    <>
      <div className="bg-primary_color h-24 w-full flex justify-center items-center">
        <p className="text-4xl font-semibold text-white">
          Volunteer Registration
        </p>
      </div>
      <div className="bg-[#dddddd] p-10">
        <div className="max-w-7xl shadow-sm mx-auto px-3 py-16 sm:px-6 lg:px-8 bg-white">
          <GlobalDonationForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(volunteerSchema)} // Attach Zod validation
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <InputForm name="name" placeholder="Name" label="Name" />
              <InputForm name="email" placeholder="Email" label="Email" />
              <InputForm
                name="phone"
                placeholder="Phone"
                label="Phone Number"
              />
              <InputForm
                name="emergencyPhone"
                placeholder="Emergency Phone"
                label="Emergency Phone Number"
              />
              <InputForm
                name="presentAddress"
                placeholder="Present Address"
                label="Present Address"
              />
              <InputForm
                name="permenentAddress"
                placeholder="Permanent Address"
                label="Permanent Address"
              />
              <InputForm
                name="education"
                placeholder="SSC, HSC, BBA, Others"
                label="Educational Information"
              />
              <InputForm
                name="occupation"
                placeholder="Occupation"
                label="Occupation"
              />
              <TextareaForm
                name="volunteerFor"
                placeholder="Teaching, Cooking, Rescuing, others"
                label="Volunteer For"
              />
              <TextareaForm
                name="specialSkills"
                placeholder="Accountant, Programmer"
                label="Special Skills"
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-green-600 hover:!bg-green-700 w-full text-white mt-7"
            >
              Send My Application
            </Button>
          </GlobalDonationForm>
        </div>
      </div>
    </>
  );
};

export default VolunteerRegistration;
