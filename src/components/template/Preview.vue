<template>
  <div class="preveiw">
    <div id="preview" class="preveiw-overall" :style="style">
      <box-item
        v-for="(item, index) in schedules"
        :key="index"
        :index="index"
        :schedules="item"
        class="preveiw-item"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import BoxItem from "@/components/organisms/previewBoxSchedule.vue";

export default defineComponent({
  name: "Preview",
  components: {
    BoxItem,
  },
  setup() {
    const store = useStore();

    const schedules = computed(() => store.state.Schedule.schedules);

    const style = computed(() => {
      const overall = store.state.Overall;
      const border = store.state.Overall.background.border;
      return {
        width: overall.width + "px",
        background: overall.background.color,
        border: border.isShow
          ? `${border.thickness}px solid ${border.color}`
          : 0,
        "border-radius": border.radius.isRound
          ? `${border.radius.radius}px`
          : 0,
      };
    });

    return {
      schedules,
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
.preveiw {
  padding: 10px 60px;
  overflow-y: scroll;
  box-sizing: border-box;
  &-overall {
    padding: 20px 50px;
    box-sizing: border-box;
    overflow: hidden;
  }
  &-item {
    & + & {
      margin-top: 50px;
    }
  }
}
</style>
