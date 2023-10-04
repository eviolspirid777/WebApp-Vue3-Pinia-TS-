<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="field in filteredTableFields"
            :key="field.key"
            @click="sortData(field.key)"
          >
            {{ field.label }}
            <span
              v-if="sortTitle === field.key"
              class="th-icon-container"
            >
              <i v-if="cont === 1">↓</i>
              <i v-else-if="cont === 2">↑</i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="data in rows"
          :key="data.id"
        >
          <td
            v-for="field in filteredTableFields"
            :key="field.key"
          >
            {{ getValueFromKey(data, field.key) }}
          </td>
          <td>
            <div class="d-flex">
              <button
                v-if="cityCheck"
                type="button"
                class="btn-b-0-20"
                @click="sendInformation(data)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                ><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </button>
              <button
                type="button"
                class="btn-b-0-20"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="editData(data)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>
              </button>
              <button
                type="button"
                class="btn-b-0-20"
                @click="deleteData(data.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from 'vue';

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    rows: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const cont = ref(0);
    const sortTitle = ref("");
    const cityCheck = ref(false);

    const filteredTableFields = computed(() => {
      return props.columns.filter((field: any) => field.key !== "id");
    });

    watch(
      () => props.columns,
      () => {
        cityCheck.value = props.columns.length >= 2;
      },
      { immediate: true }
    );

    const getValueFromKey = (value: any, key: string) => {
      return value[key];
    };

    const editData = (value: any) => {
      emit("clickData", value);
    };

    const deleteData = (ID: number) => {
      if (!confirm("Вы уверены?")) {
        return;
      }
      emit("delete", ID);
    };

    const sortData = (title: string) => {
      if (sortTitle.value === title) {
        cont.value++;
      } else {
        sortTitle.value = title;
        cont.value = 1;
      }

      if (cont.value === 1) {
        emit("sort", sortTitle.value, true);
      } else if (cont.value === 2) {
        emit("sort", sortTitle.value, false);
      } else if (cont.value === 3) {
        emit("refresh");
        cont.value = 0;
        sortTitle.value = "";
      }
    };

    const sendInformation = (data: any) => {
      emit("sendData", data);
    };

    return {
      cont,
      sortTitle,
      cityCheck,
      filteredTableFields,
      getValueFromKey,
      editData,
      deleteData,
      sortData,
      sendInformation
    };
  }
});
</script>

<style scoped>
th:nth-child(n+1):hover{
  color: rgba(15, 83, 252);
  cursor: pointer;
}
.btn-b-0-20:hover{
  border: 2px solid rgba(15, 83, 252);
}
td{
  border: 1px solid black;
  align-content: center;
  align-items: center;
}
th, .d-flex{
  white-space: nowrap;
  text-align: center;
}
.th-icon-container {
  position: relative;
}

.th-icon-container i {
  position: absolute;
}
</style>