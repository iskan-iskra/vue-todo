export const dateFormatter = (date: Date): string =>
  [
    date.getUTCDate().toFixed().padStart(2, "0"),
    date.getUTCMonth().toFixed().padStart(2, "0"),
    date.getUTCFullYear().toFixed(),
  ].join(".");

export const dateFormatterForInput = (date: Date): string =>
  [
    date.getUTCFullYear().toFixed(),
    date.getUTCMonth().toFixed().padStart(2, "0"),
    date.getUTCDate().toFixed().padStart(2, "0"),
  ].join("-");
