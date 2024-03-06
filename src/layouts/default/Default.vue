<template>
  <v-app class="main-max-width" >
    <default-bar />
    <default-view />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>

<style>
.main-max-width {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
