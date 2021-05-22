import { State } from "@/classes/date";

export const state: State = {
  startDate: new Date(),
  isShowDayOfWeek: true,
  weekdays: {
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
      border: {
        isShow: false,
        thickness: 5,
        color: "#0f0f0f",
      },
    },
  },
  saturday: {
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
      border: {
        isShow: false,
        thickness: 5,
        color: "#0f0f0f",
      },
    },
  },
  holiday: {
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
      border: {
        isShow: false,
        thickness: 5,
        color: "#0f0f0f",
      },
    },
  },
};
