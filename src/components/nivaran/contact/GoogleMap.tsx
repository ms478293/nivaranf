import MapDisplay from "./MapDisplay";

export const GoogleMap = () => {
  return (
    <div className="md:h-[550px] h-[300px] overflow-hidden">
      {/* <h1 className="text-sm font-medium text-blue-500 dark:text-blue-400">
        Location
      </h1> */}
      <MapDisplay />
    </div>
  );
};
