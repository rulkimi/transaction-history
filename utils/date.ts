interface FormatDateOptions {
  short?: boolean;
  time?: boolean;
}

export const formatDate = (
  date: string | Date, 
  options: FormatDateOptions = {}
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const { short = false, time = true } = options;

  // "13/03/2026" or "13/03/2026, 09:10 AM"
  if (short) {
    const d = dateObj.toLocaleDateString("en-MY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (time) {
      const t = dateObj.toLocaleTimeString("en-MY", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${d}, ${t}`;
    }
    return d;
  }

  // "13 Mar 2026" or "13 Mar 2026, 09:10 AM"
  const dateStr = dateObj.toLocaleDateString("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  if (time) {
    const timeStr = dateObj.toLocaleTimeString("en-MY", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}, ${timeStr}`;
  }
  return dateStr;
};

export const extractDate = (dateString: string) => {
  return dateString.slice(0, 10);
}