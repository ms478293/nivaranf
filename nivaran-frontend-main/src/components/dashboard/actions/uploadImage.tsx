"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useForm } from "react-hook-form";

const UploadImageForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("label", data.label);
    formData.append("width", data.width);
    formData.append("height", data.height);
    formData.append("impactId", data.impactId || null);
    formData.append("foundationId", data.foundationId || null);

    try {
      const response = await axios.post(
        "https://api.nivaranfoundation.org/api/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Image uploaded successfully!");
      console.log(response);
      reset();
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <div className=" p-4 bg-white ">
      <form onSubmit={handleSubmit(onSubmit)} className="gap-4 flex flex-col ">
        <Input
          type="file"
          {...register("image", { required: true })}
          placeholder="Add Files"
        />
        <Input type="text" placeholder="Label" {...register("label")} />
        <Input
          type="number"
          step="0.1"
          placeholder="Width"
          {...register("width")}
        />
        <Input
          type="number"
          step="0.1"
          placeholder="Height"
          {...register("height")}
        />
        <Input
          type="text"
          placeholder="Impact ID (optional)"
          {...register("impactId")}
        />
        <Input
          type="text"
          placeholder="Foundation ID (optional)"
          {...register("foundationId")}
        />
        <Button type="submit" className="w-fit px-4 py-2">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadImageForm;
