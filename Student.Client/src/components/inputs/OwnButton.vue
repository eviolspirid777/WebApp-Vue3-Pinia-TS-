<template>
  <button
    :class="[props.btnClass,`btn-own-cls`]"
    @click="dataEmit()" 
  >
    {{ props.data }}
    <i
      v-if="props.dfn"
      :class="[props.iconClass]"
    />
  </button>
</template>
<script lang="ts" setup>

const props = defineProps({
    btnClass: {
        type: String,
        required: false
    },
    iconClass: {
        type: String,
        required: false
    },
    data: {
        type:String,
        default:""
    },
    dfn: {
        type:Boolean,
        default:false
    }
})

const emits = defineEmits(["sendData"]);

const dataEmit = () => {
   emits("sendData");
}
</script>
<style lang="scss">
.btn-own-cls{
  border-radius: 4px;
  border-color: rgba(15, 83, 252);
  transition: background-color 0.3s ease;
  color: rgba(15, 83, 252);
  height: 40px;
  background-color: white;
  &:hover{
    background-color: rgba(15, 83, 252, 1);
    cursor: pointer;
    color: white;
    box-shadow: 2px 3px 8px #007bff;
  }
}

.btn-b-0-20:hover{
  border: 2px solid rgba(15, 83, 252);
}
</style>