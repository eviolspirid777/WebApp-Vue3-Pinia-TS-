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
import { useStudentsStore } from '@/stores/studentsStore';
import MainTable from "./MainTable.vue";
import ModalForm from "./CityForm.vue";
import { City } from '@/types/dataTypes/iCity';

export default defineComponent({
  components: {
    MainTable,
    ModalForm
  },
  setup() {
    const store = useStudentsStore();
    const showModal = ref(false);
    const selectedCity = ref<City|undefined>({id:undefined, country:undefined});
    const nameFilter = ref("");
    const cities = ref([
      { key: "country", label: "Город" }
    ]);

    const sendAllCities = computed(() => store.allCities);

    const closeModalWindow = () => {
      selectedCity.value = {id:undefined, country:undefined};
      showModal.value = !showModal.value;
    };

    const deleteCity = (id:number) => {
      store.deleteCity(id);
    };

    const editCity = (city:City) => {
      selectedCity.value = city;
      console.log(selectedCity.value);
      showModal.value = true;
    };

    const refreshData = async () => {
      await store.refreshCities();
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