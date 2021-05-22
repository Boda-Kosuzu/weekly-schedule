<template>
  <div>
    <h1
      class="weekly-schedule-h1"
      :class="{ '-hide': !data.isShowBody }"
      @click="operationAccordion"
    >
      全体
    </h1>
    <transition name="accordion-item">
      <div class="input-body" v-show="data.isShowBody">
        <ul class="input-list">
          <li>
            <input-selectbox
              text="デザイン"
              :itemList="desiginsList"
              v-model:selected="desigin"
            />
          </li>
          <li>
            <input-pixel text="幅" v-model:pixel="width" />
          </li>
          <li>
            <input-checkbox
              text="開始日を月曜日にする"
              v-model:checked="isStartMonday"
            />
          </li>
        </ul>
        <input-overall-background v-model:background="background" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import { OverallBackground } from "@/classes/overall";
import InputSelectbox from "@/components/atoms/InputSelectbox.vue";
import InputPixel from "@/components/atoms/InputPixel.vue";
import InputCheckbox from "@/components/atoms/InputCheckbox.vue";
import inputOverallBackground from "@/components/molecules/inputOverallBackground.vue";

export default defineComponent({
  name: "Input_Overall",
  components: {
    InputSelectbox,
    InputPixel,
    InputCheckbox,
    inputOverallBackground,
  },
  setup() {
    const store = useStore();
    const desiginsList = ref({
      box: "ボックス",
      bubble: "バブル",
      hex: "ヘックス",
      list_1: "リスト１",
      list_2: "リスト２",
    });

    const desigin = computed({
      get: () => store.state.Overall.desigin,
      set: (selected: string) => store.dispatch("updateDesigin", selected),
    });

    const width = computed({
      get: () => store.state.Overall.width,
      set: (width: number) => store.dispatch("updateWidth", width),
    });

    const isStartMonday = computed({
      get: () => store.state.Overall.isStartMonday,
      set: (isStartMonday: boolean) =>
        store.dispatch("updateIsStartMonday", isStartMonday),
    });

    const background = computed({
      get: () => store.state.Overall.background,
      set: (background: OverallBackground) =>
        store.dispatch("updateBackground", background),
    });

    const data = reactive({ isShowBody: false });
    function operationAccordion() {
      data.isShowBody = !data.isShowBody;
    }

    return {
      desiginsList,
      desigin,
      width,
      isStartMonday,
      background,
      data,
      operationAccordion,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-body {
  max-height: 100vh;
  overflow: hidden;
  &-area {
    &-enter-active,
    &-leave-active {
      transition: all 0.5s;
    }
    &-enter-from,
    &-leave-to {
      max-height: 0;
    }
  }
}
</style>
