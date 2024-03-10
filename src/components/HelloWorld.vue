<template>
  <v-container class="fill-height max-width">
    <v-responsive class="d-flex align-center text-center fill-height">
      
      <v-carousel hide-delimiters show-arrows="hover" cycle>
        <v-carousel-item v-for="(item, i) in imgs" :key="i">
          <div class="mt-12" />
          <v-img class="img" contain :src="item.img" />
        </v-carousel-item>
      </v-carousel>

      <div class="mt-n16"></div>

      <DisplayLogo class="mt-n10" />

      <p class="mt-8 mb-4">Carros que atendemos:</p>

      <MiniCarsSelect :cars="imgs" />
      <div class="py-14" />


    </v-responsive>
  </v-container>
</template>

<script setup>
  // import DisplayCars from "@/components/cars/DisplayCars.vue";
  import MiniCarsSelect from "./cars/MiniCarsSelect.vue";
  import DisplayLogo from "./DisplayLogo.vue";
  //import GetAndDisplay from "@/components/cars/GetAndDisplay.vue"
  import imgs from "@/utils/imgs.json"
  //import { getCars } from "@/api/cars"
  //import { onMounted } from "vue";
 
  // onMounted(() => {
  //   getCars()
  // })
</script>

<style>
.img {
  max-width: 700px;
  margin: 0 auto;
}

.max-width {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
