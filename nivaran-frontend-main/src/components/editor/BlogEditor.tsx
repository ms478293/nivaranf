"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormInputs } from "./form-elements/FormInputs";
import { Preview } from "./preview/Preview";
import { BlogLayoutProps } from "./types/form-element-types";
import { downloadFile } from "./utils/downloadFile";
import { generateMDX } from "./utils/generateMdx";

const LayoutManager = dynamic(
  () =>
    import("./layouts/LayoutManager").then(
      (mod) => mod.default // Adjust to match the export name
    ),
  {
    ssr: false,
    loading: () => <p>Loading Blog Paragraph...</p>,
  }
);
const BlogFormComponent = () => {
  const { register, handleSubmit, watch } = useForm();

  const [layouts, setLayouts] = useState<BlogLayoutProps[]>([
    {
      type: "FlexLayout",
      components: [],
    },
  ]);

  // Watch form inputs
  const formInputs = watch();

  const onSubmit = (data: any) => {
    const mdxContent = generateMDX(data, layouts);
    downloadFile(mdxContent, `${data.title}.mdx`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 px-8 py-4"
    >
      <FormInputs register={register} />

      <LayoutManager layouts={layouts} setLayouts={setLayouts} />

      <Button type="submit" className="mt-6">
        Generate MDX
      </Button>

      {/* Pass the updated formInputs */}
      <Preview layouts={layouts} formInputs={formInputs} />
    </form>
  );
};

export default BlogFormComponent;
