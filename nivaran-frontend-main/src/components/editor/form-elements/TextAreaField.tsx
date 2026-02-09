interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  register: any;
}

const TextAreaField = ({
  id,
  label,
  placeholder,
  required = false,
  register,
}: TextAreaFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <textarea
      {...register(id)}
      id={id}
      placeholder={placeholder}
      required={required}
      className="p-2 border rounded-md"
    />
  </div>
);

export default TextAreaField;
