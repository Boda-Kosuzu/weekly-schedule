<template>
  <div class="preview-box-schedule">
    <div class="preview-box-schedule_item --date">
      <preview-simple-list-item
        v-show="isShowDayOfWeek"
        class="preview-box-schedule_item-box"
        :text="dayOfWeek"
        :background="dateBackground"
        :font="dateFont"
      />
      <preview-simple-list-item
        class="preview-box-schedule_item-box"
        :text="date"
        :background="dateBackground"
        :font="dateFont"
      />
    </div>
    <div class="preview-box-schedule_schedules">
      <div
        v-for="(item, index) in schedules"
        :key="index"
        class="preview-box-schedule_schedule-item"
      >
        <preview-simple-list-item
          class="preview-box-schedule_schedule-title"
          :text="item.text"
          :background="item.background"
          :font="item.font"
        />
        <preview-simple-list-item
          v-show="item.isShowTime"
          class="preview-box-schedule_start-time"
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
import previewSimpleListItem from "@/components/molecules/previewSimpleListItem.vue";

interface Props {
  index: number;
  schedules: Schedule[];
}

export default defineComponent({
  name: "Text",
  components: {
    previewSimpleListItem,
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
    const dayOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

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
.preview-box-schedule {
  padding: 0 10px;
  display: flex;
  &_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > * + * {
      margin-top: 10px;
    }
    &.--date {
      min-width: 140px;
    }
  }
  & + & {
    margin-top: 15px;
    border-top: 3px solid $color-border;
    padding-top: 15px;
  }
  &_schedules {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 140px);
  }
  &_schedule-item {
    display: flex;
    justify-content: space-between;
    & + & {
      margin-top: 5px;
      border-top: 1px solid $color-border;
      padding-top: 8px;
    }
  }
  &_schedule-title {
    width: 80%;
  }
  &_start-time {
    width: 20%;
  }
}
</style>
