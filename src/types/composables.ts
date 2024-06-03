import { ComputedRef } from "vue";
import { AsyncFunction } from "./tools";

export interface ILoadingComposable {
  isLoading: ComputedRef<boolean>;
  setLoading(flag: boolean): void;
  withLoadingDecorator<T extends any[], R>(
    asyncFunction: AsyncFunction<T, R>
  ): AsyncFunction<T, R>;
}
