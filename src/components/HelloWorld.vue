<template>
  <v-container class="fill-height max-width">
    <v-responsive class="d-flex align-center text-center fill-height">
      

      <v-carousel hide-delimiters show-arrows="hover" cycle>
        <v-carousel-item v-for="(item, i) in imgs" :key="i">
          <div class="my-16" />
          <v-img class="img" contain :src="item.img" />
        </v-carousel-item>
      </v-carousel>

      <div class="mb-4 mt-n16">
        <div class="text-body-2 font-weight-light mb-n1">Ofinina de Carros</div>
        <h1 class="text-h2 font-weight-bold">Pelli Motto</h1>
      </div>
      

      <CreateCar />
      <p class="mt-8 mb-4">Carros que atendemos:</p>

      <MiniCarsSelect :cars="imgs" />
      <div class="py-14" />


      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/components/all/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Components
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />

            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://community.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-account-group"
              size="large"
              start
            />

            Community
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
  // import DisplayCars from "@/components/cars/DisplayCars.vue";
  import CreateCar from "@/components/cars/CreateCar.vue"
  import MiniCarsSelect from "./cars/MiniCarsSelect.vue";
  import imgs from "@/utils/imgs.json"
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
