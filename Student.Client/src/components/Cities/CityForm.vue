<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h1 class="header">
          Данные о городе
        </h1>
        <hr>
        <div
          v-for="keyOpt in option"
          :key="keyOpt.key"
        >
          <label
            class="label-input"
            :for="keyOpt.key"
          >{{ keyOpt.label }}</label>
          <input
            :id="keyOpt.key"
            v-model="selData.country"
            class="input-cls"
            type="text"
          >
        </div>
        <div class="modal-footer">
          <OwnButton
            :data="`Отмена`"
            @send-data="close()" 
          />
          <OwnButton
            :data="`ОК`"
            @send-data="submit()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, computed, onMounted } from 'vue';
import { useCitiesStore } from '@/stores/citiesStore';
import { City } from '@/types/dataTypes/City';
import OwnButton from '../inputs/OwnButton.vue';

const emit = defineEmits(["close"]);

const props = defineProps({
selectedcity: {
  type: Object as PropType<City>,
  default: () => ({})
}
})
const citiesStore = useCitiesStore();
const formData = ref({...props.selectedcity});
const option = ref([
  {key:"city", label:"Город"},
])

const checkCity = (city:City) => {
  return city.country === undefined ?  true : false
}

const submit = async () => {
  if (checkCity(props.selectedcity)) {
    console.log(props.selectedcity);
    console.log("addMethod");
    await citiesStore.addCity(formData.value);
  } else {
    console.log(props.selectedcity);
    console.log("updateMethod");
    await citiesStore.updateCity(formData.value);
  }
  await citiesStore.fetchCities();
  close();
};

const close = () => {
  emit("close");
};

const selData = computed(() => {
  return formData.value;
})

onMounted(() => {
  console.log(props.selectedcity);
})
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

  &-container label{
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 10px;
    font-weight: bold;
    font-size: 16px;
    color: #ffffffd3;
  }

  &-container input,select{
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
hr{
  color:rgb(46, 73, 108)
}
.header {
  padding-bottom: 10px;
  font-size: 30px;
  margin-left: 22%;
  color: rgb(221, 221, 255);
  text-shadow: 1px 1px 5px rgba(15, 83, 252, 1), 1px 1px 10px rgb(19, 38, 87);
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

.label-input {
  margin-bottom: 20px;
}
.input-cls {
  margin-right: 20px;
}
</style>