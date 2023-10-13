<template>
    <div v-for="keyOpt in option" :key="keyOpt.key">
        <label class="label-input" :for="keyOpt.key">{{ keyOpt.label }}</label>
        <input type="text" :id="keyOpt.key" v-model="selData.country">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';

export default defineComponent({
    setup(props) {
        const option = ref([
            {key:"city", label:"Город"},
        ])
        return {
            option
        }
    },
})
</script>

<style scoped>
.label-input {
  margin-bottom: 20px;
}
</style>
