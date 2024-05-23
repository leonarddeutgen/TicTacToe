<script setup lang="ts">
import UserSetUp from "./UserSetUp.vue";
import { TicTacState } from "./../models/TicTacState";
import { ref } from "vue";
import { Player } from "../models/Player";
import Game from "./Game.vue";

const state = ref<TicTacState>({
  playerList: [],
  gameBoardList: [],
  playerxTurn: false,
  playerSymbol: "",
  gameIsRunning: true,
  someoneWon: false,
});

state.value.gameBoardList = ["", "", "", "", "", "", "", "", ""];

const createNewPlayer = (playerName: string) => {
  state.value.playerList.push(new Player(playerName));
  console.log(state.value.playerList);
};

const newGame = () => {
  //Nollställ boxValue
  for (let i = 0; i < state.value.gameBoardList.length; i++) {
    state.value.gameBoardList[i] = "";
  }

  if (state.value.playerxTurn) {
    state.value.playerList[0].score += 1;
  } else {
    state.value.playerList[1].score += 1;
  }
  console.log(state.value.playerList);
  state.value.someoneWon = false;
  state.value.gameIsRunning = true;
};

const switchTurn = () => {
  //If true = Player X turn
  state.value.playerxTurn = !state.value.playerxTurn;
};

const turnOffGame = () => {
  state.value.gameIsRunning = false;
};

const winToggle = () => {
  state.value.someoneWon = true;
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
    @turnoff-game="turnOffGame"
    @handle-start-over="startOver"
    @handle-new-game="newGame"
  ></Game>
</template>

<style scoped lang="scss"></style>
