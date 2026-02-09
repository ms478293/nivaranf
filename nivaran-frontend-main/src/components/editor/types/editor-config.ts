import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Hyperlink from "editorjs-hyperlink";

const EDITOR_CONFIG = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter a Heading",
      levels: [2, 3, 6],
      defaultLevel: 2,
    },
  },

  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: "CMD+L",
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },

  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },

  list: {
    class: List,
    inlineToolbar: true,
  },

  quote: Quote,
};

export { EDITOR_CONFIG };
