import { AsyncFunction } from "@/types";

export function compareStringValue(a: string = "", b: string = ""): boolean {
  return a.toLowerCase().includes(b.toLowerCase());
}

export const withLoadingGenerator = (
  setLoading: (loading: boolean) => void
) => {
  return <T extends any[], R>(
    asyncFunction: AsyncFunction<T, R>
  ): AsyncFunction<T, R> => {
    return async (...args: T): Promise<R> => {
      try {
        setLoading(true);
        const result = await asyncFunction(...args);
        return result;
      } catch (error) {
        throw error; // Повторный выброс ошибки
      } finally {
        setLoading(false);
      }
    };
  };
};

export function dateFormatter(date: Date): string {
  console.log(date);

  const reqArray: string[] = [
    date.getUTCDate().toFixed().padStart(2, "0"),
    date.getUTCMonth().toFixed().padStart(2, "0"),
    date.getUTCFullYear().toFixed(),
  ];
  return reqArray.join(".");
}
