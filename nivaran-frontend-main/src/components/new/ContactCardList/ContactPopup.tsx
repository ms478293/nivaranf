import { ContactInfo } from "./ContactMap";

export const RegionPopup = ({ region }: { region: string }) => {
  // Map of region details
  const regionDetails: Record<string, ContactInfo> = {
    "#worldMap_svg__nepal": {
      id: "nepal",
      name: "Nepal Office",
      details: {
        address: "Kathmandu, Nepal",
        contact: "+977 1-5354693",
      },
    },
    "#worldMap_svg__boston": {
      id: "usa",
      name: "USA Office",
      details: {
        address: "Boston, MA",
        contact: "+1 8577017471",
      },
    },
  };

  const regionInfo = regionDetails[region];

  if (!regionInfo) return null;

  return (
    <div className="absolute top-0 bg-white shadow-lg p-4 rounded-lg z-10 min-w-[250px]">
      <h3 className="font-bold text-lg mb-2 text-secondary-800">
        {regionInfo.name}
      </h3>
      <div className="text-sm">
        {Object.entries(regionInfo.details || {}).map(([key, value]) => (
          <p key={key} className="capitalize text-secondary-800">
            {key}: {value as string}
          </p>
        ))}
      </div>
    </div>
  );
};
