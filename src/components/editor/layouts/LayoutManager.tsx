import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import ComponentSelector from "../form-elements/ComponentSelector";
import { BlogLayoutProps } from "../types/form-element-types";
import {
  addComponentToLayout,
  addLayout,
  moveComponent,
  removeComponentFromLayout,
  removeLayout,
  updateComponent,
} from "../utils/FormUtils";
import Layout from "./Layout";

const ComponentConfigurator = dynamic(
  () =>
    import("../configurators/ComponentConfigurator").then(
      (mod) => mod.default // Adjust to match the export name
    ),
  {
    ssr: false,
    loading: () => <p>Loading Blog Paragraph...</p>,
  }
);
const LayoutManager = ({
  layouts,
  setLayouts,
}: {
  layouts: BlogLayoutProps[];
  setLayouts: (value: BlogLayoutProps[]) => void;
}) => {
  // Function to update the layout type for a specific layout
  const updateLayoutType = (index: number, type: BlogLayoutProps["type"]) => {
    const updatedLayouts = [...layouts];
    updatedLayouts[index] = {
      ...updatedLayouts[index], // Spread the current layout object
      type: type, // Update the layout type
    };
    setLayouts(updatedLayouts);
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-lg font-bold">Layouts</h2>
        <Button
          onClick={(e) => {
            e.preventDefault();
            addLayout(layouts, setLayouts);
          }}
          variant="outline"
        >
          <PlusIcon></PlusIcon>
          Add Layout
        </Button>
      </div>

      {layouts.map((layout, layoutIndex) => (
        <div key={layoutIndex} className="border p-4 rounded-md mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Layout {layoutIndex + 1}</h3>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                removeLayout(layouts, setLayouts, layoutIndex);
              }}
            >
              Remove Layout
            </Button>
          </div>

          {/* Select box to choose layout type */}
          <div className="mb-4">
            <label htmlFor={`layoutType-${layoutIndex}`} className="mr-2">
              Layout Type:
            </label>
            <select
              id={`layoutType-${layoutIndex}`}
              value={layout.type || "FlexLayout"} // Default to "FlexLayout" if type is not set
              onChange={(e) =>
                updateLayoutType(
                  layoutIndex,
                  e.target.value as BlogLayoutProps["type"]
                )
              }
              className="border p-2 rounded-md"
            >
              <option value="BoxLayout">Box Layout</option>
              <option value="GridLayout">Grid Layout</option>
              <option value="FlexLayout">Flex Layout</option>
              <option value="BorderLayout">BorderLayout</option>
            </select>
          </div>

          <ComponentSelector
            addComponent={(type) =>
              addComponentToLayout(layouts, setLayouts, layoutIndex, type)
            }
          />

          <Layout layoutType={layout.type || "FlexLayout"} className="my-2">
            {layout.components?.map((comp, componentIndex) => (
              <div key={componentIndex} className="border p-2 rounded-md">
                <h4>
                  {comp.type === "BlogList"
                    ? "List"
                    : comp.type === "BlogImageWithCaption"
                    ? "Image"
                    : comp.type === "BlogParagraph"
                    ? "Paragraph"
                    : comp.type === "BlogQuote"
                    ? "Quote"
                    : comp.type === "BlogHeading"
                    ? "Heading"
                    : ""}
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    removeComponentFromLayout(
                      layouts,
                      setLayouts,
                      layoutIndex,
                      componentIndex
                    );
                  }}
                >
                  Remove Component
                </Button>
              </div>
            ))}
          </Layout>

          <ComponentConfigurator
            components={layout.components || []}
            updateComponent={(index, config) =>
              updateComponent({
                components: layout.components || [],
                setComponents: (updatedComponents) => {
                  const updatedLayouts = [...layouts];
                  updatedLayouts[layoutIndex] = {
                    ...updatedLayouts[layoutIndex],
                    components: updatedComponents,
                  };
                  setLayouts(updatedLayouts);
                },
                index,
                config,
              })
            }
            removeComponent={(index) =>
              removeComponentFromLayout(layouts, setLayouts, layoutIndex, index)
            }
            moveComponent={(index, direction) =>
              moveComponent({
                components: layout.components || [],
                setComponents: (updatedComponents) => {
                  const updatedLayouts = [...layouts];
                  updatedLayouts[layoutIndex] = {
                    ...updatedLayouts[layoutIndex],
                    components: updatedComponents,
                  };
                  setLayouts(updatedLayouts);
                },
                index,
                direction,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default LayoutManager;
