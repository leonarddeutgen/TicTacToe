<script setup lang="ts">
import { Player } from "../models/Player";
import GamePresentation from "./GamePresentation.vue";
//const gameBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
interface playerProps {
  player: Player[];
  playerxTurn: boolean;
}
defineProps<playerProps>();

defineEmits<{
  (e: "switchTurn"): void;
}>();
</script>

<template>
  <h2>{{ player[0].name }} VS {{ player[1].name }}</h2>
  <h3>{{ playerxTurn ? "Spelare X tur" : "Spelare O tur" }}</h3>
  <section class="gameBoard">
    <GamePresentation
      v-for="box in 9"
      :player-turn="playerxTurn"
      :box="box"
      @switch-turn="$emit('switchTurn')"
    ></GamePresentation>
  </section>
</template>

<style scoped lang="scss">
.gameBoard {
  width: 30rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
