<template>
  <div class="input-checkbox">
    <label :for="state.id">
      {{ text }}
      <div
        class="input-checkbox-desigin"
        :class="{
          '-checked': checked,
          '-unchecked': !checked,
        }"
      ></div>
    </label>
    <input :id="state.id" type="checkbox" v-model="value" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, SetupContext } from "vue";

type Porps = {
  text: string;
  checked: boolean;
};

export default defineComponent({
  name: "Input-Checkbox",
  props: {
    text: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  setup(props: Porps, context: SetupContext) {
    const value = computed({
      get: () => props.checked,
      set: (value: boolean) => context.emit("update:checked", value),
    });
    const state = reactive({
      id:
        new Date().getTime().toString(16) +
        Math.floor(Math.random()).toString(16),
    });

    return {
      value,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-checkbox {
  &-desigin {
    width: 25px;
    height: 25px;
    margin-left: 5px;
    position: relative;
    border-radius: 5px;
    border: 1px solid $color-gray;
    box-sizing: border-box;
  }
  & > label {
    width: 225px;
    display: flex;
    user-select: none;
    font-size: 1.2rem;
    &:hover {
      opacity: 0.5;
    }
    & > .-unchecked {
      background: $color-right-gray;
    }
    & > .-checked {
      background: $color-blue;
      &::before {
        content: "";
        width: 15px;
        height: 7px;
        position: absolute;
        top: 4px;
        left: 3px;
        border-left: 3px solid $color-white;
        border-bottom: 3px solid $color-white;
        transform: rotate(-45deg);
      }
    }
  }
  & > input[type="checkbox"] {
    display: none;
  }
}
</style>
