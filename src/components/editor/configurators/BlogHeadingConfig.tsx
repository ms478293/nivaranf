import { FormInput, FormSelect } from "../form-elements/FormFields";
import { BlogHeadingConfigType } from "../types/form-element-types";

export const BlogHeadingConfig = ({
  index,
  config,
  updateComponent,
}: {
  index: number;
  config: BlogHeadingConfigType;
  updateComponent: (index: number, config: BlogHeadingConfigType) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <FormInput
        id={`text-${index}`}
        label="Text"
        placeholder="Enter Heading Here"
        value={config.text}
        onChange={(value) => updateComponent(index, { ...config, text: value })}
        required
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={`color-${index}`}>Color</label>
        <input
          id={`color-${index}`}
          type="color"
          value={config.color || "#000000"} // Default to black if no color is set
          className="border rounded-md h-10 w-10 cursor-pointer"
          onChange={(e) =>
            updateComponent(index, { ...config, color: e.target.value })
          }
        />
      </div>

      <FormSelect
        id={`align-${index}`}
        label="Alignment"
        options={[
          { value: "left", label: "left" },
          { value: "right", label: "right" },
          { value: "center", label: "center" },
        ]}
        value={config.align as BlogHeadingConfigType["align"]}
        onChange={(value) =>
          updateComponent(index, {
            ...config,
            align: value as BlogHeadingConfigType["align"],
          })
        }
      />
      <FormSelect
        id={`font-${index}`}
        label="Font Size"
        options={[
          { value: "sm", label: "small" },
          { value: "md", label: "normal" },
          { value: "lg", label: "large" },
          { value: "xl", label: "extra large" },
          { value: "2xl", label: "h2" },
          { value: "3xl", label: "h1" },
        ]}
        value={config.fontSize as BlogHeadingConfigType["fontSize"]}
        onChange={(value: BlogHeadingConfigType["fontSize"]) =>
          updateComponent(index, {
            ...config,
            fontSize: value,
          })
        }
      />
    </div>
  );
};
