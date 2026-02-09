type QuoteProps = {
  text: string;
  author?: string;
  width?: "full" | "fit";
};

const BlogQuote = ({ text, author, width = "full" }: QuoteProps) => {
  return (
    <blockquote
      className={`border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4 w-${width}`}
    >
      {text}
      {author && (
        <cite className="block text-right mt-2 text-gray-500">- {author}</cite>
      )}
    </blockquote>
  );
};

export default BlogQuote;
