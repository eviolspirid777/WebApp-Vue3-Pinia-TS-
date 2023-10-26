<template>
  <label>{{ labelText }}</label>
  <input
    v-model="localValue"
    type="text"
  >
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  labelText: {
    type: String,
    default: ""
  },
  modelValue: {
    type: String,
    default: ""
  }
});

const emits = defineEmits(["updateValue"]);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emits("updateValue", newValue);
});

</script>
<style lang="scss" scoped>
label{
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffffd3;
}

select, input{
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: rgba(19, 38, 87, 0.308);
  color: #fff;
}
</style>