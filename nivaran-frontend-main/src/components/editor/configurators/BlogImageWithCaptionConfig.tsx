import { FormInput, FormSelect } from "../form-elements/FormFields";
import { BlogImageWithCaptionConfigType } from "../types/form-element-types";
export const BlogImageWithCaptionConfig = ({
  index,
  config,
  updateComponent,
}: {
  index: number;
  config: BlogImageWithCaptionConfigType;
  updateComponent: (
    index: number,
    config: BlogImageWithCaptionConfigType
  ) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <FormSelect
        id={`imgUrl-${index}`}
        label="Image Url"
        options={[{ value: "/usa/1.png", label: "Placeholder" }]}
        value={config.orientation}
        onChange={(value: BlogImageWithCaptionConfigType["imageUrl"]) =>
          updateComponent(index, { ...config, imageUrl: value })
        }
      />

      <FormInput
        id={`altText-${index}`}
        label="Alt Text"
        placeholder="Enter alt text"
        value={config.altText}
        onChange={(value) =>
          updateComponent(index, { ...config, altText: value })
        }
        required
      />

      <FormInput
        id={`caption-${index}`}
        label="Caption"
        placeholder="Enter caption"
        value={config.caption}
        onChange={(value) =>
          updateComponent(index, { ...config, caption: value })
        }
      />
      <FormSelect
        id={`orientation-${index}`}
        label=" Orientation"
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "right" },
        ]}
        value={config.orientation}
        onChange={(value: BlogImageWithCaptionConfigType["orientation"]) =>
          updateComponent(index, { ...config, orientation: value })
        }
      />
    </div>
  );
};
