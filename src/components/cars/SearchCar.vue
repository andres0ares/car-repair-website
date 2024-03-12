<template>
    <div class="search-bar-div mt-10">
        <v-text-field
        class="float-left w-75"
        v-model="search"
        :variant="'outlined'"
        :density="'compact'"
        label="Pesquisar por nome"
        ></v-text-field>
        <v-btn @keyup.enter="handleSearch" @click="handleSearch" :disabled="loading" :loading="loading" :color="'black'" class="float-left ml-2" :size="'small'" :icon="'mdi-magnify'"></v-btn>
    </div>
    <div class="w-100">
        <MiniCarsSelect v-if="data" :cars="data" select @selected="(e) => selected = e" />
        <v-expand-transition>
          <DisplayCar v-if="selected" :car="selected" />
        </v-expand-transition>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { searchCar } from "@/api/cars";
import MiniCarsSelect from "./MiniCarsSelect.vue";
import DisplayCar from "./DisplayCar.vue";

const search = ref('');
const loading = ref(false);
const selected = ref(undefined);
const data = ref(undefined);

function handleSearch() {
    loading.value = true;
    data.value = undefined;
    selected.value = undefined
    
    searchCar(search.value)
    .then((_data) => {
        data.value = _data;
    })
    .finally(() => {
        loading.value = false
    })
}

</script>

<style>
    .search-bar-div {
        max-width: 600px;
    }

    .w-100 {
        clear: both;
        width: 100%;
    }
</style>