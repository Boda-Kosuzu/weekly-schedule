<template>
  <div>
    <h1
      class="weekly-schedule-h1"
      :class="{ '-hide': !data.isShowBody }"
      @click="operationAccordion"
    >
      日付
    </h1>
    <transition name="accordion-item">
      <div class="input-background_input-area" v-show="data.isShowBody">
        <ul class="input-list">
          <li><input-date text="開始日" v-model:date="startDate" /></li>
          <li>
            <input-checkbox
              text="曜日を表示する"
              v-model:checked="isShowDayOfWeek"
            />
          </li>
        </ul>
        <h2
          class="weekly-schedule-h2 -open"
          :class="{ '-hide': !data.isShowWeekdays }"
          @click="operationWeekddays"
        >
          平日
        </h2>
        <transition name="accordion-item">
          <div v-show="data.isShowWeekdays" class="input-background_date-item">
            <input-backgroundVue
              v-if="isShowBackground"
              v-model:background="weekdaysBackground"
            />
            <input-font-data v-model:font="weekdaysFontData" />
          </div>
        </transition>
        <h2
          class="weekly-schedule-h2 -open"
          :class="{ '-hide': !data.isShowSatureday }"
          @click="operationSatureday"
        >
          土曜日
        </h2>
        <transition name="accordion-item">
          <div v-show="data.isShowSatureday" class="input-background_date-item">
            <input-backgroundVue
              v-if="isShowBackground"
              v-model:background="saturdayBackground"
            />
            <input-font-data v-model:font="saturdayFontData" />
          </div>
        </transition>
        <h2
          class="weekly-schedule-h2 -open"
          :class="{ '-hide': !data.isShowHoliday }"
          @click="operationHoliday"
        >
          日・祝日
        </h2>
        <transition name="accordion-item">
          <div v-show="data.isShowHoliday" class="input-background_date-item">
            <input-backgroundVue
              v-if="isShowBackground"
              v-model:background="holidayBackground"
            />
            <input-font-data v-model:font="holidayFontData" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";
import InputDate from "@/components/atoms/InputDate.vue";
import InputCheckbox from "@/components/atoms/InputCheckbox.vue";
import inputBackgroundVue from "@/components/molecules/inputBackground.vue";
import inputFontData from "@/components/molecules/inputFontData.vue";

export default defineComponent({
  name: "Input_Overall",
  components: {
    InputDate,
    InputCheckbox,
    inputBackgroundVue,
    inputFontData,
  },
  setup() {
    const store = useStore();

    const data = reactive({
      isShowBody: false,
      isShowWeekdays: false,
      isShowSatureday: false,
      isShowHoliday: false,
    });

    function operationAccordion() {
      data.isShowBody = !data.isShowBody;
    }

    function operationWeekddays() {
      data.isShowWeekdays = !data.isShowWeekdays;
    }

    function operationSatureday() {
      data.isShowSatureday = !data.isShowSatureday;
    }

    function operationHoliday() {
      data.isShowHoliday = !data.isShowHoliday;
    }

    const startDate = computed({
      get: () => store.getters.displayDate,
      set: (startDate: string) =>
        store.dispatch("updateStartDate", new Date(startDate)),
    });

    const isShowDayOfWeek = computed({
      get: () => store.state.Date.isShowDayOfWeek,
      set: (isShowDayOfWeek: boolean) =>
        store.dispatch("updateIsShowDayOfWeek", isShowDayOfWeek),
    });

    const weekdaysBackground = computed({
      get: () => store.state.Date.weekdays.background,
      set: (background: { key: any }) =>
        store.dispatch("updateWeekdays", {
          ...store.state.Date.weekdays,
          background: {
            ...store.state.Date.weekdays.background,
            ...background,
          },
        }),
    });

    const saturdayBackground = computed({
      get: () => store.state.Date.saturday.background,
      set: (background: { key: any }) =>
        store.dispatch("updateSaturday", {
          ...store.state.Date.saturday,
          background: {
            ...store.state.Date.saturday.background,
            ...background,
          },
        }),
    });

    const holidayBackground = computed({
      get: () => store.state.Date.holiday.background,
      set: (background: { key: any }) =>
        store.dispatch("updateHoliday", {
          ...store.state.Date.holiday,
          background: {
            ...store.state.Date.holiday.background,
            ...background,
          },
        }),
    });

    const weekdaysFontData = computed({
      get: () => store.state.Date.weekdays.font,
      set: (font: { key: any }) =>
        store.dispatch("updateWeekdays", {
          ...store.state.Date.weekdays,
          font: {
            ...store.state.Date.weekdays.font,
            ...font,
          },
        }),
    });

    const saturdayFontData = computed({
      get: () => store.state.Date.saturday.font,
      set: (font: { key: any }) =>
        store.dispatch("updateSaturday", {
          ...store.state.Date.saturday,
          font: {
            ...store.state.Date.saturday.font,
            ...font,
          },
        }),
    });

    const holidayFontData = computed({
      get: () => store.state.Date.holiday.font,
      set: (font: { key: any }) =>
        store.dispatch("updateHoliday", {
          ...store.state.Date.holiday,
          font: {
            ...store.state.Date.holiday.font,
            ...font,
          },
        }),
    });

    const isShowBackground = computed(
      () =>
        store.state.Overall.desigin !== "list_1" &&
        store.state.Overall.desigin !== "neumorphism"
    );

    return {
      data,
      operationAccordion,
      operationWeekddays,
      operationSatureday,
      operationHoliday,
      startDate,
      isShowDayOfWeek,
      weekdaysBackground,
      saturdayBackground,
      holidayBackground,
      weekdaysFontData,
      saturdayFontData,
      holidayFontData,
      isShowBackground,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-background {
  &_input-area {
    max-height: 1000vh;
    overflow: hidden;
    & > h2 {
      margin-top: 15px;
    }
  }
  &_date-item {
    max-height: 704px;
    overflow: hidden;
  }
}
</style>
