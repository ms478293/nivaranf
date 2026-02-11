import { BlogLayoutProps, ComponentConfig } from "../types/form-element-types";

const createComponent = (type) => {
  switch (type) {
    case "BlogParagraph":
      return {
        type,
        config: {
          hasImage: false,
          orientation: "left",
          width: "full",
          height: "short",
        },
      };
    case "BlogList":
      return {
        type,
        config: {
          type: "unordered",
          items: [{ key: "Example Key", value: "Example Value" }],
        },
      };
    case "BlogImageWithCaption":
      return {
        type,
        config: {
          orientation: "left",
          imageUrl: "/test",
          altText: "",
          caption: "test",
        },
      };
    case "BlogQuote":
      return { type, config: { width: "fit" } };
    case "BlogHeading":
      return { type, config: { text: "" } };
    default:
      throw new Error(`Unsupported component type: ${type}`);
  }
};
export const addComponent = ({ components, setComponents, type }) => {
  const newComponent = (() => {
    createComponent(type);
  })();

  setComponents([...components, newComponent]);
};

export const updateComponent = ({
  components,
  setComponents,
  index,
  config,
}) => {
  if (index < 0 || index >= components.length) {
    console.error(`Invalid index: ${index}`);
    return;
  }

  const updatedComponents = [...components];
  updatedComponents[index] = { ...updatedComponents[index], config };
  setComponents(updatedComponents);
};

export const removeComponent = ({ components, setComponents, index }) => {
  if (index < 0 || index >= components.length) {
    console.error(`Invalid index: ${index}`);
    return;
  }

  const updatedComponents = components.filter((_, i) => i !== index);
  setComponents(updatedComponents);
};

export const moveComponent = ({
  components,
  setComponents,
  index,
  direction,
}) => {
  const targetIndex = direction === "left" ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= components.length) {
    console.error(
      `Cannot move component out of bounds: targetIndex=${targetIndex}`
    );
    return;
  }

  const updatedComponents = [...components];
  const [movedItem] = updatedComponents.splice(index, 1);
  updatedComponents.splice(targetIndex, 0, movedItem);
  setComponents(updatedComponents);
};

export const addLayout = (
  layouts: BlogLayoutProps[],
  setLayouts: (value: BlogLayoutProps[]) => void
) => {
  const newLayout: BlogLayoutProps = {
    type: "FlexLayout",
    components: [{ config: {}, type: "BlogParagraph" }],
  };
  const updatedLayouts = [...layouts];
  updatedLayouts.push(newLayout);
  setLayouts(updatedLayouts);
};

export const removeLayout = (layouts, setLayouts, index) => {
  if (index < 0 || index >= layouts.length) {
    console.error(`Invalid layout index: ${index}`);
    return;
  }

  const updatedLayouts = layouts.filter((_, i) => i !== index);
  setLayouts(updatedLayouts);
};

export const addComponentToLayout = (
  layouts: BlogLayoutProps[],
  setLayouts: (value: BlogLayoutProps[]) => void,
  layoutIndex: number,
  type: ComponentConfig["type"]
) => {
  if (layoutIndex < 0 || layoutIndex >= layouts.length) {
    console.error(`Invalid layout index: ${layoutIndex}`);
    return;
  }

  const updatedLayouts = [...layouts];
  updatedLayouts[layoutIndex].components.push(createComponent(type));
  setLayouts(updatedLayouts);
};

export const removeComponentFromLayout = (
  layouts: BlogLayoutProps[],
  setLayouts: (value: BlogLayoutProps[]) => void,
  layoutIndex: number,
  componentIndex: number
) => {
  if (
    layoutIndex < 0 ||
    layoutIndex >= layouts.length ||
    componentIndex < 0 ||
    componentIndex >= layouts[layoutIndex].components.length
  ) {
    console.error(
      `Invalid indices: layoutIndex=${layoutIndex}, componentIndex=${componentIndex}`
    );
    return;
  }

  const updatedLayouts = [...layouts];
  updatedLayouts[layoutIndex].components.splice(componentIndex, 1);
  setLayouts(updatedLayouts);
};
