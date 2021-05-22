import { ActionTree } from "vuex";
import { RootState } from "@/classes/root";
import { State, Actions } from "@/classes/date";

export const actions: ActionTree<State, RootState> & Actions = {
  ["updateStartDate"]({ commit }, payload) {
    commit("updateStartDate", payload);
  },
  ["updateIsShowDayOfWeek"]({ commit }, payload) {
    commit("updateIsShowDayOfWeek", payload);
  },
  ["updateWeekdays"]({ commit }, payload) {
    commit("updateWeekdays", payload);
  },
  ["updateSaturday"]({ commit }, payload) {
    commit("updateSaturday", payload);
  },
  ["updateHoliday"]({ commit }, payload) {
    commit("updateHoliday", payload);
  },
};
