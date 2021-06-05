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
      <div class="input-button-area-upper">
        <button class="input-button-area-save" @click="save">書き出し</button>
        <button class="input-button-area-load" @click="load">読み込み</button>
        <input
          type="file"
          id="input-file"
          style="display: none"
          accept="application/json"
          @change="uploadFile"
        />
      </div>
      <button class="input-button-area-output" @click="output">出力</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, render } from "vue";
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
      if (!target) return;

      html2canvas(target as HTMLElement).then(function (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = `schedule.png`;
        link.click();
      });
    };

    const save = () => store.dispatch("saveSetting");
    const load = () => document.getElementById("input-file")?.click();
    const uploadFile = (e: any) => {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload = (e: any) => {
        store.dispatch("loadSetting", JSON.parse(e.target.result));
      };
    };

    return {
      schedules,
      output,
      save,
      load,
      uploadFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.input {
  &-date-area {
    width: 100%;
    height: calc(100% - 170px);
    border-bottom: 2px solid $color-gray;
    padding: 50px 25px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  &-button-area {
    width: 100%;
    height: 170px;
    box-sizing: border-box;
    padding: 25px;
    &-output {
      width: 100%;
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
    &-upper {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
    &-save,
    &-load {
      width: 45%;
      border: 3px solid $color-black;
      background: $color-white;
      border-radius: 10px;
      box-sizing: border-box;
      cursor: pointer;
      color: $color-black;
      font-size: 2rem;
      &:hover {
        opacity: 0.5;
      }
      &:active {
        opacity: 0.5;
      }
    }
  }
}
</style>
