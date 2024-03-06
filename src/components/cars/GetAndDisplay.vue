<template>
    <div>
        <MiniCarsSelect v-if="store.getCars?.status == 'ready'" :cars="store.getCars.data" />
    </div>
</template>

<script setup>

import MiniCarsSelect from "@/components/cars/MiniCarsSelect.vue"
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
import { getCars } from "@/api/cars.js";

const store = useAppStore();

onMounted(() => {
  console.log(store.getCars?.status);
  if (["none", "error"].includes(store.getCars?.status)) getCars();
});
</script>
