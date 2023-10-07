<template>
  <div>
    <MainTable       
      :columns="tableFields"
      :rows="formattedStudents"
      @clickData="editStudent"
      @sort="sortData"
      @refresh="refreshData"
      @sendData="openInformation"
      @delete="deleteStudent" 
    />
    <ModalForm
      v-if="showModal"
      :current-student="selectedStudent"
      @close="closeModalWindow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import MainTable from '@/components/MainTable.vue';
import ModalForm from '@/components/ModalForm.vue';
import { useStudentsStore } from '@/stores/studentsStore';
import { useRouter } from 'vue-router';
import { Student } from '@/types/dataTypes/iStudent';

export default defineComponent({
  components: {
    MainTable,
    ModalForm,
  },
  setup() {
    const store = useStudentsStore();
    const router = useRouter();
    const showModal = ref <boolean>(false);
    const selectedStudent = ref <Student>({
      id: 0,
      name: "",
      surname: "",
      patron: "",
      faculty: "",
      specialty: "",
      course: "",
      group: "",
      city: { id: 0, country: "" },
      postalCode: "",
      street: "",
      phone: "",
      email: ""
    });
    const nameFilter = ref<string>('');
    const tableFields = [
      { key: 'id', label: 'id' },
      { key: 'surname', label: 'Фамилия' },
      { key: 'name', label: 'Имя' },
      { key: 'patron', label: 'Отчество' },
      { key: 'faculty', label: 'Факультет' },
      { key: 'specialty', label: 'Специальность' },
      { key: 'course', label: 'Курс' },
      { key: 'group', label: 'Группа' },
      { key: 'city', label: 'Город' },
      { key: 'postalCode', label: 'Почтовый индекс' },
      { key: 'street', label: 'Улица' },
      { key: 'phone', label: 'Телефон' },
      { key: 'email', label: 'Почта' },
    ];

    const formattedStudents = computed(() => {
      return store.students.map((student: Student) => ({
        ...student,
        city: student.city?.country ?? undefined,
      }));
    });

    const refreshData = async () => {
      await store.refreshStudents();
    };

    const editStudent = (student: Student) => {
      selectedStudent.value = student;
      showModal.value = true;
      refreshData();
    };

    const closeModalWindow = () => {
      selectedStudent.value = {
      id: 0,
      name: "",
      surname: "",
      patron: "",
      faculty: "",
      specialty: "",
      course: "",
      group: "",
      city: { id: 0, country: "" },
      postalCode: "",
      street: "",
      phone: "",
      email: ""
    };
      showModal.value = false;
    };

    const sortData = (name: string, asc: boolean) => {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      store.sortStudents({ name: name, asc: asc });
    };

    const openInformation = (student: Student) => {
      router.push({ name: 'StudentInfo', params: { studentId: student.id } });
    };

    const deleteStudent = (id: number) => {
      store.deleteStudent(id);
    };

    onMounted(async () => {
      await refreshData();
    });

    return {
      formattedStudents,
      showModal,
      selectedStudent,
      nameFilter,
      tableFields,
      refreshData,
      editStudent,
      closeModalWindow,
      sortData,
      openInformation,
      deleteStudent
    };
  },
});
</script>