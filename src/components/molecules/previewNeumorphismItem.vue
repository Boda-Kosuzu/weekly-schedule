<template>
  <div class="Neumorphism-item" :style="background">
    <preview-text :text="text" :font="font" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "vuex";
import { Font } from "@/classes/font";
import PreviewText from "@/components/atoms/PreviewText.vue";
import chroma from "chroma-js";

export default defineComponent({
  name: "Neumorphism-Item",
  components: {
    PreviewText,
  },
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
  setup() {
    const store = useStore();
    const background = computed(() => {
      const light = chroma(store.state.Overall.background.color)
        .brighten()
        .css();
      const shadow = chroma(store.state.Overall.background.color)
        .darken()
        .css();

      return {
        background: store.state.Overall.background.color,
        "box-shadow": `10px 10px 30px ${shadow}, -10px -10px 30px ${light}`,
      };
    });
    return {
      background,
    };
  },
});
</script>

<style lang="scss" scoped>
.Neumorphism-item {
  padding: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 35px;
}
</style>
