const TIMELINE_DATA = [
  {
    id: 1,
    date: "15th May, 2025 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },
  {
    id: 3,
    date: "2026 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },
  {
    id: 5,
    date: "Jan, 2027 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },
];

const ALTERNATE_TIMELINE = [
  {
    id: 2,
    date: "Mid 2025 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },

  {
    id: 4,
    date: "Late 2027 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },

  {
    id: 6,
    date: "2029 AD",
    title: "Project Sanjeevani Phase-I initiated",
  },
];

export const SanjeevaniTimeLIne = () => {
  return (
    <div>
      <div className="flex  gap-64">
        {TIMELINE_DATA.map((timeline) => (
          <TimeLineItemSmall
            key={timeline.id}
            date={timeline.date}
            title={timeline.title}
          />
        ))}
      </div>
      <div className="h-[1.5px] w-full bg-[radial-gradient(circle,_#1c49737d_20%,_#3A71A283_50%,_#5B9BD500_100%,_#80808000)]"></div>
      <div className="flex gap-64 ml-40">
        {ALTERNATE_TIMELINE.map((timeline) => (
          <TimeLineItemLarge
            key={timeline.id}
            date={timeline.date}
            title={timeline.title}
            reverse
          />
        ))}
      </div>
    </div>
  );
};

export const TimeLineItemLarge = ({
  date,
  title,
  reverse,
}: {
  date: string;
  title: string;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 items-center  ${
        reverse ? "flex-col-reverse" : ""
      }`}
    >
      <div className={`flex flex-col items-center `}>
        <h4 className="font-semibold text-lg text-primary-500">{date}</h4>
        <p className="w-[130px] text-gray-950 rounded-lg p-2 text-center border border-gray-400">
          {title}
        </p>
      </div>
      <div className="flex items-center flex-col"></div>
    </div>
  );
};
export const TimeLineItemSmall = ({
  date,
  title,
  reverse,
}: {
  date: string;
  title: string;
  reverse?: boolean;
}) => {
  return (
    <div className="flex flex-col  ">
      <div className={`flex flex-col items-center `}>
        <h4 className="font-semibold text-lg text-primary-500">{date}</h4>
        <p className="w-[160px] text-gray-950 rounded-lg p-2 text-center border border-gray-400">
          {title}
        </p>
      </div>
      {reverse && ""}
      <div className="flex items-center flex-col"></div>
    </div>
  );
};
