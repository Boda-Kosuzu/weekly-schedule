import { MutationTree } from "vuex";
import { State, Mutations } from "@/classes/overall";

export const mutations: MutationTree<State> & Mutations = {
  updateDesigin(state, payload) {
    state.desigin = payload;
  },
  updateWidth(state, payload) {
    state.width = payload;
  },
  updateIsStartMonday(state, payload) {
    state.isStartMonday = payload;
  },
  updateBackground(state, payload) {
    state.background = {
      ...state.background,
      ...payload,
    };
  },
};
