import { MutationTree } from "vuex";
import { State, Mutations } from "@/classes/date";

export const mutations: MutationTree<State> & Mutations = {
  ["updateStartDate"](state, payload) {
    state.startDate = payload;
  },
  ["updateIsShowDayOfWeek"](state, payload) {
    state.isShowDayOfWeek = payload;
  },
  ["updateWeekdays"](state, payload) {
    state.weekdays = {
      ...state.weekdays,
      ...payload,
    };
  },
  ["updateSaturday"](state, payload) {
    state.saturday = {
      ...state.weekdays,
      ...payload,
    };
  },
  ["updateHoliday"](state, payload) {
    state.holiday = {
      ...state.weekdays,
      ...payload,
    };
  },
};
