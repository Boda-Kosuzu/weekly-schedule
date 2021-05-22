<template>
  <h3
    class="weekly-schedule-h3 -open"
    :class="{ '-hide': !state.isOpen }"
    @click="accordion"
  >
    文字設定
  </h3>
  <transition name="accordion-item">
    <ul v-show="state.isOpen" class="input-list">
      <li>
        <input-color text="文字色" v-model:color="color" />
      </li>
      <li>
        <input-font v-model:font="fontFamily" />
      </li>
      <li>
        <input-pixel text="文字サイズ" v-model:pixel="fontSize" />
      </li>
      <li>
        <input-checkbox
          text="縁取りを表示する"
          v-model:checked="borderIsShow"
        />
      </li>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="accordion-item">
          <input-pixel text="縁取りの太さ" v-model:pixel="borderThickness" />
        </li>
      </transition>
      <transition name="accordion-item">
        <li v-show="borderIsShow" class="accordion-item">
          <input-color text="縁取りの色" v-model:color="borderColor" />
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
import { Font } from "@/classes/font";
import InputColor from "@/components/atoms/InputColor.vue";
import inputCheckbox from "@/components/atoms/InputCheckbox.vue";
import InputPixel from "@/components/atoms/InputPixel.vue";
import InputFont from "@/components/atoms/InputFont.vue";

type Props = {
  font: Font;
};

export default defineComponent({
  name: "Input-Font-Data",
  props: {
    font: {
      type: Object as PropType<Font>,
      required: true,
    },
  },
  components: {
    InputColor,
    inputCheckbox,
    InputPixel,
    InputFont,
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({
      isOpen: true,
    });
    const accordion = () => (state.isOpen = !state.isOpen);
    const color = computed({
      get: () => props.font.color,
      set: (color: string) =>
        context.emit("update:font", { ...props.font, color }),
    });
    const fontFamily = computed({
      get: () => props.font.font,
      set: (font: string) =>
        context.emit("update:font", { ...props.font, font }),
    });
    const fontSize = computed({
      get: () => props.font.fontSize,
      set: (fontSize: number) =>
        context.emit("update:font", { ...props.font, fontSize }),
    });
    const borderIsShow = computed({
      get: () => props.font.border.isShow,
      set: (isShow: boolean) =>
        context.emit("update:font", {
          ...props.font,
          border: { ...props.font.border, isShow },
        }),
    });
    const borderThickness = computed({
      get: () => props.font.border.thickness,
      set: (thickness: number) =>
        context.emit("update:font", {
          ...props.font,
          border: { ...props.font.border, thickness },
        }),
    });
    const borderColor = computed({
      get: () => props.font.border.color,
      set: (color: string) =>
        context.emit("update:font", {
          ...props.font,
          border: { ...props.font.border, color },
        }),
    });

    return {
      state,
      accordion,
      color,
      fontFamily,
      fontSize,
      borderIsShow,
      borderThickness,
      borderColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-list {
  max-height: 373px;
  overflow: hidden;
}
.accordion-item {
  max-height: 60px;
  overflow: hidden;
}
</style>
