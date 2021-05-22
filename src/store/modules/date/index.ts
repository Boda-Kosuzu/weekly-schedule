import { Module } from "vuex";
import { State } from "@/classes/date";
import { RootState } from "@/classes/root";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import { getters } from "./getters";

export const Date: Module<State, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
