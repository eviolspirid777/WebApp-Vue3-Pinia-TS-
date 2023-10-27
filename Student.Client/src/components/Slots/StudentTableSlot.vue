<template>
  <div class="d-flex">
    <!-- <button
      type="button"
      class="btn-b-0-20"
      @click="sendInformation()"
    >
      <i class="fa-solid fa-info" />
    </button>
    <button
      type="button"
      class="btn-b-0-20"
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
    </button> -->
    <OwnButton
      :class="`btn-b-0-20`"
      :icon-class="`fa-solid fa-info`"
      :dfn="true"
      @send-data="sendInformation()"
    />
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
import {PropType } from 'vue'
import {Student} from '@/types/dataTypes/Student'
import { City } from '@/types/dataTypes/City';
import OwnButton from '../inputs/OwnButton.vue';

const emit = defineEmits(["clickData","delete","sendData"])
const props = defineProps({
    dataId: {
        type: Number as PropType<number>
    },
    data: {
        type: Object as PropType<Student | City>
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
const sendInformation = () => {
    emit("sendData", props.data);
};
</script>
<style lang="scss" scope>
.btn-b-0-20:hover{
    border: 2px solid rgba(15, 83, 252);
}
</style>