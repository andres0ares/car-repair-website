<template>
    <div v-if="view.viewUserType == 'client'">
        <div v-if="user.client.logged">
            <p> {{ user.client.info?.nome }} </p>
        </div>
        <LoginDefault v-else @close="() => login = false" />
    </div>
</template>

<script setup>

import { useViewStore } from '@/store/views';
import { useUserStore } from '@/store/user';
import LoginDefault from "@/components/login/LoginDefault.vue"
import { ref } from "vue";

const view = useViewStore();
const user = useUserStore();
const login = ref(false)

</script>