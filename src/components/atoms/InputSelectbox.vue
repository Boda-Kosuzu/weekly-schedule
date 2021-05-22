<template>
  <div class="input-selectbox">
    <p>{{ text }}</p>
    <select v-model="value">
      <option v-for="(item, key) in itemList" :key="key" :value="key">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from "vue";

type Props = {
  text: string;
  itemList: { key: string };
  selected: string;
};

export default defineComponent({
  name: "Input-Selectbox",
  props: {
    text: {
      type: String,
      required: true,
    },
    itemList: {
      type: Object as PropType<{ key: string }>,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const value = computed({
      get: () => props.selected,
      set: (value) => {
        context.emit("update:selected", value);
      },
    });

    return {
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-selectbox {
  & > p {
    user-select: none;
    font-size: 1.2rem;
  }
  & > select {
    width: 100px;
    font-size: 1.2rem;
  }
}
</style>
