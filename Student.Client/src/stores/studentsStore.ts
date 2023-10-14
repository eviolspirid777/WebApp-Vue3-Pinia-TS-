import {defineStore} from 'pinia';
import {ref, Ref} from "vue";
import {useStudentsClient} from "../api/studentsAPI"
import { useCitiesStore } from './citiesStore';
import { Student } from '@/types/dataTypes/iStudent';
import { SortOptions } from '@/types/sortOptions/iSort';

const DataClient = useStudentsClient();

export const useStudentsStore = defineStore('studentsStore', () => {
    const students: Ref<Student[]> = ref([]);
    const studName = ref<string>('');
    const sortName = ref<string>('');
    const sortAscer = ref<boolean>(true);

    const addStudent = async (studentData:Student) => {
        await DataClient.postStudent(studentData);
        await fetchStudents();
    }

    const fetchStudents = async () => {
        const studentsData = await DataClient.getAllData();
        useCitiesStore().fetchCities;
        setStudents(studentsData);
    }

    const deleteStudent = async (ID:number) => {
        await DataClient.deleteStudent(ID);
        fetchStudents();
    }

    const updateStudent = async (studentData:Student) => {
        await DataClient.updateStudentData(studentData);
    }

    const sortStudents = async (sortOpt: SortOptions) => {
        sortName.value = sortOpt.name;
        sortAscer.value = sortOpt.asc;
        const studentsData = await DataClient.getAllData('', sortName.value, sortAscer.value);
        setStudents(studentsData);
    }
      
    const filterStudents = async (nameFilt:string) => {
        studName.value = nameFilt;
        const filter = studName.value;
        const sortBy = sortName.value;
        const sortAsc = sortAscer.value;
        const studentsData = await DataClient.getAllData(filter, sortBy, sortAsc);
        setStudents(studentsData);
    }
    
    const setStudents = (studentsData:Student[]) => {
        students.value = studentsData;
    }
    return {
        students,
        studName,
        sortName,
        sortAscer,
        addStudent,
        fetchStudents,
        deleteStudent,
        updateStudent,
        sortStudents,
        filterStudents,
        setStudents
    }
})