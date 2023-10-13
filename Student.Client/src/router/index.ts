import { createRouter, createWebHashHistory } from 'vue-router'
import Cities from '@/components/CitiesComponent.vue';
import StudentsComponent from '@/components/StudentsComponent.vue';
import StudentInfo from '@/components/ReadStudentInfo.vue';

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