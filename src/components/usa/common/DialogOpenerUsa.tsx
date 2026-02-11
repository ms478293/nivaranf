"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useScreenSize } from "@/lib/helpers/useScreenSize";
import { useState } from "react";

const DialogOpenerUsa = () => {
  const [isToolkitOpen, setIsToolkitOpen] = useState(true);
  const screenSize = useScreenSize();
  if (screenSize == "lg")
    return (
      <div>
        <Dialog
          open={isToolkitOpen && screenSize == "lg"}
          onOpenChange={() => setIsToolkitOpen(!isToolkitOpen)}
        >
          <DialogTrigger className="w-full">Live Update</DialogTrigger>
          <DialogContent className="w-full lg:w-[1000px] lg:min-w-fit">
            <DialogHeader>
              <DialogTitle>Live Update</DialogTitle>
            </DialogHeader>

            <iframe
              src="https://www.fire.ca.gov/incidents.html" // Replace with the URL of the webpage you want to embed
              width="1000px" // Adjust the width as needed
              height="600px" // Adjust the height as needed
              style={{ border: "none" }}
              title="Embedded Webpage"
            />
          </DialogContent>
        </Dialog>
      </div>
    );
};
export { DialogOpenerUsa };
