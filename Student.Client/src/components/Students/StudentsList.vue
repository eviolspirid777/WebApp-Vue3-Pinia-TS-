<template>
  <div>
    <div class="d-flex flex-row">
      <OwnButton
        :data="`Добавить студента`"
        @sendData="studentFormSwitcher()"
      />
      <StudentForm
        v-if="showModal"
        @close="studentFormSwitcher()"
      />
      <input
        v-model="nameFilter"
        class="form-control-m-2"
        placeholder="Фильтр"
        @input="debouncedFilter()"
      >
    </div>
    <TableForm />
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import StudentForm from "@/components/Students/StudentForm.vue";
import TableForm from "@/components/Students/StudentTable.vue";
import { computed, onMounted, ref } from "vue";
import { useStudentsStore } from "@/stores/studentsStore";
import OwnButton from "../inputs/OwnButton.vue";

let studentsStore = useStudentsStore();
const nameFilter = ref("");
const showModal = ref(false);

const getAllStudents = computed(() => {
  return studentsStore.students;
});

const debouncedFilter = _.debounce(() => {
  studentsStore.filterStudents(nameFilter.value);
}, 500);

const studentFormSwitcher = () => {
  showModal.value = !showModal.value;
};

onMounted(() => {
  getAllStudents;
});
</script>

<style scoped lang="scss">
.btn-own-cls{
  border-radius: 4px;
  border-color: rgba(15, 83, 252);
  transition: background-color 0.3s ease;
  color: rgba(15, 83, 252);
  height: 40px;
  background-color: white;

  &:hover{
    background-color: rgba(15, 83, 252, 1);
    cursor: pointer;
    color: white;
    box-shadow: 2px 3px 8px #007bff;
  }
}
.form-control-m-2{
  margin-left: 10px;
  width: 100px;
  border-radius: 4px;
  border: 2px solid rgba(15, 83, 252);
  height: 40px;
  background-color: white;
}
input{
  margin-left: 10px;
}
</style>