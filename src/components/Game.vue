<script setup lang="ts">
import { Player } from "../models/Player";
import GamePresentation from "./GamePresentation.vue";
import { ref } from "vue";

interface playerProps {
  player: Player[];
  playerxTurn: boolean;
  turnOffGame: boolean;
}
defineProps<playerProps>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "turnoffGame"): void;
}>();

let gameBoxes = ref(["", "", "", "", "", "", "", "", ""]);

const handleBoxValue = (index: number, currentSymbol: string) => {
  if (!gameBoxes.value[index]) {
    gameBoxes.value[index] = currentSymbol;
    emit("switchTurn");

    if (checkWinner(currentSymbol, gameBoxes.value as string[])) {
      console.log(currentSymbol, "Har Vunnit");

      emit("turnoffGame");
    }
    if (checkDraw(gameBoxes.value as string[])) {
      console.log(" Oavgjort!!!!!!!!");
    } else {
      emit("switchTurn");
    }
  }
};

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const checkWinner = (currentSymbol: string, boxList: Array<string>) => {
  return winCombinations.some((combination) => {
    const result = combination.every((index) => {
      return boxList[index] === currentSymbol;
    });
    return result;
  });
};

const checkDraw = (boxList: Array<string>) => {
  const result = boxList.every((index) => {
    console.log(index === "X" || index === "O");
    return index === "X" || index === "O";
  });
  return result;
};
</script>

<template>
  <h2>{{ player[0].name }} VS {{ player[1].name }}</h2>
  <h3>{{ playerxTurn ? "Spelare X tur" : "Spelare O tur" }}</h3>
  <section class="gameBoard">
    <GamePresentation
      v-for="(box, index) in gameBoxes"
      :player-turn="playerxTurn"
      :turn-off-game="turnOffGame"
      :box="box"
      :index="index"
      @switch-turn="$emit('switchTurn')"
      @handle-box-value="(currentSymbol:string) => handleBoxValue(index, currentSymbol)"
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
