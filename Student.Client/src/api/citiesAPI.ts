import axios from "axios";
import { City } from "@/types/dataTypes/City";

const API_CITIES = "http://localhost:5000/api/student/cities/";

export function useCitiesClient() {
  const getAllCities = async () => {
    const response = await axios.get(API_CITIES);
    return response.data;
  };

  const deleteCity = async (ID: number)  => {
    const response = await axios.delete(API_CITIES + ID);
    return response.data;
  };

  const postCity = async (City:City) => {
    const response = await axios.post(API_CITIES, City);
    return response.data;
  };

  const updateCityData = async (city:City) => {
    const response = await axios.put(API_CITIES, city);
    return response.data;
  };

  return {
    updateCityData,
    postCity,
    deleteCity,
    getAllCities
  };
}