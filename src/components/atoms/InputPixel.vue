<template>
  <div class="input-pixel">
    <p>{{ text }}</p>
    <input type="number" min="0" v-model="value" />px
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from "vue";

type Porps = {
  text: string;
  pixel: number;
};

export default defineComponent({
  name: "Input-Pixel",
  props: {
    text: {
      type: String,
      required: true,
    },
    pixel: {
      type: Number,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.pixel,
      set: (value) => {
        if (!value) value = 0;
        context.emit("update:pixel", value);
      },
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-pixel {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > input[type="number"] {
    width: 70px;
    margin-right: 5px;
    font-size: 1.2rem;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
  }
}
</style>
