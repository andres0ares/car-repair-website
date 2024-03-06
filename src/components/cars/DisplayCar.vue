<template>
  <div v-if="props.car?.img">
    <div class="my-16" />
    <v-img class="img-display-car" contain :src="car?.img" />
    <div class="info-display-car">
      <p class="text-left text-h3 mt-8">{{ car?.nome }}</p>
      <p class="text-left">{{ car?.modelo }}</p>
      <p class="text-left mt-8">{{ car?.descricao }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style>
.img-display-car,
.info-display-car {
  width: 60%;
  margin: 0 auto;
}
</style>
