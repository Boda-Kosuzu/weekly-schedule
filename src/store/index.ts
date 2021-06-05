import { createStore, ModuleTree } from "vuex";
import { RootState } from "@/classes/root";
import { Overall } from "./modules/overall/index";
import { Date as DateInput } from "./modules/date/index";
import { Schedule } from "./modules/schedules/index";

const modules: ModuleTree<RootState> = {
  Overall,
  DateInput,
  Schedule,
};

export default createStore({
  modules,
  actions: {
    saveSetting(store) {
      console.log(store.state);
      const output = JSON.stringify(store.state);
      const link = document.createElement("a");

      link.href = "data:text/plain," + encodeURIComponent(output);
      link.download = "weeklySchedule.json";

      link.click();
    },
    loadSetting({ commit }, payload) {
      commit("updateDesigin", payload.Overall.desigin);
      commit("updateWidth", payload.Overall.width);
      commit("updateIsStartMonday", payload.Overall.isStartMonday);
      commit("updateBackground", payload.Overall.background);

      commit("updateStartDate", new Date(payload.DateInput.startDate));
      commit("updateIsShowDayOfWeek", payload.DateInput.isShowDayOfWeek);
      commit("updateWeekdays", payload.DateInput.weekdays);
      commit("updateSaturday", payload.DateInput.saturday);
      commit("updateHoliday", payload.DateInput.holiday);

      payload.Schedule.schedules.forEach((element: any) => {
        element.forEach((e: any) => {
          e.time = new Date(e.time);
        });
      });
      commit("updateSchedules", payload.Schedule.schedules);
    },
  },
});
