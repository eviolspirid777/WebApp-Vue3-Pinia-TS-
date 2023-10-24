<template>
  <div>
    <button
      id="show-modal"
      type="button"
      class="btn-own-cls"
      @click="showModal = true"
    >
      Добавить город
    </button>
    <ModalForm
      v-if="showModal"
      :selectedcity="selectedCity"
      @close="closeModalWindow()"
    />
    <MainTable
      :columns="cities"
      :rows="sendAllCities"
      @delete="deleteCity"
      @clickData="editCity"
    >
      <template #buttons="propsData">
        <CityButtons
          :data="propsData.data"
          :data-id="propsData.dataId"
          @clickData="editCity"
          @delete="deleteCity"
        />
      </template>
    </MainTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useCitiesStore } from '@/stores/citiesStore';
import MainTable from "../MainTable.vue";
import ModalForm from "./CityForm.vue";
import { City } from '@/types/dataTypes/City';
import CityButtons from '@/components/Slots/CitiesTableSlot.vue'

const citiesStore = useCitiesStore();
const showModal = ref(false);
const selectedCity = ref<City|undefined>({id:undefined, country:undefined});
const cities = ref([
  { key: "country", label: "Город" }
]);

const sendAllCities = computed(() => citiesStore.cities);

const closeModalWindow = () => {
  selectedCity.value = {id:undefined, country:undefined};
  showModal.value = !showModal.value;
};

const deleteCity = (id:number) => {
  citiesStore.deleteCity(id);
};

const editCity = (city:City) => {
  selectedCity.value = city;
  showModal.value = true;
};

const refreshData = async () => {
  await citiesStore.fetchCities();
};

onMounted(async () => {
  await refreshData();
});
</script>

<style scoped lang="scss">
.btn-own-cls{
  border: 2px solid rgba(15, 83, 252);
  height: 40px;
  border-radius: 4px;
  border-color: rgba(15, 83, 252);
  transition: background-color 0.3s ease;
  background-color: white;
  color: rgba(15, 83, 252);
  &:hover{
    background-color: rgba(15, 83, 252);
    color: white;
  }
}
</style>