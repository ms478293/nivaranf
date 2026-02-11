import { DistrictInformationCard } from "@/components/nivaran/sanjeevani/homepage/DistrictInformationCard";

const currentDistrict = {
  districtName: "Bhaktapur",
  districtInfo: {
    total_gaupalikas: 3,
    gaupalikas_covered: 4,
    total_camps_setup: 9,
    start_date: new Date(),
    end_date: new Date(),
    days_covered: 9,
  },
};
const page = () => {
  return (
    <div className="bg-gray-700 h-screen flex justify-center items-center">
      <DistrictInformationCard
        currentDistrict={currentDistrict}
      ></DistrictInformationCard>
    </div>
  );
};

export default page;
