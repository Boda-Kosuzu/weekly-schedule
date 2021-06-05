<template>
  <div class="preveiw-box-schedule">
    <div class="preveiw-box-schedule_item">
      <component
        v-show="isShowDayOfWeek"
        class="preview-box-schedule_item-box --day-of-week"
        :is="displayComponent"
        :text="dayOfWeek"
        :background="dateBackground"
        :font="dateFont"
      />
      <component
        class="preview-box-schedule_item-box --day-of-week"
        :is="displayComponent"
        :text="date"
        :background="dateBackground"
        :font="dateFont"
      />
    </div>
    <div class="preveiw-box-schedule_item --schedule">
      <div
        v-for="(item, index) in schedules"
        :key="index"
        class="preveiw-box-schedule_schedule-item"
      >
        <component
          class="preview-box-schedule_item-box --text"
          :is="displayComponent"
          :text="item.text"
          :background="item.background"
          :font="item.font"
        />
        <component
          v-show="item.isShowTime"
          class="preview-box-schedule_item-box --time"
          :is="displayComponent"
          :text="`${item.time
            .getHours()
            .toString()
            .padStart(2, '0')}:${item.time
            .getMinutes()
            .toString()
            .padStart(2, '0')}～`"
          :background="item.background"
          :font="item.font"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { Schedule } from "@/classes/schedules";
import previewBoxItem from "@/components/molecules/previewBoxItem.vue";
import previewBubbleItem from "@/components/molecules/previewBubbleItem.vue";

interface Props {
  index: number;
  schedules: Schedule[];
}
interface ComponentsList {
  [key: string]: any;
}

export default defineComponent({
  name: "Text",
  components: {
    previewBoxItem,
    previewBubbleItem,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    schedules: {
      type: Array as PropType<Schedule[]>,
      required: true,
    },
  },
  setup(props: Props) {
    const store = useStore();
    const dayOfWeeks = [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
      "日曜日",
    ];
    const componentsList: ComponentsList = {
      box: previewBoxItem,
      bubble: previewBubbleItem,
    };

    const isShowDayOfWeek = computed(
      () => store.state.DateInput.isShowDayOfWeek
    );
    const dayOfWeek = computed(
      () => dayOfWeeks[props.index + store.state.Overall.isStartMonday]
    );

    const dateBackground = computed(() => {
      const dayOfWeek = props.index + store.state.Overall.isStartMonday;
      if (dayOfWeek === 0 || dayOfWeek === 7) {
        return store.state.DateInput.holiday.background;
      } else if (dayOfWeek === 6) {
        return store.state.DateInput.saturday.background;
      } else {
        return store.state.DateInput.weekdays.background;
      }
    });

    const dateFont = computed(() => {
      const dayOfWeek = props.index + store.state.Overall.isStartMonday;
      if (dayOfWeek === 0 || dayOfWeek === 7) {
        return store.state.DateInput.holiday.font;
      } else if (dayOfWeek === 6) {
        return store.state.DateInput.saturday.font;
      } else {
        return store.state.DateInput.weekdays.font;
      }
    });

    const date = computed(() => {
      const date = new Date();
      date.setDate(store.state.DateInput.startDate.getDate() + props.index);

      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const displayComponent = computed(() => {
      return componentsList[store.state.Overall.desigin];
    });

    return {
      isShowDayOfWeek,
      dayOfWeek,
      dateBackground,
      dateFont,
      date,
      displayComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.preveiw-box-schedule {
  display: flex;
  &_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & .--day-of-week {
      min-width: 250px;
    }
    &.--schedule {
      width: 100%;
    }
    & + & {
      margin-left: 50px;
    }
    & > * + * {
      margin-top: 10px;
    }
  }
  &_schedule-item {
    width: 100%;
    display: flex;
    & > .--text {
      width: 100%;
    }
    & > .--time {
      min-width: 200px;
      margin-left: 15px;
    }
  }
  & + & {
    margin-top: 50px;
  }
}
</style>
