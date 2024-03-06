<template>
  <div v-if="user.isAdmin">
    <div class="my-16"></div>
    <ControllCars />
  </div>
  <LoginAdmin v-else />
</template>

<script setup>
import ControllCars from "@/components/cars/ControllCars.vue";
import LoginAdmin from "@/components/LoginAdmin.vue";

import { useUserStore } from "@/store/user";

const user = useUserStore();
</script>
