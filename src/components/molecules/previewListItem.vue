<template>
  <div
    class="list-item"
    :class="{
      '--date': display === 'date',
      '--dayOfWeek': display === 'dayOfWeek',
    }"
    :style="style"
  >
    <preview-text display="middle" :text="text" :font="font" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Background } from "@/classes/background";
import { Font } from "@/classes/font";
import PreviewText from "@/components/atoms/PreviewText.vue";

interface Props {
  text: string;
  display: string;
  background: Background;
  font: Font;
}

export default defineComponent({
  name: "Preveiw-List-Item",
  components: {
    PreviewText,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    background: {
      type: Object as PropType<Background>,
      required: true,
    },
    font: {
      type: Object as PropType<Font>,
      required: true,
    },
  },
  setup(props: Props) {
    const style = computed(() => {
      return {
        width:
          props.display === "date" ? props.font.fontSize * 2.5 + "px" : "auto",
        height:
          props.display === "date" ? props.font.fontSize * 2.5 + "px" : "auto",
        "border-radius":
          props.display === "date" ? props.font.fontSize * 10 + "px" : "10px",
        background: props.background.color,
        border: props.background.border.isShow
          ? `${props.background.border.thickness}px solid ${props.background.border.color}`
          : "0",
      };
    });

    return {
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-item {
  &.--date {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.--dayOfWeek {
  }
}
</style>
