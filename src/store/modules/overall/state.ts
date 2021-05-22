import { State } from "@/classes/overall";

export const state: State = {
  desigin: "box",
  width: 1200,
  isStartMonday: false,
  background: {
    color: "#ffffff",
    border: {
      isShow: true,
      thickness: 5,
      color: "#000000",
      radius: {
        isRound: true,
        radius: 10,
      },
    },
  },
};
