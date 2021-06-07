<template>
  <div class="preview-box-schedule" :class="listStyle">
    <div class="preview-box-schedule_item --date">
      <preview-list-item
        class="preview-box-schedule_item-box"
        display="date"
        :text="date"
        :background="dateBackground"
        :font="dateFont"
      />
      <preview-list-item
        v-show="isShowDayOfWeek"
        class="preview-box-schedule_item-box --dayOfWeek"
        display="dayOfWeek"
        :text="dayOfWeek"
        :background="dateBackground"
        :font="dateFont"
      />
    </div>
    <div class="preview-box-schedule_schedules">
      <div
        v-for="(item, index) in schedules"
        :key="index"
        class="preview-box-schedule_schedule"
      >
        <preview-simple-list-item
          class="preview-box-schedule_schedule-text"
          :text="item.text"
          :background="item.background"
          :font="item.font"
        />
        <preview-simple-list-item
          v-show="item.isShowTime"
          class="preview-box-schedule_schedule-time"
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
import previewListItem from "@/components/molecules/previewListItem.vue";

interface Props {
  index: number;
  schedules: Schedule[];
}

export default defineComponent({
  name: "Text",
  components: {
    previewSimpleListItem,
    previewListItem,
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

    const listStyle = computed(() =>
      props.index % 2 === 0 ? "preview-box-schedule_background-gray" : ""
    );

    return {
      isShowDayOfWeek,
      dayOfWeek,
      dateBackground,
      dateFont,
      date,
      listStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.--flex {
  display: flex;
  justify-content: flex-start;
}
.preview-box-schedule {
  padding: 15px 10px;
  display: flex;
  &_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & + & {
      margin-left: 25px;
    }
    & > * + * {
      margin-top: 10px;
    }
    &-box {
      &.--dayOfWeek {
        margin-top: -25%;
      }
      &.--time {
        margin-left: 30px;
      }
    }
  }
  &_background-gray {
    background: $color-right-gray-transparent;
  }
  &_schedules {
    width: 100%;
    margin-left: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &_schedule {
    display: flex;
    justify-content: space-between;
    &-text {
      width: 80%;
    }
    &-time {
      width: 20%;
    }
    & + & {
      margin-top: 10px;
    }
  }
}
</style>
