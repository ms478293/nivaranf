type ListProps = {
  items: { key?: string; value: string }[]; // Allow `key` to be optional
  type?: "ordered" | "unordered";
  customStyle?: string;
};

const BlogList = ({
  items,
  type = "unordered",
  customStyle = "",
}: ListProps) => {
  if (!items || !Array.isArray(items)) return null;

  return type === "ordered" ? (
    <ol className={`list-decimal pl-6 ${customStyle}`} role="list">
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          {item.key && <span className="font-bold">{item.key}: </span>}
          {item.value}
        </li>
      ))}
    </ol>
  ) : (
    <ul className={`list-disc pl-6 ${customStyle}`} role="list">
      {items.map((item, index) => (
        <li key={index} className="mb-2">
          {item.key && <span className="font-bold">{item.key}: </span>}
          {item.value}
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
