import axios from 'axios';
import {Student} from '@/types/dataTypes/iStudent'
import { City } from '@/types/dataTypes/iCity';

const API_URL = 'http://localhost:5000/api/student/';
const API_CITIES = 'http://localhost:5000/api/student/cities/';

export function useDataClient() {
  const getAllData = async (filter = '', sortByParam = '', sortAsc = true) => {
    const response = await axios.get(API_URL, {
      params: {
        sortByParam,
        sortAsc,
        filter,
      },
    });
    return response.data;
  };

  const getAllCities = async () => {
    const response = await axios.get(API_CITIES);
    return response.data;
  };

  const deleteStudent = async (ID:number) => {
    const response = await axios.delete(API_URL + ID);
    return response.data;
  };

  const deleteCity = async (ID:number) => {
    const response = await axios.delete(API_CITIES + ID);
    return response.data;
  };

  const postStudent = async (studentData:Student) => {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  };

  const postCity = async (City:City) => {
    const response = await axios.post(API_CITIES, City);
    return response.data;
  };

  const updateStudentData = async (studentData:Student) => {
    const response = await axios.put(API_URL, studentData);
    return response.data;
  };

  const updateCityData = async (city:City) => {
    const response = await axios.put(API_CITIES, city);
    return response.data;
  };

  return {
    getAllData,
    getAllCities,
    deleteStudent,
    deleteCity,
    postStudent,
    postCity,
    updateStudentData,
    updateCityData,
  };
}