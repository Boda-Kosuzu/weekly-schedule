<template>
  <div>
    <h2
      class="weekly-schedule-h2 -open"
      :class="{ '-hide': !state.isOpen }"
      @click="accordion"
    >
      {{ index + 1 }}
      <p class="input-schedule_delete-button" @click.stop="deleteSchedule">×</p>
    </h2>
    <transition name="accordion-item">
      <div v-show="state.isOpen" class="input-schedule_body">
        <ul class="input-list">
          <li>
            <input-text label="予定" v-model:text="text" />
          </li>
          <li>
            <input-checkbox
              text="開始時刻を表示する"
              v-model:checked="isShowTime"
            />
          </li>
          <transition name="accordion-item">
            <li v-show="isShowTime" class="accordion-item">
              <input-time v-model:time="time" />
            </li>
          </transition>
        </ul>

        <h3
          v-if="isShowBackground"
          class="weekly-schedule-h3 -open"
          :class="{ '-hide': !state.isOpenBackground }"
          @click="accordionBackground"
        >
          背景設定
        </h3>
        <transition name="accordion-item">
          <ul
            v-if="isShowBackground"
            v-show="state.isOpenBackground"
            class="input-list input-schedule_background"
          >
            <li>
              <input-color text="背景色" v-model:color="backgroundColor" />
            </li>
            <li>
              <input-checkbox
                text="枠線を表示する"
                v-model:checked="borderIsShow"
              />
            </li>
            <transition name="accordion-item">
              <li v-show="borderIsShow" class="accordion-item">
                <input-pixel
                  text="枠線の太さ"
                  v-model:pixel="borderThickness"
                />
              </li>
            </transition>
            <transition name="accordion-item">
              <li v-show="borderIsShow" class="accordion-item">
                <input-color text="枠線の色" v-model:color="borderColor" />
              </li>
            </transition>
          </ul>
        </transition>
        <h3
          class="weekly-schedule-h3 -open"
          :class="{ '-hide': !state.isOpenFont }"
          @click="accordionFont"
        >
          文字設定
        </h3>
        <transition name="accordion-item">
          <ul v-show="state.isOpenFont" class="input-list input-schedule_font">
            <li>
              <input-color text="文字色" v-model:color="fontColor" />
            </li>
            <li>
              <input-font v-model:font="fontFamily" />
            </li>
            <li>
              <input-pixel text="文字サイズ" v-model:pixel="fontSize" />
            </li>
            <li>
              <input-checkbox text="太字" v-model:checked="isBold" />
            </li>
            <li>
              <input-checkbox
                text="縁取りを表示する"
                v-model:checked="fontBorderIsShow"
              />
            </li>
            <transition name="accordion-item">
              <li v-show="fontBorderIsShow" class="accordion-item">
                <input-pixel
                  text="縁取りの太さ"
                  v-model:pixel="fontBorderThickness"
                />
              </li>
            </transition>
            <transition name="accordion-item">
              <li v-show="fontBorderIsShow" class="accordion-item">
                <input-color
                  text="縁取りの色"
                  v-model:color="fontBorderColor"
                />
              </li>
            </transition>
          </ul>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  SetupContext,
  reactive,
  PropType,
} from "vue";
import { Schedule } from "@/classes/schedules";
import InputColor from "@/components/atoms/InputColor.vue";
import inputCheckbox from "@/components/atoms/InputCheckbox.vue";
import InputPixel from "@/components/atoms/InputPixel.vue";
import InputFont from "@/components/atoms/InputFont.vue";
import InputText from "@/components/atoms/InputText.vue";
import InputTime from "@/components/atoms/InputTime.vue";

type Props = {
  index: number;
  schedule: Schedule;
  isShowBackground: boolean;
};

export default defineComponent({
  name: "input-schedule",
  props: {
    index: {
      type: Number,
      required: true,
    },
    schedule: {
      type: Object as PropType<Schedule>,
      required: true,
    },
    isShowBackground: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    InputColor,
    inputCheckbox,
    InputPixel,
    InputFont,
    InputText,
    InputTime,
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({
      isOpen: true,
      isOpenBackground: true,
      isOpenFont: true,
    });
    const accordion = () => (state.isOpen = !state.isOpen);
    const accordionBackground = () =>
      (state.isOpenBackground = !state.isOpenBackground);
    const accordionFont = () => (state.isOpenFont = !state.isOpenFont);

    const text = computed({
      get: () => props.schedule.text,
      set: (text: string) =>
        context.emit("updateText", { index: props.index, text }),
    });
    const time = computed({
      get: () => props.schedule.time,
      set: (time: Date) => {
        context.emit("updateTime", { index: props.index, time });
      },
    });
    const isShowTime = computed({
      get: () => props.schedule.isShowTime,
      set: (isShowTime: boolean) => {
        context.emit("updateIsShowTime", { index: props.index, isShowTime });
      },
    });
    const backgroundColor = computed({
      get: () => props.schedule.background.color,
      set: (color: string) => {
        context.emit("updateBackground", {
          index: props.index,
          background: { color },
        });
      },
    });
    const borderIsShow = computed({
      get: () => props.schedule.background.border.isShow,
      set: (isShow: boolean) =>
        context.emit("updateBackground", {
          index: props.index,
          background: {
            border: {
              ...props.schedule.background.border,
              isShow,
            },
          },
        }),
    });
    const borderThickness = computed({
      get: () => props.schedule.background.border.thickness,
      set: (thickness: number) =>
        context.emit("updateBackground", {
          index: props.index,
          background: {
            border: {
              ...props.schedule.background.border,
              thickness,
            },
          },
        }),
    });
    const borderColor = computed({
      get: () => props.schedule.background.border.color,
      set: (color: string) =>
        context.emit("updateBackground", {
          index: props.index,
          background: {
            border: {
              ...props.schedule.background.border,
              color,
            },
          },
        }),
    });
    const fontColor = computed({
      get: () => props.schedule.font.color,
      set: (color: string) =>
        context.emit("updateFont", {
          index: props.index,
          font: { color },
        }),
    });
    const fontFamily = computed({
      get: () => props.schedule.font.font,
      set: (font: string) =>
        context.emit("updateFont", { index: props.index, font: { font } }),
    });
    const fontSize = computed({
      get: () => props.schedule.font.fontSize,
      set: (fontSize: number) =>
        context.emit("updateFont", { index: props.index, font: { fontSize } }),
    });
    const isBold = computed({
      get: () => props.schedule.font.isBold,
      set: (isBold: boolean) =>
        context.emit("updateFont", { index: props.index, font: { isBold } }),
    });
    const fontBorderIsShow = computed({
      get: () => props.schedule.font.border.isShow,
      set: (isShow: boolean) =>
        context.emit("updateFont", {
          index: props.index,
          font: {
            border: {
              ...props.schedule.font.border,
              isShow,
            },
          },
        }),
    });
    const fontBorderThickness = computed({
      get: () => props.schedule.font.border.thickness,
      set: (thickness: number) =>
        context.emit("updateFont", {
          index: props.index,
          font: {
            border: {
              ...props.schedule.font.border,
              thickness,
            },
          },
        }),
    });
    const fontBorderColor = computed({
      get: () => props.schedule.font.border.color,
      set: (color: string) =>
        context.emit("updateFont", {
          index: props.index,
          font: {
            border: {
              ...props.schedule.font.border,
              color,
            },
          },
        }),
    });

    const deleteSchedule = () => context.emit("deleteSchedule", props.index);

    return {
      state,
      accordion,
      accordionBackground,
      accordionFont,
      text,
      time,
      isShowTime,
      backgroundColor,
      borderIsShow,
      borderThickness,
      borderColor,
      fontColor,
      fontFamily,
      fontSize,
      isBold,
      fontBorderIsShow,
      fontBorderThickness,
      fontBorderColor,
      deleteSchedule,
    };
  },
});
</script>

<style lang="scss" scoped>
.weekly-schedule-h2 {
  position: relative;
}
.input-schedule {
  &_body {
    max-height: 877px;
    overflow: hidden;
  }
  &_delete-button {
    position: absolute;
    right: 0;
    color: $color-red;
  }
  &_background {
    max-height: 236px;
    overflow: hidden;
  }
  &_font {
    max-height: 398px;
    overflow: hidden;
  }
}
.accordion-item {
  max-height: 60px;
  overflow: hidden;
}
</style>
