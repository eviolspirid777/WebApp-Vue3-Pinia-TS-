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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useCitiesStore } from '@/stores/citiesStore';
import MainTable from "./MainTable.vue";
import ModalForm from "./CityForm.vue";
import { City } from '@/types/dataTypes/iCity';

export default defineComponent({
  components: {
    MainTable,
    ModalForm
  },
  setup() {
    const citiesStore = useCitiesStore();
    const showModal = ref(false);
    const selectedCity = ref<City|undefined>({id:undefined, country:undefined});
    const nameFilter = ref("");
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

    return {
      showModal,
      selectedCity,
      nameFilter,
      cities,
      sendAllCities,
      closeModalWindow,
      deleteCity,
      editCity
    };
  }
});
</script>

<style scoped lang="scss">
.btn-own-cls{
  border: 2px solid rgba(15, 83, 252);
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
</style>@/stores/studentsStore