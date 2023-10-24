<template>
  <label>{{ props.labelText }}</label>
  <input
    v-model="data"
    type="text"
  >
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const data = ref(props.modelValue);
</script>