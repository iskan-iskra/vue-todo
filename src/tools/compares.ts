export const compareStringValue = (a: string = "", b: string = ""): boolean =>
  a.toLowerCase().includes(b.toLowerCase());

export const computeOverdue = (isCompleted: boolean, date: Date): boolean =>
  !isCompleted && date < new Date();
