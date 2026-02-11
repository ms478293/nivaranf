import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

export const FormInputs = ({ register }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 bg-white border border-gray-300 p-4 rounded-lg">
        <InputField
          id="title"
          label="Title"
          placeholder="Title"
          required
          register={register}
        />
        <InputField
          id="subtitle"
          label="Subtitle"
          placeholder="Subtitle"
          required
          register={register}
        />
        <InputField
          id="date"
          label="Date"
          placeholder="Date"
          type="date"
          required
          register={register}
        />
        <InputField
          id="author"
          label="Author"
          placeholder="Author"
          required
          register={register}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor={"mainImage"}>{"Main Image URL"}</label>
          <select
            id={"mainImage"}
            value={""}
            className="p-2 border rounded-md"
            {...register("mainImage")}
          >
            <option value={"/usa/1.png"}>{"Placeholder"}</option>
          </select>
        </div>
        <InputField
          id="keywords"
          label="Keywords (comma-separated)"
          placeholder="Keywords"
          register={register}
        />
      </div>
      <TextAreaField
        id="heading"
        label="Introduction Heading"
        placeholder="Introduction Heading"
        register={register}
      />
      <TextAreaField
        id="content"
        label="Introduction"
        placeholder="Introduction"
        required
        register={register}
      />
    </>
  );
};
