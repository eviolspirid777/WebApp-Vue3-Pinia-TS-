import { createRouter, createWebHashHistory } from 'vue-router'
import Cities from '@/components/Cities/CitiesList.vue';
import StudentsComponent from '@/components/Students/StudentsList.vue';
import StudentInfo from '@/components/Students/ReadStudentInfo.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { name: "Home", path: "/", redirect: "Student" },
    { name: "Student", path: "/Student", component: StudentsComponent },
    { name: "Cities", path: "/Cities", component: Cities },
    { name: "StudentInfo", path: "/StudentInfo/:studentId", component: StudentInfo }
  ]
})

export default router