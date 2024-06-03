import { withLoadingGenerator } from "@/tools";
import { ILoadingComposable } from "@/types";
import { computed, ref } from "vue";

const initialValue = false;

export default function (): ILoadingComposable {
  const isLoadingState = ref<boolean>(initialValue);

  const isLoading = computed<boolean>(() => isLoadingState.value);

  const setLoading = (flag: boolean) => (isLoadingState.value = flag);

  const withLoadingDecorator = withLoadingGenerator(setLoading);

  return {
    isLoading,
    setLoading,
    withLoadingDecorator,
  };
}
