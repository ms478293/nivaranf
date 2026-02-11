import { isAfter, isBefore, isEqual, parseISO, startOfDay } from "date-fns";

export const volunteerStatus = (startDate: string, endDate: string) => {
  let status: "Ongoing" | "Planned" | "Completed";

  const today = new Date();
  const beginDate = startOfDay(parseISO(startDate));
  const lastDate = startOfDay(parseISO(endDate));
  if (isAfter(today, beginDate)) {
    status = "Completed";
  } else if (isBefore(today, lastDate)) {
    status = "Planned";
  } else if (isEqual(beginDate, lastDate)) {
    status = "Ongoing";
  } else status = "Planned";

  return { status };
};
