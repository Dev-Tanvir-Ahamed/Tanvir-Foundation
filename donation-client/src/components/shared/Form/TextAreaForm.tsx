// Assuming you have a Textarea component
import TextArea from "antd/es/input/TextArea";
import { Controller, useFormContext } from "react-hook-form";

type TTextareaProps = {
  placeholder?: string;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
};

const TextareaForm = ({
  name,
  label,
  placeholder,
  required,
  className,
}: TTextareaProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex items-center space-x-2">
      {label && (
        <label className="w-40 text-[11px] md:text-[12px] xl:text-[14px]">
          {label}:
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextArea
            {...field}
            required={required}
            placeholder={placeholder}
            className={`${className}`}
          />
        )}
      />
    </div>
  );
};

export default TextareaForm;
