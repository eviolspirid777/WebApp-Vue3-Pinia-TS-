import axios from "axios";
import { Student } from "@/types/dataTypes/Student";

const API_URL = 'http://localhost:5000/api/student/';

export function useStudentsClient(){
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
    const deleteStudent = async (ID:number) => {
        const response = await axios.delete(API_URL + ID);
        return response.data;
    };
    const postStudent = async (studentData:Student) => {
        const response = await axios.post(API_URL, studentData);
        return response.data;
    };
    const updateStudentData = async (studentData:Student) => {
        const response = await axios.put(API_URL, studentData);
        return response.data;
    };
    return{
        getAllData,
        deleteStudent,
        postStudent,
        updateStudentData
    }
}