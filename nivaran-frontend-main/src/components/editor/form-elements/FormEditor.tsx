import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";
import { EDITOR_CONFIG } from "../types/editor-config";

const FormEditor = ({
  value,
  onChange,
  holder,
}: {
  value: string;
  onChange: (value: string) => void;
  holder: string;
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_CONFIG,
        placeholder: "Add Content Here",
        data: { blocks: [{ type: "paragraph", data: { text: value } }] },
        async onChange(api) {
          const data = await api.saver.save();
          const htmlContent = processAndGenerateHTML(data);
          onChange(htmlContent); // Send HTML string output
          updateWordCount(data.blocks);
          updateLineNumbers(data.blocks);
        },
        autofocus: true,
        inlineToolbar: true,
        style: {
          nonce: "",
        },
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const processAndGenerateHTML = (data: any) => {
    return data.blocks
      .map((block: any) => {
        if (!block || !block.type) {
          console.warn("Invalid block data:", block);
          return ""; // Skip invalid blocks
        }

        switch (block.type) {
          case "header":
            if (!block.data.level || !block.data.text) {
              console.warn("Invalid header block:", block);
              return ""; // Skip invalid header blocks
            }
            const tag = `h${block.data.level}`;
            return `<${tag}>${block.data.text}</${tag}>`;

          case "list":
            if (!block.data.style || !block.data.items) {
              console.warn("Invalid list block:", block);
              return ""; // Skip invalid list blocks
            }
            const listTag = block.data.style === "ordered" ? "ol" : "ul";
            return `<${listTag}>${block.data.items
              .map(
                (item: any) =>
                  `<li>${item.content || ""}${item.items
                    ?.map(
                      (subItem: any) =>
                        `<ul><li>${subItem.content || ""}</li></ul>`
                    )
                    .join("")}</li>`
              )
              .join("")}</${listTag}>`;

          case "quote":
            if (!block.data.text || !block.data.caption) {
              console.warn("Invalid quote block:", block);
              return ""; // Skip invalid quote blocks
            }
            return `<blockquote style="text-align: ${
              block.data.alignment || "left"
            }"><p>${block.data.text}</p><footer>${
              block.data.caption
            }</footer></blockquote>`;

          case "checklist":
            if (!block.data.items || !Array.isArray(block.data.items)) {
              console.warn("Invalid checklist block:", block);
              return ""; // Skip invalid checklist blocks
            }
            return block.data.items
              .map(
                (item: any) =>
                  `<div><input type="checkbox" ${
                    item.checked ? "checked" : ""
                  } disabled> ${item.text || ""}</div>`
              )
              .join("");

          default:
            if (!block.data || !block.data.text) {
              console.warn("Invalid default block:", block);
              return ""; // Skip invalid default blocks
            }
            return `<p>${block.data.text}</p>`;
        }
      })
      .join("");
  };

  const updateWordCount = (blocks: any[]) => {
    const wordCount = blocks
      .map((block: any) => {
        if (block.text) return block.text.split(/\s+/).filter(Boolean).length;
        if (block.items) return block.items.flat().length;
        return 0;
      })
      .reduce((sum, count) => sum + count, 0);
    setWordCount(wordCount);
  };

  const updateLineNumbers = (blocks: any[]) => {
    const lineCount = blocks.map((block: any) => {
      if (block.text) return block.text.split("\n").length;
      return 1; // Default to one line for other types
    });
    setLineNumbers(lineCount);
  };

  return (
    <div className=" w-full">
      <div
        id={holder}
        className="border-4  bg-gray-100 rounded-md w-full justify-start  flex items-start min-h-[400px] h-auto overflow-y-scroll"
        style={{ height: "auto" }}
      ></div>

      {/* Word count and line numbers */}
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">Words: {wordCount}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">
            Lines: {lineNumbers.reduce((a, b) => a + b, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
