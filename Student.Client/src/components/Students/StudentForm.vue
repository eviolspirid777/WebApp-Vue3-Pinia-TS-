<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h1 class="header">
          Данные о студенте
        </h1>
        <hr>
        <div v-for="(data, key) in selectedStudent" :key="key" class="label-input">
          <div v-if="key !== 'city' && key !== 'id'">
            <label :for="data">{{ key }}</label>
            <input type="text" :id="data" v-model="selectedStudent[key]">
          </div>
          <div v-else-if="key === 'city'">
            <label>city:</label>
            <select v-if="citiesChecker()" id="city" v-model="selectedStudent.city.country">
              <option v-for="(item,key) in cities" :key="key">{{ item.country }}</option>
            </select>
            <input v-else type="text" v-model="selectedStudent.city.country"/>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn-own-cls"
            @click="close()"
          >
            Отмена
          </button>
          <button
            class="btn-own-cls"
            @click="submit()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, computed, onMounted, defineEmits, defineProps } from 'vue';
import { useStudentsStore } from '@/stores/studentsStore';
import { useCitiesStore } from '@/stores/citiesStore';
import { Student } from '@/types/dataTypes/Student'
import { City } from '@/types/dataTypes/City';
import _ from "lodash"

const emit = defineEmits(["close"]);

const props = defineProps({
  currentStudent: {
    type: Object as PropType<Student>,
    default: () => ({})
  }
});

const studentsStore = useStudentsStore();
const citiesStore = useCitiesStore();
const selectedStudent = ref<Student>(Object.keys(props.currentStudent).length !== 0 ? _.cloneDeep(props.currentStudent) : {
  id: 0,
  name: "",
  surname: "",
  patron: "",
  faculty: "",
  specialty: "",
  course: "",
  group: "",
  city: { id: 0, country: "" },
  postalCode: "",
  street: "",
  phone: "",
  email: ""
});

const getAllCities = computed(() => citiesStore.cities);

const citiesChecker = () => {
  const cities = citiesStore.cities;
  return Object.keys(cities).length !== 0 ? true : false;
};

const cities = computed(() => {
  return getAllCities.value;
});

onMounted(async () => {
  await citiesStore.fetchCities();
});

const submit = async () => {
  selectedStudent.value = {
    ...selectedStudent.value,
    city: {
      id: citiesStore.cities.find((city: City) => selectedStudent.value.city?.country === city.country)?.id,
      country: selectedStudent.value.city?.country
    }
  };
  if (Object.values(selectedStudent.value).some(value => value === "" || value === null || value === undefined)) {
    alert("Заполните все поля в форме!");
  } else {
    if (Object.keys(props.currentStudent).length === 0) {
      await studentsStore.addStudent(selectedStudent.value);
    } else {
      await studentsStore.updateStudent(selectedStudent.value);
    }
    await studentsStore.fetchStudents();
    close();
  }
};

const close = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
.modal {
  &-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-wrapper{
    max-width: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    box-shadow: 1px 1px 20px #007bff;
  }

  &-container{
    border-radius: 10px;
    background-color: rgba(46, 73, 108, 0.87);
    padding: 20px;
    text-align: left;
  }

  &-footer{
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    justify-content: space-between;
  }

  &-enter-active, &-leave-active{
    transition: opacity 0.3s ease;
  }

  &-enter, &-leave-to{
    opacity: 0;
  }

  &-container{
    & label{
      display: inline-block;
      width: 150px;
      text-align: right;
      margin-right: 10px;
      font-weight: bold;
      font-size: 16px;
      color: #ffffffd3;
    }

    & select, input{
      width: 200px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
      background-color: rgba(19, 38, 87, 0.308);
      color: #fff;
    }
  }
}
hr{
  color:rgb(46, 73, 108)
}
.add-city {
  background-color: rgba(15, 82, 252, 0.551);
  color: white;
}
.btn-own-cls {
  width: 120px;
  padding: 10px 20px;
  font-size: 15px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:not(:last-child){
    margin-right: 10px;
  }
}
.header {
  padding-bottom: 10px;
  font-size: 30px;
  margin-left: 22%;
  color: rgb(221, 221, 255);
  text-shadow: 1px 1px 5px rgba(15, 83, 252, 1), 1px 1px 10px rgb(19, 38, 87);
}
.label-input {
  margin-bottom: 20px;
}
</style>@/types/dataTypes/City@/types/dataTypes/Student