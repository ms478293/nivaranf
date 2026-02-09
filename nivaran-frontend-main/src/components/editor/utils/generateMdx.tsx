import { BlogLayoutProps } from "../types/form-element-types";

const generateMDX = (data: any, layouts: BlogLayoutProps[]) =>
  `---
title: "${data.title}"
subtitle: "${data.subtitle}"
date: "${data.date}"
author: "${data.author}"
mainImage: "${data.mainImage}"
keywords: "${data.keywords}"
---

## ${data.heading}

${data.content}

${layouts
  .map(
    (layout, layoutIndex) =>
      `<div className="${
        layout.type === "BoxLayout"
          ? "p-4 border rounded-md shadow-md gap-4"
          : layout.type === "GridLayout"
          ? "grid grid-cols-2 gap-4"
          : layout.type === "FlexLayout"
          ? "flex flex-wrap gap-4"
          : layout.type === "BorderLayout"
          ? ""
          : ""
      }" key="${layoutIndex}">
${layout.components
  .map((comp) => {
    switch (comp.type) {
      case "BlogParagraph": {
        const {
          text,
          hasImage,
          imageUrl,
          imageAlt,
          orientation,
          width,
          height,
        } = comp.config;
        const imageData = hasImage
          ? `imageData={{
                imageUrl: "${imageUrl}",
                imageAlt: "${imageAlt}",
                orientation: "${orientation}",
                width: "${width}",
                height: "${height}",
              }}`
          : "";
        return `<BlogParagraph ${imageData}>
  ${text}
</BlogParagraph>`;
      }
      case "BlogImageWithCaption":
        return `<BlogImageWithCaption imageUrl="${comp.config.imageUrl}" altText="${comp.config.altText}" caption="${comp.config.caption}" orientation="${comp.config.orientation}" />`;
      case "BlogList": {
        return `<BlogList
    items={[${comp.config.items
      .map((item: { key?: string; value: string }) => {
        const itemString = item.key
          ? `{ key: "${item.key}", value: "${item.value}" }`
          : `{ value: "${item.value}" }`;
        return itemString;
      })
      .join(", ")}]} 
    type="${comp.config.type}"
  />`;
      }
      case "BlogQuote":
        return `<BlogQuote text="${comp.config.text}" author="${comp.config.author}" width="${comp.config.width}" />`;
      case "BlogHeading":
        return `<BlogHeading text="${comp.config.text}" align="${comp.config.align}" color="${comp.config.color}" fontSize="${comp.config.fontSize}" /> `;
      default:
        return "";
    }
  })
  .join("\n")}
</div>`
  )
  .join("\n")}
`;

export { generateMDX };
