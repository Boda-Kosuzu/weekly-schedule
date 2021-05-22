<template>
  <div>
    <div class="input-date-area">
      <overall />
      <input-date />
      <input-schedules
        v-for="(item, index) in schedules"
        :key="index"
        :date="index"
        :schedules="item"
      />
    </div>
    <div class="input-button-area">
      <button class="input-button-area-output" @click="output">出力</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Overall from "../organisms/inputOverall.vue";
import InputDate from "../organisms/inputDate.vue";
import inputSchedules from "../organisms/inputSchedules.vue";
import html2canvas from "html2canvas";

export default defineComponent({
  name: "Input",
  components: {
    Overall,
    InputDate,
    inputSchedules,
  },
  setup() {
    const store = useStore();
    const schedules = computed(() => store.state.Schedule.schedules);

    const output = () => {
      const target = document.getElementById("preview");
      console.log(target);
      if (!target) return;

      html2canvas(target as HTMLElement).then(function (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = `schedule.png`;
        link.click();
      });
    };

    return {
      schedules,
      output,
    };
  },
});
</script>

<style lang="scss" scoped>
.input {
  &-date-area {
    width: 100%;
    height: 90%;
    border-bottom: 2px solid $color-gray;
    padding: 50px 25px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  &-button-area {
    width: 100%;
    height: 10%;
    box-sizing: border-box;
    padding: 25px;
    &-output {
      width: 100%;
      height: 100%;
      background: $color-blue;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 2rem;
      color: $color-white;
      &:hover {
        opacity: 0.5;
      }
      &:active {
        background: $color-gray;
        opacity: 0.5;
      }
    }
  }
}
</style>
