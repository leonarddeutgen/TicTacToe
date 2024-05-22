<script setup lang="ts">
import { Player } from "../models/Player";
import GamePresentation from "./GamePresentation.vue";
import Buttons from "./Buttons.vue";
import { ref } from "vue";

interface playerProps {
  player: Player[];
  playerxTurn: boolean;
  gameIsRunning: boolean;
  someoneWon: boolean;
}
defineProps<playerProps>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "turnoffGame"): void;
  (e: "handleWinner"): void;
  (e: "handleStartOver"): void;
}>();

let gameBoxes = ref(["", "", "", "", "", "", "", "", ""]);

let winnerSymbol = ref("");

const handleBoxValue = (index: number, currentSymbol: string) => {
  if (!gameBoxes.value[index]) {
    gameBoxes.value[index] = currentSymbol;
    emit("switchTurn");

    if (checkWinner(currentSymbol, gameBoxes.value as string[])) {
      console.log(currentSymbol, "Har Vunnit");
      winnerSymbol.value = currentSymbol + " Har vunnit";

      emit("handleWinner");
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
    return index === "X" || index === "O";
  });
  return result;
};
</script>

<template>
  <section class="messageBox">
    <div v-if="!someoneWon" class="messageBox--running">
      <h2>{{ player[0].name }} VS {{ player[1].name }}</h2>
      <h3>{{ playerxTurn ? "Spelare X tur" : "Spelare O tur" }}</h3>
    </div>
    <div v-else class="messageBox--done">
      <h3>{{ winnerSymbol }}</h3>
    </div>
  </section>
  <section class="gameBoard">
    <GamePresentation
      v-for="(box, index) in gameBoxes"
      :player-turn="playerxTurn"
      :game-is-running="gameIsRunning"
      :box="box"
      :index="index"
      @switch-turn="$emit('switchTurn')"
      @handle-box-value="(currentSymbol:string) => handleBoxValue(index, currentSymbol)"
    ></GamePresentation>
  </section>
  <Buttons
    v-if="someoneWon"
    @handle-start-over="$emit('handleStartOver')"
  ></Buttons>
</template>

<style scoped lang="scss">
.messageBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
}

.gameBoard {
  width: 30rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
