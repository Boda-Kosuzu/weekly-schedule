<template>
  <div class="weekly-schedule">
    <input-area class="input-area" />
    <preview-area class="preview-area" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "resetcss";
import InputArea from "./components/template/Input.vue";
import PreviewArea from "./components/template/Preview.vue";

export default defineComponent({
  name: "App",
  components: {
    InputArea,
    PreviewArea,
  },
});
</script>

<style lang="scss">
.weekly-schedule {
  width: 100vw;
  height: 100vh;
  background: $color-white;
  display: flex;
}
.input-area {
  width: 30%;
  height: 100%;
  border-right: 2px solid $color-gray;
  box-sizing: border-box;
}
.preview-area {
  width: 70%;
  height: 100%;
}
</style>
