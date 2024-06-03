import { AsyncFunction } from "@/types";

export const withLoadingGenerator =
  (setLoading: (loading: boolean) => void) =>
  <T extends any[], R>(
    asyncFunction: AsyncFunction<T, R>
  ): AsyncFunction<T, R> =>
  async (...args: T): Promise<R> => {
    try {
      setLoading(true);
      const result = await asyncFunction(...args);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
