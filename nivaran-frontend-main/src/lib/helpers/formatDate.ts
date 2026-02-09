export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const getOrdinal = (num: number) => {
    if (num > 3 && num < 21) return "th";
    switch (num % 10) {
      case 1:
        return "st"; // 1st
      case 2:
        return "nd"; // 2nd
      case 3:
        return "rd"; // 3rd
      default:
        return "th";
    }
  };

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
};
