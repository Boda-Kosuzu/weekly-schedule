import { createStore, ModuleTree } from "vuex";
import { RootState } from "@/classes/root";
import { Overall } from "./modules/overall/index";
import { Date } from "./modules/date/index";
import { Schedule } from "./modules/schedules/index";

const modules: ModuleTree<RootState> = {
  Overall,
  Date,
  Schedule,
};

export default createStore({
  modules,
});
