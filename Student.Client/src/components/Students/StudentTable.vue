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
    <StudentForm
      v-if="showModal"
      :current-student="selectedStudent"
      @close="closeModalWindow"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import MainTable from '@/components/MainTable.vue';
import StudentForm from '@/components/Students/StudentForm.vue';
import { useStudentsStore } from '@/stores/studentsStore';
import { useRouter } from 'vue-router';
import { Student } from '@/types/dataTypes/Student';

export default defineComponent({
  components: {
    MainTable,
    StudentForm,
  },
  setup() {
    const studentsStore = useStudentsStore();
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
      return studentsStore.students;
    });

    const refreshData = async () => {
      await studentsStore.fetchStudents();
    };

    const editStudent = (student: Student) => {
      selectedStudent.value = student;
      showModal.value = true;
      refreshData();
    };

    const closeModalWindow = () => {
      showModal.value = false;
    };

    const sortData = (name: string, asc: boolean) => {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      studentsStore.sortStudents({ name: name, asc: asc });
    };

    const openInformation = (student: Student) => {
      router.push({ name: 'StudentInfo', params: { studentId: student.id } });
    };

    const deleteStudent = (id: number) => {
      studentsStore.deleteStudent(id);
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
</script>@/types/dataTypes/Student