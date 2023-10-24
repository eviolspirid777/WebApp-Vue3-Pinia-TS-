<template>
  <div class="d-flex">
    <button
      type="button"
      class="btn-b-0-20"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="editData()"
    >
      <i class="far fa-edit" />
    </button>
    <button
      type="button"
      class="btn-b-0-20"
      @click="deleteData()"
    >
      <i class="fa-solid fa-trash" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { City } from '@/types/dataTypes/City'
import { Student } from '@/types/dataTypes/Student';

const emit = defineEmits(["clickData","delete"])
const props = defineProps({
    dataId: {
        type: Number as PropType<number>
    },
    data: {
        type: Object as PropType<City | Student>
    }
})
const editData = () => {
    emit("clickData", props.data);
};

const deleteData = () => {
    if (!confirm("Вы уверены?")) {
        return;
    }
        emit("delete", props.dataId);
};
</script>
<style lang="scss">
.btn-b-0-20:hover{
    border: 2px solid rgba(15, 83, 252);
}
</style>