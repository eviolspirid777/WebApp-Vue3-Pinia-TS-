import {defineStore} from 'pinia';
import {ref, Ref} from "vue";
import {useCitiesClient} from "../api/citiesAPI"
import { useStudentsStore } from './studentsStore';
import { City } from '@/types/dataTypes/City';

const DataClient = useCitiesClient();


export const useCitiesStore = defineStore('citiesStore', () => {
    const cities: Ref<City[]> = ref([]);

    const addCity = async (city:City & object) => {
        await DataClient.postCity(city);
        useStudentsStore().fetchStudents;
    }

    const fetchCities = async () => {
        const citiesData = await DataClient.getAllCities();
        setCities(citiesData);
    }

    const deleteCity = async (ID:number) => {
        await DataClient.deleteCity(ID);
        fetchCities();
    }

    const updateCity = async (city:City) => {
        await DataClient.updateCityData(city);
    }

    const setCities = (citiesData:City[]) => {
        cities.value = citiesData;
    }

    return {
        addCity,
        fetchCities,
        deleteCity,
        updateCity,
        setCities,
        cities
    }
})