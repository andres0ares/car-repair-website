<template>
    <div v-if="view.viewUserType == 'client'">
        <div v-if="user.client.logged">
            <v-btn @click="goProfile" append-icon="mdi-account" size="small" variant="plain">{{ user.client.info?.nome }}</v-btn>
        </div>
        <LoginDefault v-else client @close="() => login = false" />
    </div>
    <div v-if="view.viewUserType == 'staff'">
        <div v-if="user.staff.logged">
            <p> {{ user.staff.info?.nome }} </p>
        </div>
        <LoginDefault v-else client @close="() => login = false" />
    </div>
</template>

<script setup>

import { useViewStore } from '@/store/views';
import { useUserStore } from '@/store/user';
import LoginDefault from "@/components/login/LoginDefault.vue"
import { ref } from "vue";
import { useRouter } from 'vue-router';

const view = useViewStore();
const user = useUserStore();
const login = ref(false);
const router = useRouter();

function goProfile() {
    router.push('/profile');
}

</script>