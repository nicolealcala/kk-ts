import type { StoreApi, UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

export default function useShallowStore<T, U>(
  store: UseBoundStore<StoreApi<T>>,
  selector: (state: T) => U,
) {
  return store(useShallow(selector));
}
