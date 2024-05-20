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
  <section>
    <h3 v-if="players.length <= 0">Lägg till Spelare X</h3>
    <h3 v-else>Lägg till Spelare O</h3>
    <form @submit.prevent="createPlayer">
      <input type="text" placeholder="Ange namn" v-model="playerName" />
      <button>Spara</button>
    </form>
  </section>
</template>

<style scoped lang="scss"></style>
