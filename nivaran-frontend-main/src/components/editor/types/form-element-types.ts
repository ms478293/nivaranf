interface BlogListItem {
  key: string;
  value: string;
}

interface BlogParagraphConfigType {
  text?: string;
  imageUrl?: string;
  hasImage?: boolean;
  imageAlt?: string;
  orientation?: "left" | "right";
  width?: "full" | "half";
  height?: "short" | "long";
}

interface BlogImageWithCaptionConfigType {
  imageUrl?: string;
  altText?: string;
  caption?: string;
  orientation?: "left" | "right" | "center";
}

interface BlogListConfigType {
  items?: BlogListItem[];
  type?: "unordered" | "ordered";
}

interface BlogQuoteConfigType {
  text?: string;
  author?: string;
  width?: "full" | "fit";
}
interface BlogHeadingConfigType {
  text: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "left" | "center" | "right";
  color?: string;
}

type ComponentConfig =
  | {
      type: "BlogParagraph";
      config: BlogParagraphConfigType;
    }
  | {
      type: "BlogImageWithCaption";
      config: BlogImageWithCaptionConfigType;
    }
  | {
      type: "BlogList";
      config: BlogListConfigType;
    }
  | {
      type: "BlogQuote";
      config: BlogQuoteConfigType;
    }
  | {
      type: "BlogHeading";
      config: BlogHeadingConfigType;
    };

interface BlogLayoutProps {
  type: "BoxLayout" | "GridLayout" | "FlexLayout" | "BorderLayout"; // Layout type
  components: ComponentConfig[];
}

interface ComponentConfiguratorProps {
  components: ComponentConfig[];
  updateComponent: (index: number, config: Record<string, any>) => void;
}

interface FormInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
}
interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}

export type {
  BlogHeadingConfigType,
  BlogImageWithCaptionConfigType,
  BlogLayoutProps,
  BlogListConfigType,
  BlogParagraphConfigType,
  BlogQuoteConfigType,
  ComponentConfig,
  ComponentConfiguratorProps,
  FormInputProps,
  FormSelectProps,
  FormTextareaProps,
};
