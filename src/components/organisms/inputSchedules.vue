<template>
  <div>
    <h1
      class="weekly-schedule-h1"
      :class="{ '-hide': !data.isShowBody }"
      @click="operationAccordion"
    >
      {{ dayOfWeek }}
    </h1>
    <transition name="accordion-item">
      <div
        class="input-schedules_input-area"
        v-show="data.isShowBody"
        :style="style"
      >
        <transition-group name="list-complete">
          <input-shcedule
            v-for="(item, index) in schedules"
            :key="index"
            :index="index"
            :schedule="item"
            :isShowBackground="isShowBackground"
            class="list-complete-item"
            @updateText="updateText"
            @updateTime="updateTime"
            @updateIsShowTime="updateIsShowTime"
            @updateBackground="updateBackground"
            @updateFont="updateFont"
            @deleteSchedule="deleteSchedule"
          />
        </transition-group>
        <button class="input-schedules_add-button" @click="addSchedule">
          +
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed } from "vue";
import { useStore } from "vuex";
import { Schedule } from "@/classes/schedules";
import inputShcedule from "@/components/molecules/inputSchedule.vue";
import { Background } from "@/classes/background";
import { Font } from "@/classes/font";

interface Props {
  date: number;
  schedules: Array<Schedule>;
}

export default defineComponent({
  name: "Input_Overall",
  components: {
    inputShcedule,
  },
  props: {
    date: {
      type: Number,
      required: true,
    },
    schedules: {
      type: Array as PropType<Array<Schedule>>,
      required: true,
    },
  },
  setup(props: Props) {
    const store = useStore();

    const data = reactive({
      isShowBody: false,
    });

    const operationAccordion = () => (data.isShowBody = !data.isShowBody);

    const updateText = ({ index, text }: { index: number; text: string }) => {
      store.dispatch("updateScheduleText", {
        date: props.date,
        index,
        text,
      });
    };

    const updateTime = ({ index, time }: { index: number; time: Date }) => {
      store.dispatch("updateScheduleTime", {
        date: props.date,
        index,
        time,
      });
    };

    const updateIsShowTime = ({
      index,
      isShowTime,
    }: {
      index: number;
      isShowTime: boolean;
    }) => {
      store.dispatch("updateIsShowTime", {
        date: props.date,
        index,
        isShowTime,
      });
    };

    const updateBackground = ({
      index,
      background,
    }: {
      index: number;
      background: Background;
    }) => {
      store.dispatch("updateScheduleBackground", {
        date: props.date,
        index: index,
        background: background,
      });
    };

    const updateFont = ({ index, font }: { index: number; font: Font }) =>
      store.dispatch("updateScheduleFont", {
        date: props.date,
        index,
        font,
      });

    const addSchedule = () => store.dispatch("addSchedule", props.date);

    const deleteSchedule = (index: number) =>
      store.dispatch("deleteSchedule", { date: props.date, index });

    const dayOfWeek = computed(() => {
      let dayOfWeek = "";
      switch (props.date + store.state.Overall.isStartMonday) {
        case 0:
        case 7:
          dayOfWeek = "日曜日";
          break;
        case 1:
          dayOfWeek = "月曜日";
          break;
        case 2:
          dayOfWeek = "火曜日";
          break;
        case 3:
          dayOfWeek = "水曜日";
          break;
        case 4:
          dayOfWeek = "木曜日";
          break;
        case 5:
          dayOfWeek = "金曜日";
          break;
        case 6:
          dayOfWeek = "土曜日";
          break;
        default:
          dayOfWeek = "";
          break;
      }
      return dayOfWeek;
    });

    const isShowBackground = computed(
      () =>
        store.state.Overall.desigin !== "list_1" &&
        store.state.Overall.desigin !== "list_2" &&
        store.state.Overall.desigin !== "neumorphism"
    );

    const style = computed(() => {
      return { "max-height": props.schedules.length * 933 + "px" };
    });

    return {
      data,
      operationAccordion,
      updateText,
      updateTime,
      updateIsShowTime,
      updateBackground,
      updateFont,
      addSchedule,
      deleteSchedule,
      dayOfWeek,
      style,
      isShowBackground,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-schedules {
  &_input-area {
    overflow: hidden;
    & > h2 {
      margin-top: 15px;
    }
  }
  &_date-item {
    max-height: 664px;
    overflow: hidden;
  }
  &_add-button {
    margin-bottom: 15px;
    border: 1px solid $color-white;
    width: 100%;
    height: 50px;
    color: $color-white;
    font-size: 2rem;
    font-weight: bold;
    background: $color-blue;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    &:active {
      background: $color-gray;
      opacity: 0.5;
    }
  }
}
.list-complete {
  &-item {
    transition: all 0.8s ease;
    max-height: 933px;
    overflow: hidden;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    max-height: 0 !important;
  }
}
</style>
