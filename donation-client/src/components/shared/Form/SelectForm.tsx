import { Select } from "antd"; // Adjust the import based on your UI library
import { Controller, useFormContext } from "react-hook-form";
type TSelectProps = {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
};
export const SelectForm = ({
  name,
  options,
  placeholder,
  className,
}: TSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          placeholder={placeholder}
          className={className}
          onChange={(value) => field.onChange(value)} // Handle change
        >
          {options.map((option: any) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
    />
  );
};
