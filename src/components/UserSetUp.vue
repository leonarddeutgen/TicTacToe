<script setup lang="ts">
import { Player } from "../models/Player";
import { ref } from "vue";

interface playerListProps {
  players: Player[];
}

let playerName = ref("");

defineProps<playerListProps>();

const emit = defineEmits<{
  (e: "handleNewPlayer", name: string): void;
}>();

const createPlayer = () => {
  emit("handleNewPlayer", playerName.value);
  playerName.value = "";
};
</script>

<template>
  <header>
    <h1>TRE I RAD</h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon">
      <path
        d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3z"
      />
      <path
        d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      />
    </svg>
  </header>
  <section>
    <h3 v-if="players.length <= 0">Lägg till Spelare X</h3>
    <h3 v-else>Lägg till Spelare O</h3>
    <form @submit.prevent="createPlayer">
      <input type="text" placeholder="Ange namn" v-model="playerName" />
      <button>Spara</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 10rem;

  .icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
