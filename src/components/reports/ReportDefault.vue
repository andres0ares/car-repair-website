<template>
    <v-container>
        <p v-if="loadingInit">carregando...</p>
        <div v-else>
            <p class="text-h5">Relatórios</p>

            <v-btn
            v-for="(item, i ) in list"
            class="mt-10 mr-2"
            color="black"
            :disabled="loading"
            :variant="option.option == item.option ? 'flat' : 'outlined'"
            @click.stop="getReportDefault(item)"
            >{{ item.name }}</v-btn>
            <div v-if="res" class="mt-10">
                <p class="text-h6">{{ option.name }}</p>
                <p class="text-caption">{{ option.subtitle }}</p>
                <div class="mt-10">
                    <v-text-field
                    class="float-left search-report-data"
                    v-model="search"
                    :variant="'outlined'"
                    :density="'compact'"
                    label="Pesquisar"
                    :append-inner-icon="'mdi-magnify'"
                    ></v-text-field>
                    <v-data-table :search="search" :items="res"></v-data-table>
                </div>
            </div>

        </div>
    </v-container>   
</template>

<script setup>
//
import { getReportList, getReport } from "@/api/reports"
import { onMounted, ref } from "vue"

const loadingInit = ref(true);
const list = ref(undefined);
const option = ref(-1);
const loading = ref(false);
const res = ref(undefined);
const search = ref('')

onMounted(() => {
    getReportList()
    .then((_) => {
        list.value = _;
    })
    .finally(() => {
        loadingInit.value = false;
    })
})

function getReportDefault(_) {
    option.value = _;
    res.value = undefined;
    loading.value = true;

    getReport(_.option)
    .then((_) => {
        res.value = _;
    })
    .finally(() => {
        loading.value = false;
    })
}
</script>

<style>
.search-report-data {
    width: 100%;
    max-width: 500px;
}
</style>