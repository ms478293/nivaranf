import { Input } from "@/components/ui/input";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  register: any;
}

const InputField = ({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  register,
}: InputFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <Input
      {...register(id)}
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputField;
