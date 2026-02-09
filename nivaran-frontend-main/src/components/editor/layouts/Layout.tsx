import React from "react";

type BorderLayoutProps = {
  north?: React.ReactNode; // Content for the north section
  south?: React.ReactNode; // Content for the south section
  east?: React.ReactNode; // Content for the east section
  west?: React.ReactNode; // Content for the west section
  center: React.ReactNode; // Center is required
};

type LayoutProps = {
  layoutType: "BoxLayout" | "GridLayout" | "FlexLayout" | "BorderLayout";
  className?: string;
  children?: React.ReactNode; // Used for non-BorderLayout types
  borderLayoutProps?: BorderLayoutProps; // Used for BorderLayout
};

const Layout = ({
  layoutType,
  className,
  children,
  borderLayoutProps,
}: LayoutProps) => {
  const getLayoutClass = () => {
    switch (layoutType) {
      case "BoxLayout":
        return "p-4 border rounded-md shadow-md"; // Box-like style
      case "GridLayout":
        return "grid grid-cols-2 gap-4"; // Two-column grid layout
      case "FlexLayout":
        return "flex flex-wrap gap-4"; // Flexible layout
      case "BorderLayout":
        return "border-layout grid grid-rows-layout grid-cols-layout min-h-screen"; // Border layout style
      default:
        return ""; // Default style if needed
    }
  };

  if (layoutType === "BorderLayout" && borderLayoutProps) {
    const { north, south, east, west, center } = borderLayoutProps;

    return (
      <div className={`${getLayoutClass()} ${className || ""}`}>
        {/* North */}
        {north && (
          <div className="north bg-gray-100 border-b border-gray-300 p-4 col-span-3">
            {north}
          </div>
        )}

        {/* West */}
        {west && (
          <div className="west bg-gray-100 border-r border-gray-300 p-4 row-span-1">
            {west}
          </div>
        )}

        {/* Center */}
        <div className="center p-4 col-span-1">{center}</div>

        {/* East */}
        {east && (
          <div className="east bg-gray-100 border-l border-gray-300 p-4 row-span-1">
            {east}
          </div>
        )}

        {/* South */}
        {south && (
          <div className="south bg-gray-100 border-t border-gray-300 p-4 col-span-3">
            {south}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${getLayoutClass()} ${className || ""}`}>{children}</div>
  );
};

export default Layout;
