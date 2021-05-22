import { Module } from "vuex";
import { State } from "@/classes/schedules";
import { RootState } from "@/classes/root";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

export const Schedule: Module<State, RootState> = {
  state,
  mutations,
  actions,
};
