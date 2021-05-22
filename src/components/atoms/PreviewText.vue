<template>
  <div :style="{ height: parseInt(font.fontSize, 10) * 1.1 + 'px' }">
    <svg
      :width="parseInt(font.fontSize, 10) * text.length"
      :height="parseInt(font.fontSize, 10) * 1.1"
    >
      <text
        x="50%"
        text-anchor="middle"
        :y="parseInt(font.fontSize, 10) * 0.92"
        :font-family="font.font"
        :font-size="font.fontSize"
        :fill="font.color"
        :stroke="stroke"
        :stroke-width="font.border.thickness"
      >
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Font } from "@/classes/font";

interface Props {
  text: string;
  font: Font;
}

export default defineComponent({
  name: "Text",
  props: {
    text: {
      type: String,
      required: true,
    },
    font: {
      type: Object as PropType<Font>,
      required: true,
    },
  },
  setup(props: Props) {
    const stroke = computed(() =>
      props.font.border.isShow ? props.font.border.color : ""
    );
    return {
      stroke,
    };
  },
});
</script>
