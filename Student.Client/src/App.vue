<template>
  <div
    id="app"
    class="container"
  >
    <header class="headerClass">
      <h3 class="d-flex justify-content-center">
        Vue.js + postgreSQL + Web API
      </h3>
      <h5 class="d-flex justify-content-center">
        Управление студентами
      </h5>
    </header>
    <RouterLink
      to="/Student"
      class="routLink"
    >
      Студенты
    </RouterLink>
    <RouterLink
      to="/Cities"
      class="routLink"
    >
      Города
    </RouterLink>
    <RouterView
      class="router-view"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
  @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css');

  .headerClass{
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 5px rgba(15, 83, 252, 1), 1px 1px 10px rgb(19, 38, 87);
  }
  .routLink{
    padding: 10px;
    border: 2px solid rgba(15, 83, 252);
    border-radius: 4px;
    border-color: rgba(15, 83, 252);
    transition: background-color 0.3s ease;
    color: rgba(15, 83, 252);
    height: 40px;
    background-color: white;
    text-decoration: none;
    margin-right: 10px;

    &:hover{
      background-color: rgba(15, 83, 252, 1);
      cursor: pointer;
      color: white;
      box-shadow: 2px 3px 8px #007bff;
    }
  }
  .router-view{
    margin-top: 20px;
  }
</style>
