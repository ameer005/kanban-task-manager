import create from "zustand";
import { devtools } from "zustand/middleware";
import createUserSlice from "./slices/createUserSlice";

const useStore = create(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
  }))
);

export default useStore;
