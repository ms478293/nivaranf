import {
  FormInputProps,
  FormSelectProps,
  FormTextareaProps,
} from "../types/form-element-types";
import dynamic from "next/dynamic";

// Dynamically import FormEditor (EditorJS is very heavy) — only loads when the editor is rendered
const FormEditor = dynamic(() => import("./FormEditor"), {
  ssr: false,
  loading: () => (
    <div className="p-2 border rounded-md h-32 bg-gray-50 animate-pulse" aria-label="Loading editor..." />
  ),
});

const FormInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      placeholder={placeholder}
      value={value || ""}
      className="p-2 border rounded-md"
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const FormTextarea = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: FormTextareaProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      placeholder={placeholder}
      value={value || ""}
      className="p-2 border rounded-md"
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const FormSelect = ({
  id,
  label,
  options,
  value,
  onChange,
}: FormSelectProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value || ""}
      className="p-2 border rounded-md"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const FormInputWithEditor = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id}>{label}</label>
    <FormEditor
      value={value}
      onChange={onChange}
      holder={id} // Pass the id as the holder for EditorJS
    />
  </div>
);

export { FormInput, FormInputWithEditor, FormSelect, FormTextarea };
