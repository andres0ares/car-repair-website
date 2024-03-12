<template>
  <v-container>

    <p class="text-h5">Gerenciar Carros</p>


    <v-btn
      v-for="(item, i ) in options"
      v-if="!create"
      class="mt-10 mr-2"
      color="black"
      :variant="option == i ? 'flat' : 'outlined'"
      @click.stop="option = i"
      >{{ item }}</v-btn
    >

    <v-window v-model="option">
      <v-window-item :value="0">
        <div class="pt-10">
          <p class="text-body-2 font-weight-bold">Carros disponíveis:</p>
          <GetAndDisplay type="mini" select :icon="'mdi-pencil'" @selected="handleEdit" />
        </div>
        <v-expand-transition>
          <CreateCar v-if="edit" :edit="selected" class="mt-10" @close="() => (edit = false)" />
        </v-expand-transition>
      </v-window-item>
      <v-window-item :value="1">
        <SearchCar />
      </v-window-item>
      <v-window-item :value="2">
          <CreateCar class="mt-10" @close="() => { option = 0 }" />
      </v-window-item>
    </v-window>
  </v-container>
  
</template>

<script setup>

import GetAndDisplay from "@/components/cars/GetAndDisplay.vue";
import CreateCar from "@/components/cars/CreateCar.vue";
import SearchCar from "@/components/cars/SearchCar.vue";

import { ref } from "vue";
import { getCar } from "@/api/cars";

const create = ref(false);
const edit = ref(false);
const selected = ref(undefined); 
const option = ref(0);
const options = ref([
  "Editar",
  "Pesquisar",
  "Criar"
]);

function handleEdit(_e) {
  edit.value = true;
  selected.value = _e;
  getCar(_e.id)
  .then((_) => {
    console.log(_)
  })
}

</script>
