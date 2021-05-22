<template>
  <div class="input-date">
    <p>{{ text }}</p>
    <input type="date" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  text: string;
  date: string;
};

export default defineComponent({
  name: "Input-Date",
  props: {
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.date,
      set: (value) => context.emit("update:date", new Date(value)),
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-date {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="date"] {
    font-size: 1.2rem;
  }
}
</style>
