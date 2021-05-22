import { ActionTree } from "vuex";
import { RootState } from "@/classes/root";
import { State, Actions } from "@/classes/schedules";

export const actions: ActionTree<State, RootState> & Actions = {
  ["updateScheduleText"]({ commit }, payload) {
    commit("updateScheduleText", payload);
  },
  ["updateScheduleTime"]({ commit }, payload) {
    commit("updateScheduleTime", payload);
  },
  ["updateIsShowTime"]({ commit }, payload) {
    commit("updateIsShowTime", payload);
  },
  ["updateScheduleBackground"]({ commit }, payload) {
    commit("updateScheduleBackground", payload);
  },
  ["updateScheduleFont"]({ commit }, payload) {
    commit("updateScheduleFont", payload);
  },
  ["addSchedule"]({ commit }, payload) {
    commit("addSchedule", payload);
  },
  ["deleteSchedule"]({ commit }, payload) {
    commit("deleteSchedule", payload);
  },
};
