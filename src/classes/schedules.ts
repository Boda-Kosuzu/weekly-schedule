import { ActionContext } from "vuex";
import { RootState } from "./root";
import { Background } from "./background";
import { Font } from "./font";

export interface Schedule {
  text: string;
  isShowTime: boolean;
  time: Date;
  background: Background;
  font: Font;
}

export interface State {
  schedules: Schedule[][];
}

export type Mutations<S = State> = {
  ["updateScheduleText"](
    state: S,
    payload: { date: number; index: number; text: string }
  ): void;
  ["updateScheduleTime"](
    state: S,
    payload: { date: number; index: number; time: Date }
  ): void;
  ["updateIsShowTime"](
    state: S,
    payload: { date: number; index: number; isShowTime: boolean }
  ): void;
  ["updateScheduleBackground"](
    state: S,
    payload: { date: number; index: number; background: Background }
  ): void;
  ["updateScheduleFont"](
    state: S,
    payload: { date: number; index: number; font: Font }
  ): void;
  ["addSchedule"](state: S, payload: number): void;
  ["deleteSchedule"](state: S, payload: { date: number; index: number }): void;
  ["updateSchedules"](state: S, payload: Schedule[][]): void;
};

export type AugmentedActionContext = {
  commit<M extends keyof Mutations>(
    key: M,
    payload: Parameters<Mutations[M]>[1]
  ): ReturnType<Mutations[M]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  ["updateScheduleText"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number; text: string }
  ): void;
  ["updateScheduleTime"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number; time: Date }
  ): void;
  ["updateIsShowTime"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number; isShowTime: boolean }
  ): void;
  ["updateScheduleBackground"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number; background: Background }
  ): void;
  ["updateScheduleFont"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number; font: Font }
  ): void;
  ["addSchedule"]({ commit }: AugmentedActionContext, payload: number): void;
  ["deleteSchedule"](
    { commit }: AugmentedActionContext,
    payload: { date: number; index: number }
  ): void;
}
