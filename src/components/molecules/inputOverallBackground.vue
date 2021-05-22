<template>
  <h2
    class="weekly-schedule-h2 -open"
    :class="{ '-hide': !data.isOpen }"
    @click="accordion"
  >
    背景設定
  </h2>
  <transition name="accordion-item">
    <ul v-show="data.isOpen" class="input-list input-overall-background-list">
      <li>
        <input-color text="背景色" v-model:color="backgroundColor" />
      </li>
      <li>
        <input-checkbox text="枠線を表示する" v-model:checked="borderIsShow" />
      </li>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="input-overall-background-list-item">
          <input-pixel text="枠線の太さ" v-model:pixel="borderThickness" />
        </li>
      </transition>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="input-overall-background-list-item">
          <input-color text="枠線の色" v-model:color="borderColor" />
        </li>
      </transition>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="input-overall-background-list-item">
          <input-checkbox
            text="枠線の角を丸める"
            v-model:checked="borderIsRound"
          />
        </li>
      </transition>
      <transition name="accordion-item">
        <li
          v-show="borderIsShow && borderIsRound"
          class="input-overall-background-list-item"
        >
          <input-pixel text="丸める大きさ" v-model:pixel="borderRadius" />
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
import { OverallBackground } from "@/classes/overall";
import InputColor from "@/components/atoms/InputColor.vue";
import inputCheckbox from "@/components/atoms/InputCheckbox.vue";
import InputPixel from "@/components/atoms/InputPixel.vue";

type Porps = {
  background: OverallBackground;
};

export default defineComponent({
  name: "Input-Background",
  props: {
    background: {
      type: Object as PropType<OverallBackground>,
      required: true,
    },
  },
  components: {
    InputColor,
    inputCheckbox,
    InputPixel,
  },
  setup(props: Porps, context: SetupContext) {
    const data = reactive({
      isOpen: true,
    });
    const accordion = () => (data.isOpen = !data.isOpen);
    const backgroundColor = computed({
      get: () => props.background.color,
      set: (color: string) =>
        context.emit("update:background", { ...props.background, color }),
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
    const borderIsRound = computed({
      get: () => props.background.border.radius.isRound,
      set: (isRound: boolean) =>
        context.emit("update:background", {
          border: {
            ...props.background.border,
            radius: {
              ...props.background.border.radius,
              isRound,
            },
          },
        }),
    });
    const borderRadius = computed({
      get: () => props.background.border.radius.radius,
      set: (radius: number) =>
        context.emit("update:background", {
          border: {
            ...props.background.border,
            radius: {
              ...props.background.border.radius,
              radius,
            },
          },
        }),
    });

    return {
      data,
      accordion,
      backgroundColor,
      borderIsShow,
      borderThickness,
      borderColor,
      borderIsRound,
      borderRadius,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-overall-background {
  &-list {
    max-height: 343px;
    overflow: hidden;
    &-item {
      max-height: 60px;
      overflow: hidden;
    }
  }
}
</style>
