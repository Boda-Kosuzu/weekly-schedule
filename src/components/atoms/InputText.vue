<template>
  <div class="input-text">
    <p>{{ label }}</p>
    <input type="text" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  label: string;
  text: string;
};

export default defineComponent({
  name: "Input-Font",
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.text,
      set: (value) => {
        context.emit("update:text", value);
      },
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-text {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="text"] {
    font-size: 1.2rem;
  }
}
</style>
