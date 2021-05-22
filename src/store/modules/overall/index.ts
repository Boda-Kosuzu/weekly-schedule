import { Module } from "vuex";
import { State } from "@/classes/overall";
import { RootState } from "@/classes/root";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

export const Overall: Module<State, RootState> = {
  state,
  mutations,
  actions,
};
