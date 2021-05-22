import { ActionContext } from "vuex";
import { RootState } from "./root";

type Desigin = "box" | "bubble" | "hex" | "list_1" | "list_2";

export interface OverallBackground {
  color: string;
  border: {
    isShow: boolean;
    thickness: number;
    color: string;
    radius: {
      isRound: boolean;
      radius: number;
    };
  };
}

export interface State {
  desigin: Desigin;
  width: number;
  isStartMonday: boolean;
  background: OverallBackground;
}

export type Mutations<S = State> = {
  ["updateDesigin"](state: S, payload: Desigin): void;
  ["updateWidth"](state: S, payload: number): void;
  ["updateIsStartMonday"](state: S, payload: boolean): void;
  ["updateBackground"](state: S, payload: { key: unknown }): void;
};

export type AugmentedActionContext = {
  commit<M extends keyof Mutations>(
    key: M,
    payload: Parameters<Mutations[M]>[1]
  ): ReturnType<Mutations[M]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
  ["updateDesigin"]({ commit }: AugmentedActionContext, payload: Desigin): void;
  ["updateWidth"]({ commit }: AugmentedActionContext, payload: number): void;
  ["updateIsStartMonday"](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void;
  ["updateBackground"](
    { commit }: AugmentedActionContext,
    payload: { key: unknown }
  ): void;
}
