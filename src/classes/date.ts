import { ActionContext } from "vuex";
import { RootState } from "./root";
import { Background } from "./background";
import { Font } from "./font";

export interface State {
  startDate: Date;
  isShowDayOfWeek: boolean;
  weekdays: {
    background: Background;
    font: Font;
  };
  saturday: {
    background: Background;
    font: Font;
  };
  holiday: {
    background: Background;
    font: Font;
  };
}

export interface Getters {
  displayDate(state: State): string;
}

export type Mutations<S = State> = {
  ["updateStartDate"](state: S, payload: Date): void;
  ["updateIsShowDayOfWeek"](state: S, payload: boolean): void;
  ["updateWeekdays"](state: S, payload: { key: any }): void;
  ["updateSaturday"](state: S, payload: { key: any }): void;
  ["updateHoliday"](state: S, payload: { key: any }): void;
};

export type AugmentedActionContext = {
  commit<M extends keyof Mutations>(
    key: M,
    payload: Parameters<Mutations[M]>[1]
  ): ReturnType<Mutations[M]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  ["updateStartDate"]({ commit }: AugmentedActionContext, payload: Date): void;
  ["updateIsShowDayOfWeek"](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void;
  ["updateWeekdays"](
    { commit }: AugmentedActionContext,
    payload: { key: any }
  ): void;
  ["updateSaturday"](
    { commit }: AugmentedActionContext,
    payload: { key: any }
  ): void;
  ["updateHoliday"](
    { commit }: AugmentedActionContext,
    payload: { key: any }
  ): void;
}
