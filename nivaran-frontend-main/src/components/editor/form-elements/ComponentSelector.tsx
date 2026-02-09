import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ComponentConfig } from "../types/form-element-types";

interface ComponentSelectorProps {
  addComponent: (type: ComponentConfig["type"]) => void;
}

const ComponentSelector = ({ addComponent }: ComponentSelectorProps) => (
  <div className="flex gap-4 mt-6">
    <Button
      type="button"
      onClick={() => addComponent("BlogParagraph")}
      variant="outline"
    >
      <PlusIcon></PlusIcon>Add Blog Paragraph
    </Button>
    <Button
      type="button"
      onClick={() => addComponent("BlogImageWithCaption")}
      variant="outline"
    >
      <PlusIcon></PlusIcon>Add Blog Image With Caption
    </Button>
    <Button
      type="button"
      onClick={() => addComponent("BlogList")}
      variant="outline"
    >
      <PlusIcon></PlusIcon> Add Blog List
    </Button>
    <Button
      type="button"
      onClick={() => addComponent("BlogQuote")}
      variant="outline"
    >
      <PlusIcon></PlusIcon>Add Blog Quote
    </Button>
    <Button
      type="button"
      onClick={() => addComponent("BlogHeading")}
      variant="outline"
    >
      <PlusIcon></PlusIcon>Add Heading
    </Button>
  </div>
);

export default ComponentSelector;
