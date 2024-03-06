<template>
  <div v-if="props.type == 'mini'">
    <MiniCarsSelect
      v-if="store.getCars?.status == 'ready'"
      @selected="(e) => emits('selected', e)"
      :select="props.select"
      :cars="store.getCars.data"
      :icon="props.icon"
    />
  </div>
</template>

<script setup>
import MiniCarsSelect from "@/components/cars/MiniCarsSelect.vue";
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
import { getCars } from "@/api/cars.js";

const store = useAppStore();

const props = defineProps({
  select: Boolean,
  icon: String,
  type: String, // 'mini'
});

const emits = defineEmits(["selected"]);

onMounted(() => {
  console.log(store.getCars?.status);
  if (["none", "error"].includes(store.getCars?.status)) getCars();
});
</script>
