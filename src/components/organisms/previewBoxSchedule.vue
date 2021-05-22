<template>
  <div class="preveiw-box-schedule">
    <div class="preveiw-box-schedule_item">
      <box-item
        v-show="isShowDayOfWeek"
        class="preview-box-schedule_item-box --day-of-week"
        :text="dayOfWeek"
        :background="dateBackground"
        :font="dateFont"
      />
      <box-item
        class="preview-box-schedule_item-box --day-of-week"
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
        <box-item
          class="preview-box-schedule_item-box --text"
          :text="item.text"
          :background="item.background"
          :font="item.font"
        />
        <box-item
          v-show="item.isShowTime"
          class="preview-box-schedule_item-box --time"
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
import BoxItem from "@/components/molecules/previewBoxItem.vue";

interface Props {
  index: number;
  schedules: Schedule[];
}

export default defineComponent({
  name: "Text",
  components: {
    BoxItem,
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

    const isShowDayOfWeek = computed(() => store.state.Date.isShowDayOfWeek);
    const dayOfWeek = computed(
      () => dayOfWeeks[props.index + store.state.Overall.isStartMonday]
    );

    const dateBackground = computed(() => {
      const dayOfWeek = props.index + store.state.Overall.isStartMonday;
      if (dayOfWeek === 0 || dayOfWeek === 7) {
        return store.state.Date.holiday.background;
      } else if (dayOfWeek === 6) {
        return store.state.Date.saturday.background;
      } else {
        return store.state.Date.weekdays.background;
      }
    });

    const dateFont = computed(() => {
      const dayOfWeek = props.index + store.state.Overall.isStartMonday;
      if (dayOfWeek === 0 || dayOfWeek === 7) {
        return store.state.Date.holiday.font;
      } else if (dayOfWeek === 6) {
        return store.state.Date.saturday.font;
      } else {
        return store.state.Date.weekdays.font;
      }
    });

    const date = computed(() => {
      const date = new Date();
      date.setDate(store.state.Date.startDate.getDate() + props.index);

      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    return {
      isShowDayOfWeek,
      dayOfWeek,
      dateBackground,
      dateFont,
      date,
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
}
</style>
