import { GetterTree } from "vuex";
import { State, Getters } from "@/classes/date";
import { RootState } from "@/classes/root";

export const getters: GetterTree<State, RootState> & Getters = {
  displayDate: (state: State) => {
    const year = state.startDate.getFullYear();
    const month = ("0" + (state.startDate.getMonth() + 1)).slice(-2);
    const date = ("0" + state.startDate.getDate()).slice(-2);
    return `${year}-${month}-${date}`;
  },
};
