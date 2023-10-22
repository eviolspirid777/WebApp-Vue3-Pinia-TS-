<template>
    <div class="d-flex">
        <button
        type="button"
        class="btn-b-0-20"
        @click="sendInformation()"
        >
        <i class="fa-solid fa-info" />
        </button>
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
import {PropType, defineProps, defineEmits } from 'vue'
import {Student} from '@/types/dataTypes/Student'
import { City } from '@/types/dataTypes/City';

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