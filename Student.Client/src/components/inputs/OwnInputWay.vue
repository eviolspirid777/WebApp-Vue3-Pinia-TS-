<template>
    <label>{{ props.labelText }}</label>
    <input
        type="text"
        v-model="data"
    />
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

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