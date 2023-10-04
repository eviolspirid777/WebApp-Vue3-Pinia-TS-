import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Cities from '@/components/CitiesComponent.vue';
import StudentsComponent from '@/components/StudentsComponent.vue';
import StudentInfo from '@/components/ReadStudentInfo.vue';

const routes: Array<RouteRecordRaw> = [
  { name: "Home", path: "/", redirect: "Student" },
  { name: "Student", path: "/Student", component: StudentsComponent },
  { name: "Cities", path: "/Cities", component: Cities },
  { name: "StudentInfo", path: "/StudentInfo/:studentId", component: StudentInfo }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router