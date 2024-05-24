<script setup lang="ts">
interface playerTurn {
  playerTurn: boolean;
  gameIsRunning: boolean;
  box: string;
  index: number;
}
defineProps<playerTurn>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "handleBoxValue"): void;
}>();
</script>

<template>
  <div class="box" @click="$emit('handleBoxValue')">{{ box }}</div>
</template>

<style scoped lang="scss">
.box {
  height: 10rem;
  border: 1px solid black;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;

  &:hover {
    border-color: #646cff;
  }
}
</style>
