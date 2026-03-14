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

  // Short date: "13/03/2026" or "13/03/2026, 21:10"
  // Default format: "13 Mar 2026, 9:10 PM"
  if (short) {
    let opts: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    if (time) {
      opts = {
        ...opts,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      };
    }
    return dateObj.toLocaleString("en-MY", opts);
  }

  let opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (time) {
    opts = {
      ...opts,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  }

  return dateObj.toLocaleString("en-MY", opts);
};