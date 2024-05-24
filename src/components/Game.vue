<script setup lang="ts">
import { Player } from "../models/Player";
import GamePresentation from "./GamePresentation.vue";
import Buttons from "./Buttons.vue";
import ScoreTracker from "./ScoreTracker.vue";
import { ref } from "vue";
import { watchEffect } from "vue";

interface playerProps {
  player: Player[];
  gameBoardList: string[];
  playerxTurn: boolean;
  playerSymbol: string;
  gameIsRunning: boolean;
  someoneWon: boolean;
}
const props = defineProps<playerProps>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "turnoffGame"): void;
  (e: "handleWinner"): void;
  (e: "handleDraw"): void;
  (e: "handleStartOver"): void;
  (e: "handleNewGame", gameBoxesList: string[]): void;
}>();

let message = ref("");
let currentSymbol: string;

const handleBoxValue = (index: number) => {
  if (props.gameIsRunning) {
    if (
      props.gameBoardList[index] === "X" ||
      props.gameBoardList[index] === "O"
    ) {
      return;
    }

    if (props.playerxTurn) {
      currentSymbol = "X";
    }
    if (!props.playerxTurn) {
      currentSymbol = "O";
    }

    if (!props.gameBoardList[index]) {
      props.gameBoardList[index] = currentSymbol;
      //emit("switchTurn");

      if (checkWinner(currentSymbol, props.gameBoardList as string[])) {
        message.value = currentSymbol + " Har vunnit";

        emit("handleWinner");
        emit("turnoffGame");
      } else if (checkDraw(props.gameBoardList as string[])) {
        message.value = "Oavgjort!";
        emit("handleWinner");
        emit("handleDraw");
      } else {
        emit("switchTurn");
      }
    }
  }
};

// watchEffect(() => {
//   window.localStorage.setItem(
//     "gameBoardList",
//     JSON.stringify(props.gameBoardList)
//   );
// });

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
  <section class="scoreBox">
    <ScoreTracker v-for="score in player" :score="score"></ScoreTracker>
  </section>
  <section class="messageBox">
    <div v-if="!someoneWon" class="messageBox--running">
      <h2>{{ player[0].name }}(X) VS {{ player[1].name }} (O)</h2>
      <h3>{{ playerxTurn ? "Spelare X tur" : "Spelare O tur" }}</h3>
    </div>
    <div v-else class="messageBox--done">
      <h3>{{ message }}</h3>
    </div>
  </section>
  <section class="gameBoard">
    <GamePresentation
      v-for="(box, index) in gameBoardList"
      :player-turn="playerxTurn"
      :player-symbol="playerSymbol"
      :game-is-running="gameIsRunning"
      :box="box"
      :index="index"
      @switch-turn="$emit('switchTurn')"
      @handle-box-value="handleBoxValue(index)"
    ></GamePresentation>
  </section>
  <Buttons
    v-if="someoneWon"
    @handle-start-over="$emit('handleStartOver')"
    @handle-new-game="$emit('handleNewGame', gameBoardList)"
  ></Buttons>
</template>

<style scoped lang="scss">
.scoreBox {
  height: 2rem;
  border: 1px solid;
  display: flex;

  align-items: center;
  justify-content: space-evenly;
}
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
