<script setup lang="ts">
import UserSetUp from "./UserSetUp.vue";
import { TicTacState } from "./../models/TicTacState";
import { ref, watch } from "vue";
import { Player } from "../models/Player";
import Game from "./Game.vue";

const state = ref<TicTacState>({
  playerList: [],
  gameBoardList: [],
  playerxTurn: false,
  playerSymbol: "",
  gameIsRunning: true,
  someoneWon: false,
  isDraw: false,
});
state.value.gameBoardList = ["", "", "", "", "", "", "", "", ""];

//Local Storage
const storagePlayerList = window.localStorage.getItem("playerList");
const storedBoardList = window.localStorage.getItem("gameBoardList");
const storedplayerTurn = window.localStorage.getItem("playerTurn");

if (storagePlayerList) {
  state.value.playerList = JSON.parse(storagePlayerList);
}

if (storedBoardList) {
  state.value.gameBoardList = JSON.parse(storedBoardList);
}

if (storedplayerTurn) {
  state.value.playerxTurn = JSON.parse(storedplayerTurn);
}
const createNewPlayer = (playerName: string) => {
  state.value.playerList.push(new Player(playerName));
};

//Håll koll på PlayerList
watch(
  () => state.value.playerList,
  (value) => {
    window.localStorage.setItem("playerList", JSON.stringify(value));
  },
  { deep: true }
);

const savePlayerListToLocalStorage = () => {
  window.localStorage.setItem(
    "playerList",
    JSON.stringify(state.value.playerList)
  );
};

const savePlayerTurnToLocalStorage = () => {
  window.localStorage.setItem(
    "playerTurn",
    JSON.stringify(state.value.playerxTurn)
  );
};

// Game Functions
const reset = () => {
  state.value.someoneWon = false;
  state.value.gameIsRunning = true;
  state.value.isDraw = false;
};

const newGame = () => {
  //Nollställ boxValue
  for (let i = 0; i < state.value.gameBoardList.length; i++) {
    state.value.gameBoardList[i] = "";
  }

  if (state.value.isDraw) {
    reset();
  } else if (state.value.playerxTurn) {
    state.value.playerList[0].score += 1;
    savePlayerListToLocalStorage();
  } else {
    state.value.playerList[1].score += 1;
    savePlayerListToLocalStorage();
  }
  reset();
};

const switchTurn = () => {
  //If true = Player X turn
  state.value.playerxTurn = !state.value.playerxTurn;
  savePlayerTurnToLocalStorage();
};

const turnOffGame = () => {
  state.value.gameIsRunning = false;
};

const winToggle = () => {
  state.value.someoneWon = true;
};

const drawToggle = () => {
  state.value.isDraw = true;
};

const startOver = () => {
  for (let i = 0; i < state.value.gameBoardList.length; i++) {
    state.value.gameBoardList[i] = "";
  }
  state.value.playerList = [];
  state.value.gameIsRunning = true;
  state.value.someoneWon = false;
};
</script>

<template>
  <UserSetUp
    v-if="state.playerList.length < 2"
    :players="state.playerList"
    @handle-new-player="createNewPlayer"
  ></UserSetUp>
  <Game
    v-else
    :player="state.playerList"
    :game-board-list="state.gameBoardList"
    :playerx-turn="state.playerxTurn"
    :player-symbol="state.playerSymbol"
    :game-is-running="state.gameIsRunning"
    :someone-won="state.someoneWon"
    @switch-turn="switchTurn"
    @handle-winner="winToggle"
    @handle-draw="drawToggle"
    @turnoff-game="turnOffGame"
    @handle-start-over="startOver"
    @handle-new-game="newGame"
  ></Game>
</template>

<style scoped lang="scss"></style>
