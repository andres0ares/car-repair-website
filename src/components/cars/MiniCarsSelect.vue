<template>
  <div :class="`main-mini-display ${props.select ? 'cursor-pointer' : ''}`">
    <div
      v-for="(item, i) in props.cars"
      @click.stop="handleClick(item, i)"
      :class="`mini-card ${clickedIdx == i ? 'clicked-mini' : ' '}`"
    >
      <v-icon v-if="props.icon" class="float-right mt-n4 mr-n4" :size="'x-small'" :icon="props.icon"></v-icon>
      <v-img class="img-mini" contain :src="item?.img" />
      <p class="text-center text-caption mt-2 font-weight-bold">{{ item.nome }}</p>
      <p v-if="item?.preco" class="text-caption mt-2">{{ `valor: R$ ${item?.preco}` ?? '' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  cars: Array,
  select: Boolean,
  icon: String,
});

const emits = defineEmits(["selected"]);
const clickedIdx = ref(-1);

function handleClick(item, i) {
  if(props.select) {
    emits("selected", item);
    clickedIdx.value = i;
  }
}
</script>

<style>
.main-mini-display {
  position: relative;
  display: flex;
  overflow-x: auto;
}

.img-mini {
  width: 200px;
  margin: 0 auto;
}

.mini-card {
  padding: 20px;
  margin-left: 6px;
  border: solid 1px #00000022;
  border-radius: 6px;
  width: 230px;
  flex-grow: 1;
}

.clicked-mini {
  background-color: #00000022;
}

.mini-card:first-child {
  margin-left: 0;
}

@media only screen and (max-width: 959px) {
  .main-mini-display::-webkit-scrollbar {
    display: none;
  }
}
</style>
