import { MutationTree } from "vuex";
import { State, Mutations } from "@/classes/schedules";

export const mutations: MutationTree<State> & Mutations = {
  updateScheduleText(state, { date, index, text }) {
    state.schedules[date][index].text = text;
  },
  updateScheduleTime(state, { date, index, time }) {
    state.schedules[date][index].time = time;
  },
  updateIsShowTime(state, { date, index, isShowTime }) {
    state.schedules[date][index].isShowTime = isShowTime;
  },
  updateScheduleBackground(state, { date, index, background }) {
    state.schedules[date][index] = {
      ...state.schedules[date][index],
      background: {
        ...state.schedules[date][index].background,
        ...background,
      },
    };
  },
  updateScheduleFont(state, { date, index, font }) {
    state.schedules[date][index] = {
      ...state.schedules[date][index],
      font: {
        ...state.schedules[date][index].font,
        ...font,
      },
    };
  },
  addSchedule(state, payload) {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);

    state.schedules[payload].push({
      text: "おやすみ",
      time: date,
      isShowTime: false,
      background: {
        color: "#ffffff",
        border: {
          isShow: true,
          thickness: 5,
          color: "#000000",
        },
      },
      font: {
        color: "#000000",
        font: "arial",
        fontSize: 32,
        isBold: true,
        border: {
          isShow: false,
          thickness: 5,
          color: "#0f0f0f",
        },
      },
    });
  },
  deleteSchedule(state, { date, index }) {
    if (state.schedules[date].length < 2) return;
    state.schedules[date].splice(index, 1);
  },
  updateSchedules(state, payload) {
    state.schedules = payload;
  },
};
