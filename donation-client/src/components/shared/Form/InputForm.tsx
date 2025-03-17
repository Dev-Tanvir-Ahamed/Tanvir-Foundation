import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  placeholder?: string;
  type?: string;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

const InputForm = ({
  name,
  label,
  type = "text",
  placeholder,
  required,
  className,
}: TInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-1">
      {" "}
      {/* Flex column for input and error */}
      <div className="flex items-center space-x-2">
        {" "}
        {/* Flex row for label and input */}
        {label && (
          <label className="w-40 text-[11px] md:text-[12px] xl:text-[14px]">
            {label}:
          </label>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              type={type}
              required={required}
              placeholder={placeholder}
              className={`${className}`}
            />
          )}
        />
      </div>
      {errors[name]?.message && (
        <span className="text-red-500 text-sm" style={{ marginLeft: "8.2rem" }}>
          {errors[name].message as string}
        </span>
      )}{" "}
      {/* Display error below input */}
    </div>
  );
};

export default InputForm;
