export interface InfoCardType {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const InfoCard = ({ list }: { list: InfoCardType }) => {
  return (
    <div className="text-sm bg-neutral-100 border border-gray-200 p-4 flex rounded-sm flex-col gap-4 flex-1 w-full min-w-[300px]">
      {list.icon}
      <h3 className="font-semibold text-lg">{list.title}</h3>
      <p className="text-gray-600 ">{list.description}</p>
    </div>
  );
};
