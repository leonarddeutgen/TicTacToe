<script setup lang="ts">
defineEmits<{
  (e: "handleStartOver"): void;
  (e: "handleNewGame"): void;
}>();
</script>

<template>
  <section class="btnContainer">
    <button @click="$emit('handleNewGame')">Spela igen?</button>
    <button @click="$emit('handleStartOver')">
      Nollställ & starta nytt spel
    </button>
  </section>
</template>

<style scoped lang="scss">
.btnContainer {
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
}
</style>
