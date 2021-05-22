<template>
  <h3
    class="weekly-schedule-h3 -open"
    :class="{ '-hide': !state.isOpen }"
    @click="accordion"
  >
    背景設定
  </h3>
  <transition name="accordion-item">
    <ul v-show="state.isOpen" class="input-list">
      <li>
        <input-color text="背景色" v-model:color="backgroundColor" />
      </li>
      <li>
        <input-checkbox text="枠線を表示する" v-model:checked="borderIsShow" />
      </li>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="accordion-item">
          <input-pixel text="枠線の太さ" v-model:pixel="borderThickness" />
        </li>
      </transition>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="accordion-item">
          <input-color text="枠線の色" v-model:color="borderColor" />
        </li>
      </transition>
    </ul>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  SetupContext,
  reactive,
  PropType,
} from "vue";
import { Background } from "@/classes/background";
import InputColor from "@/components/atoms/InputColor.vue";
import inputCheckbox from "@/components/atoms/InputCheckbox.vue";
import InputPixel from "@/components/atoms/InputPixel.vue";

type Porps = {
  background: Background;
};

export default defineComponent({
  name: "Input-Background",
  props: {
    background: {
      type: Object as PropType<Background>,
      required: true,
    },
  },
  components: {
    InputColor,
    inputCheckbox,
    InputPixel,
  },
  setup(props: Porps, context: SetupContext) {
    const state = reactive({
      isOpen: true,
    });
    const accordion = () => (state.isOpen = !state.isOpen);
    const backgroundColor = computed({
      get: () => props.background.color,
      set: (color: string) => context.emit("update:background", { color }),
    });
    const borderIsShow = computed({
      get: () => props.background.border.isShow,
      set: (isShow: boolean) =>
        context.emit("update:background", {
          border: {
            ...props.background.border,
            isShow,
          },
        }),
    });
    const borderThickness = computed({
      get: () => props.background.border.thickness,
      set: (thickness: number) =>
        context.emit("update:background", {
          border: {
            ...props.background.border,
            thickness,
          },
        }),
    });
    const borderColor = computed({
      get: () => props.background.border.color,
      set: (color: string) =>
        context.emit("update:background", {
          border: {
            ...props.background.border,
            color,
          },
        }),
    });

    return {
      state,
      accordion,
      backgroundColor,
      borderIsShow,
      borderThickness,
      borderColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-list {
  max-height: 236px;
  overflow: hidden;
}
.accordion-item {
  max-height: 60px;
  overflow: hidden;
}
</style>
