import { create } from "zustand";

type ISearch = {
  search: string;
  setSearch: () => void;
};

const useCounter = create<ISearch>((set) => ({
  search: "",
  setSearch: () => set(() => ({ search: "Edwin Hernandez" })),
}));

export default useCounter;
