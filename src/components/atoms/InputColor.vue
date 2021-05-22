<template>
  <div class="input-color">
    <p>{{ text }}</p>
    <input type="color" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  text: string;
  color: string;
};

export default defineComponent({
  name: "Input-Color",
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.color,
      set: (value: string) => context.emit("update:color", value),
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-color {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="color"] {
    width: 100px;
  }
}
</style>
