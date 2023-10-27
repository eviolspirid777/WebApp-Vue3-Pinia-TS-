<template>
  <div class="d-flex">
    <OwnButton
      :class="`btn-b-0-20`"
      :icon-class="`far fa-edit`"
      :dfn="true"
      @send-data="editData()"
    />
    <OwnButton
      :class="`btn-b-0-20`"
      :icon-class="`fa-solid fa-trash`"
      :dfn="true"
      @send-data="deleteData()"
    />
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { City } from '@/types/dataTypes/City'
import { Student } from '@/types/dataTypes/Student';
import OwnButton from '../inputs/OwnButton.vue';

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