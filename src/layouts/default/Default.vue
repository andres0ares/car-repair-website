<template>
  <v-app class="main-max-width" >
    <default-bar />
    <default-view />
    <DefaultFooter />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue';
  import DefaultView from './View.vue';
  import DefaultFooter from './DefaultFooter.vue'
</script>

<style>
.main-max-width {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
