import {defineStore} from 'pinia';
import {ref, Ref, computed} from "vue";
import {useDataClient} from "../api/dataApi"
import { City } from '@/types/dataTypes/iCity';
import { Student } from '@/types/dataTypes/iStudent';
import { SortOptions } from '@/types/sortOptions/iSort';

const DataClient = useDataClient();


export const useStudentsStore = defineStore('studentsStore', () => {

    const students: Ref<Student[]> = ref([]);
    const cities: Ref<City[]> = ref([]);
    const studName = ref<string>('');
    const sortName = ref<string>('');
    const sortAscer = ref<boolean>(true);
  
    const allCities = computed(() => cities.value);
    const allStudents = computed(() => students.value);
    const sortedProperty = computed(() => sortName.value);
    const sortAsc = computed(() => sortAscer.value);
  
    const addStudent = async (studentData:any) => {
      await DataClient.postStudent(studentData);
      await refreshStudents();
    }
  
    const addCity = async (city:City) => {
      await DataClient.postCity(city);
      await refreshStudents();
    }
  
    const refreshStudents = async () => {
      const studentsData = await DataClient.getAllData();
      setStudents(studentsData);
      refreshCities();
      return studentsData;
    }
  
    const refreshCities = async () => {
      const citiesData = await DataClient.getAllCities();
      setCities(citiesData);
      return citiesData;
    }
  
    const deleteStudent = async (ID:number) => {
      await DataClient.deleteStudent(ID);
      refreshStudents();
    }
  
    const deleteCity = async (ID:number) => {
      await DataClient.deleteCity(ID);
      refreshCities();
    }
  
    const updateStudent = async (studentData:any) => {
      await DataClient.updateStudentData(studentData);
    }
  
    const updateCity = async (city:City) => {
      await DataClient.updateCityData(city);
    }

    const sortStudents = async (sortOpt: SortOptions) => {    //можно упростить
      sortName.value = sortOpt.name;
      sortAscer.value = sortOpt.asc;
      const studentsData = await DataClient.getAllData('', sortName.value, sortAscer.value);
      setStudents(studentsData);
    }
    
    const filterStudents = async (nameFilt:string) => {
      studName.value = nameFilt;
      const filter = studName.value;
      const sortBy = sortedProperty.value;
      const sortAsc = sortAscer.value;
      const studentsData = await DataClient.getAllData(filter, sortBy, sortAsc);
      setStudents(studentsData);
    }
  
    const setStudents = (studentsData:any) => {
      students.value = studentsData;
    }
  
    const setCities = (citiesData:any) => {
      cities.value = citiesData;
    }
  
    return {
      students,
      cities,
      studName,
      sortName,
      sortAscer,
      allCities,
      allStudents,
      sortedProperty,
      sortAsc,
      addStudent,
      addCity,
      refreshStudents,
      refreshCities,
      deleteStudent,
      deleteCity,
      updateStudent,
      updateCity,
      sortStudents,
      filterStudents,
    };
})