<template>
  <div
    :class="{ 'display-middle': display === 'middle' }"
    :style="{ height: parseInt(font.fontSize, 10) * 1.1 + 'px' }"
  >
    <svg
      :width="parseInt(font.fontSize, 10) * (text.length + 1)"
      :height="parseInt(font.fontSize, 10) * 1.1"
    >
      <text
        :x="positionX"
        :text-anchor="textAnchor"
        :y="parseInt(font.fontSize, 10) * 0.92"
        :font-family="font.font"
        :font-size="font.fontSize"
        :font-weight="fontWeight"
        :stroke="stroke"
        :stroke-width="font.border.thickness"
        stroke-linejoin="round"
      >
        {{ text }}
      </text>
      <text
        :x="positionX"
        :text-anchor="textAnchor"
        :y="parseInt(font.fontSize, 10) * 0.92"
        :font-family="font.font"
        :font-size="font.fontSize"
        :font-weight="fontWeight"
        :fill="font.color"
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
  display: string;
  font: Font;
}

export default defineComponent({
  name: "Text",
  props: {
    text: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      default: "middle",
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

    const textAnchor = computed(() => {
      if (props.display === "left") {
        return "start";
      } else if (props.display === "right") {
        return "end";
      } else return "middle";
    });

    const positionX = computed(() => {
      if (props.display === "left") {
        return "0";
      } else if (props.display === "right") {
        return "100%";
      } else return "50%";
    });
    const fontWeight = computed(() => (props.font.isBold ? "bold" : "normal"));

    return {
      stroke,
      textAnchor,
      positionX,
      fontWeight,
    };
  },
});
</script>

<style lang="scss" scoped>
.display-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
