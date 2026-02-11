import { Button } from "@/components/ui/button";

export const DownloadFileComponent = () => {
  const viewFile = () => {
    const source = "/files/sanjeevani/Project Sanjeevani.pdf";
    window.open(source, "_blank");
  };

  return (
    <Button
      onClick={viewFile}
      className="absolute bottom- left-10 px-4 py-2 hover:bg-secondary-main hover:text-white rounded-lg bg-primary-main w-full text-xl text-white"
      variant="outline"
    >
      View Our Strategic Vision
    </Button>
  );
};
