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
    <li>
      <button
        aria-label={`Filter by ${label}`}
        className={`pointer text-gray-600 cursor-pointer px-3 text-sm py-1.5 min-h-[44px] inline-flex items-center hover:bg-secondary-200 hover:text-secondary-800 bg-gray-100 rounded-full ${
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
      </button>
    </li>
  );
};

export default FilterTag;
