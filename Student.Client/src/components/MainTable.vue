<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="field in columnsFields"
            :key="field.key"
            @click="sortData(field.key)"
          >
            {{ field.label }}
            <span
              v-if="sortTitle === field.key"
              class="th-icon-container"
            >
              <i v-if="cont === 1">↓</i>
              <i v-else-if="cont === 2">↑</i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in rows" :key="data.id">
          <td v-for="field in columnsFields" :key="field.key">
            {{ field.key !== "city" ? getValueFromKey(data, field.key) : getValueFromKey(data, field.key).country }}
          </td>
          <td>
            <div class="d-flex">
              <slot name="buttons" :dataId="data.id" :data="data"></slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, computed, watch, defineEmits, defineProps } from 'vue';
import { Columns } from "@/types/columnsRows/columns";
import { Rows } from "@/types/columnsRows/rows";
import _ from "lodash";

const emit = defineEmits(["clickData", "delete", "sort", "refresh", "sendData"]);

const props = defineProps({
  columns: {
    type: Array as PropType<Columns[]>,
    default: () => []
  },
  rows: {
    type: Array as PropType<Rows[]>,
    default: () => []
  }
});

const cont = ref(0);
const sortTitle = ref("");
const cityCheck = ref(false);

const columnsFields = computed(() => {
  return _.cloneDeep(props.columns);
});

watch(
  () => props.columns,
  () => {
    cityCheck.value = props.columns.length >= 2;
  },
  { immediate: true }
);

const getValueFromKey = (value: string & number & object, key: string) => {
  return value[key];
};

const sortData = (title: string) => {
  if (sortTitle.value === title) {
    cont.value++;
  } else {
    sortTitle.value = title;
    cont.value = 1;
  }

  if (cont.value === 1) {
    emit("sort", sortTitle.value, true);
  } else if (cont.value === 2) {
    emit("sort", sortTitle.value, false);
  } else if (cont.value === 3) {
    emit("refresh");
    cont.value = 0;
    sortTitle.value = "";
  }
};
</script>

<style scoped lang="scss">
.btn-b-0-20:hover{
  border: 2px solid rgba(15, 83, 252);
}
th, .d-flex{
  white-space: nowrap;
  text-align: center;
  
  &:nth-child(n+1):hover{
    color: rgba(15, 83, 252);
    cursor: pointer;
  }
}

td{
  border: 1px solid black;
  align-content: center;
  align-items: center;
}
.th-icon-container {
  position: relative;
  & i{
    position: absolute;
  }
}
</style>