type HeadingProps = {
  text: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  align?: "left" | "center" | "right";
  color?: string;
};

const BlogHeading = ({
  text,
  fontSize = "xl",
  align = "left",
  color = "#ffffff",
}: HeadingProps) => {
  return (
    <h2
      className={`text-${fontSize} text-${align} text-lg font-medium text-gray-950`}
      style={{ color: color }}
    >
      {text}
    </h2>
  );
};

export default BlogHeading;
