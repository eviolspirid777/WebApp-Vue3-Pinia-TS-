<template>
  <div class="student-box">
    <h3 class="tag-header">
      Информация о студенте
    </h3>
    <hr>
    <!-- <p>
      <label>Фамилия: {{ studentData?.surname }}</label>
    </p>
    <p>
      <label>Имя: {{ studentData?.name }}</label>
    </p>
    <p>
      <label>Отчество: {{ studentData?.patron }}</label>
    </p>
    <p>
      <label>Факультет: {{ studentData?.faculty }}</label>
    </p>
    <p>
      <label>Специальность: {{ studentData?.specialty }}</label>
    </p>
    <p>
      <label>Курс: {{ studentData?.course }}</label>
    </p>
    <p>
      <label>Группа: {{ studentData?.group }}</label>
    </p>
    <p>
      <label>Город: {{ studentData?.city?.country }}</label>
    </p>
    <p>
      <label>Почтовый индекс: {{ studentData?.postalCode }}</label>
    </p>
    <p>
      <label>Улица: {{ studentData?.street }}</label>
    </p>
    <p>
      <label>Телефон: {{ studentData?.phone }}</label>
    </p>
    <p>
      <label>Почта: {{ studentData?.email }}</label>
    </p> -->
    <div>
      <p v-for="(value, key) in studentData" :key="key">
        <label v-if="key === 'city'">city: {{ value?.country }}</label>
        <label v-else>{{ key }}: {{ value }}</label>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, PropType } from 'vue';
import { useStudentsStore } from '@/stores/studentsStore';
import { useRoute } from 'vue-router';
import { Student } from '@/types/dataTypes/iStudent';


export default defineComponent({
  name: 'StudentInfo',
  setup() {
    const store = useStudentsStore();
    const route = useRoute();
    const allStudents = computed(() => store.students);

    const studentData =  computed(() => {
      const id = route.params.studentId;
      const selectedStudent: Student | undefined =  allStudents.value.find(student => typeof id === 'string' && student.id?.toString() === id);
      console.log(selectedStudent);
      return selectedStudent;
    });

    onMounted(async () => {
      await store.refreshStudents();
    });

    return {
      allStudents,
      studentData
    };
  },
});
</script>

<style scoped lang="scss">
.student-box{
  border: 2px solid rgba(15, 83, 252);
  border-radius: 20px;
  width: 600px;
  align-items: center;
  transition: box-shadow 0.6s ease-in-out;
  box-shadow: 4px 3px 25px 1px rgba(15, 83, 252, 0.2);

  &:hover{
    box-shadow: 4px 3px 25px 1px rgba(15, 83, 252, 0.8);
  }

  & p{
    align-items: center;
    padding-left: 40px;
  }

  & p > label{
    font-size: large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    &:hover{
      transition: color 0.4s ease-in-out, text-shadow 0.2s ease-in-out;
      color: rgba(15, 83, 252, 1);
      text-shadow: 1px 1px 1px rgb(42, 100, 245);
      cursor: pointer;
    }
  }
}
hr{
  height: 2px;
  color:rgba(15, 82, 252, 0.849);
}
.tag-header{
  padding-bottom: 10px;
  font-size: 30px;
  padding-top: 10px;
  margin-left: 22%;
  color: rgb(221, 221, 255);
  text-shadow: 1px 1px 5px rgba(15, 83, 252, 1), 1px 1px 10px rgb(19, 38, 87);
}
</style>