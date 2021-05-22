<template>
  <div class="input-time">
    <p>開始時刻</p>
    <input type="time" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  time: Date;
};

export default defineComponent({
  name: "Input-Date",
  props: {
    time: {
      type: Date,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () =>
        `${props.time
          .getHours()
          .toString()
          .padStart(2, "0")}:${props.time
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      set: (value: string) => {
        const date = new Date();
        const time = value.split(":");
        date.setHours(parseInt(time[0], 10));
        date.setMinutes(parseInt(time[1], 10));
        context.emit("update:time", date);
      },
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-time {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="time"] {
    font-size: 1.2rem;
  }
}
</style>
