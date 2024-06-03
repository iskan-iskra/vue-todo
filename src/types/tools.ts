export type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>;
