const FilterTag = ({
  label,
  isActive,
  setActiveProvince,
  setActiveStatus,
}: {
  label: string;
  isActive?: boolean;
  setActiveProvince?: (province: string) => void;
  setActiveStatus?: (status: string) => void;
}) => {
  return (
    <li
      role="listitem"
      aria-label={`Click to filter by ${label}`}
      className={`pointer text-gray-600 cursor-pointer px-3 text-sm py-0.5 hover:bg-secondary-200 hover:text-secondary-800 bg-gray-100 rounded-full ${
        isActive ? "bg-secondary-200 text-secondary-800" : ""
      }`}
      onClick={() => {
        if (setActiveProvince) {
          setActiveProvince(label);
        } else if (setActiveStatus) {
          setActiveStatus(label);
        }
      }}
    >
      {label}
    </li>
  );
};

export default FilterTag;
