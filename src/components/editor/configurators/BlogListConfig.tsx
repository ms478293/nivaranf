import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSelect } from "../form-elements/FormFields";
import { BlogListConfigType } from "../types/form-element-types";

export const BlogListConfig = ({
  index,
  config,
  updateComponent,
}: {
  index: number;
  config: BlogListConfigType;
  updateComponent: (index: number, config: BlogListConfigType) => void;
}) => {
  const handleItemChange = (
    itemIndex: number,
    keyOrValue: "key" | "value",
    value: string
  ) => {
    const updatedItems = [...config.items];
    if (!updatedItems[itemIndex]) {
      updatedItems[itemIndex] = { key: "", value: "" };
    }
    updatedItems[itemIndex][keyOrValue] = value;
    updateComponent(index, { ...config, items: updatedItems });
  };

  const handleAddItem = () => {
    updateComponent(index, {
      ...config,
      items: [...(config.items || []), { key: "", value: "" }],
    });
  };

  const handleRemoveItem = (itemIndex: number) => {
    const updatedItems = [...config.items];
    updatedItems.splice(itemIndex, 1);
    updateComponent(index, { ...config, items: updatedItems });
  };

  return (
    <div className="flex flex-col gap-4">
      <FormSelect
        id={`listType-${index}`}
        label="List Type"
        options={[
          { value: "unordered", label: "Unordered" },
          { value: "ordered", label: "Ordered" },
        ]}
        value={config.type}
        onChange={(value: BlogListConfigType["type"]) =>
          updateComponent(index, { ...config, type: value })
        }
      />
      <div>
        {config.items?.map(
          (item: { key: string; value: string }, i: number) => (
            <div
              key={i}
              style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
            >
              {item.key !== undefined && (
                <Input
                  type="text"
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => handleItemChange(i, "key", e.target.value)}
                  style={{ flex: 1 }}
                />
              )}
              <Input
                type="text"
                placeholder="Value"
                value={item.value}
                onChange={(e) => handleItemChange(i, "value", e.target.value)}
                style={{ flex: 2 }}
                required
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveItem(i)}
              >
                Remove
              </Button>
            </div>
          )
        )}
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={handleAddItem}
        className="my-2"
      >
        Add Item
      </Button>
    </div>
  );
};
