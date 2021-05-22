<template>
  <div class="input-font">
    <p>フォント</p>
    <input type="text" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  font: string;
};

export default defineComponent({
  name: "Input-Font",
  props: {
    font: {
      type: String,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.font,
      set: (value) => {
        context.emit("update:font", value);
      },
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-font {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="text"] {
    font-size: 1.2rem;
  }
}
</style>
