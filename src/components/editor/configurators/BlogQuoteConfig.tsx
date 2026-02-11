import { FormInput, FormSelect } from "../form-elements/FormFields";
import { BlogQuoteConfigType } from "../types/form-element-types";

export const BlogQuoteConfig = ({
  index,
  config,
  updateComponent,
}: {
  index: number;
  config: BlogQuoteConfigType;
  updateComponent: (index: number, config: BlogQuoteConfigType) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <FormInput
        id={`text-${index}`}
        label="Text"
        placeholder="Enter image URL"
        value={config.text}
        onChange={(value) => updateComponent(index, { ...config, text: value })}
        required
      />

      <FormInput
        id={`author-${index}`}
        label="Author"
        placeholder="Enter Author"
        value={config.author}
        onChange={(value) =>
          updateComponent(index, { ...config, author: value })
        }
        required
      />

      <FormSelect
        id={`listType-${index}`}
        label="Width"
        options={[
          { value: "full", label: "Full" },
          { value: "fit", label: "Fit" },
        ]}
        value={config.width}
        onChange={(value: BlogQuoteConfigType["width"]) =>
          updateComponent(index, { ...config, width: value })
        }
      />
    </div>
  );
};
