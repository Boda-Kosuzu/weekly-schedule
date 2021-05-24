<template>
  <div class="bubble-item" :style="style">
    <preview-text :text="text" :font="font" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Background } from "@/classes/background";
import { Font } from "@/classes/font";
import PreviewText from "@/components/atoms/PreviewText.vue";

interface Props {
  text: string;
  background: Background;
  font: Font;
}

export default defineComponent({
  name: "Preveiw-Bubble-Item",
  components: {
    PreviewText,
  },
  props: {
    text: {
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
.bubble-item {
  padding: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 35px;
}
</style>
