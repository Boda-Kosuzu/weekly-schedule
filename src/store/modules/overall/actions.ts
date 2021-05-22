import { ActionTree } from "vuex";
import { RootState } from "@/classes/root";
import { State, Actions } from "@/classes/overall";

export const actions: ActionTree<State, RootState> & Actions = {
  ["updateDesigin"]({ commit }, payload) {
    commit("updateDesigin", payload);
  },
  ["updateWidth"]({ commit }, payload) {
    commit("updateWidth", payload);
  },
  ["updateIsStartMonday"]({ commit }, payload) {
    commit("updateIsStartMonday", payload);
  },
  ["updateBackground"]({ commit }, payload) {
    commit("updateBackground", payload);
  },
};
