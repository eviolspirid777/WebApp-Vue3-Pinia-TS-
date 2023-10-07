<template>
  <div>
    <div class="d-flex flex-row">
      <button
        id="show-modal"
        type="button"
        class="btn-own-cls"
        @click="studentFormSwitcher()"
      >
        Добавить студента
      </button>
      <ModalForm
        v-if="showModal"
        @close="studentFormSwitcher()"
      />
      <input
        v-model="nameFilter"
        style="margin-left: 10px;"
        class="form-control-m-2"
        placeholder="Фильтр"
        @input="debouncedFilter()"
      >
    </div>
    <TableForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import _ from 'lodash';
import ModalForm from '@/components/ModalForm.vue';
import TableForm from '@/components/StudentTable.vue';
import { useStudentsStore } from "../stores/studentsStore"

export default defineComponent({
  components: {
    TableForm,
    ModalForm,
  },
  setup() {
    var studentsStore = useStudentsStore();
    const nameFilter = ref('');
    const showModal = ref(false);

    const getAllStudents = computed(() => {
      return studentsStore.students;
    });

    const debouncedFilter = _.debounce(() => {
      studentsStore.filterStudents(nameFilter.value);
    }, 500);

    const studentFormSwitcher = () => {
      showModal.value = !showModal.value;
    }

    onMounted(() => {
      getAllStudents;
    });

    return {
      nameFilter,
      showModal,
      getAllStudents,
      debouncedFilter,
      studentsStore,
      studentFormSwitcher
    };
  },
});
</script>

<style>

.form-control-m-2{
  width:100px;
  padding-left: 20px;
}

.modal-mask{
  border-style: groove;
  border-color: 15,83,252;
}

.btn-own-cls{
  border-radius: 4px;
  border-color: rgba(15, 83, 252);
  transition: background-color 0.3s ease;
  color: rgba(15, 83, 252);
  height: 40px;
  background-color: white;
}

.btn-own-cls:hover {
  background-color: rgba(15, 83, 252, 1);
  cursor: pointer;
  color: white;
  box-shadow: 2px 3px 8px #007bff;
}

.form-control-m-2{
  margin-left: 10px;
  width: 100px;
  border-radius: 4px;
  border: 2px solid rgba(15, 83, 252);
  height: 40px;
  background-color: white;
}
</style>