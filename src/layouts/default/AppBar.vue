<template>
 <div class="main-nav-bar pa-5">
  <p class="float-left">Peli motto</p>
  <div class="float-right">
    <DisplayUser />
  </div>
 </div>
</template>

<script setup>
  import DisplayUser from "@/components/login/DisplayUser.vue"
</script>

<style scoped>
.main-nav-bar {
  width: 100%;
  border-bottom: 1px solid #00000023 ;
}
</style>
