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

      <p class="mt-8 mb-4">Nossos serviços:</p>

      <MiniCarsSelect :cars="servicos" />

      <p class="mt-8 mb-4">Carros que atendemos:</p>

      <MiniCarsSelect :cars="cars" />  

      <v-btn class="mt-16" color="black" @click="openCreateAppointment">Marcar atendimento</v-btn>    

      <!-- <v-container>
        <div class="tt">
          <v-btn @click="openCreateAppointment">Marcar serviço</v-btn>
        </div>
      </v-container>   -->
      
      <div class="py-14" />


    </v-responsive>
  </v-container>
</template>

<script setup>

  import MiniCarsSelect from "./cars/MiniCarsSelect.vue";
  import DisplayLogo from "./DisplayLogo.vue";
  import imgs from "@/utils/imgs.json"
  import { onMounted,  ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/store/app";

  //const servicos = ref([]);
  const router = useRouter();
  const store = useAppStore();

  const servicos = computed(() => {
    return store.servicos?.data ?? []
  });

  const cars = computed(() => {
    return store.cars?.data ?? []
  })

  // function getServicos() {
  //   getAll().then((_) => {
  //     servicos.value = _;
  //   })
  //   .catch((_) => {
  //     console.log(_)
  //   })
  // };

  function openCreateAppointment() {
    router.push('/agendar')
  };

  onMounted(() => {
    //if(servicos.value.length == 0) getServicos();
  });

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

.tt {
  margin: 0 auto;
}
</style>
