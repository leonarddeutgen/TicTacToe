<script setup lang="ts">
import UserSetUp from "./UserSetUp.vue";
import { TicTacState } from "./../models/TicTacState";
import { ref } from "vue";
import { Player } from "../models/Player";
import Game from "./Game.vue";

const state = ref<TicTacState>({
  playerList: [],
  playerxTurn: false,
});

const createNewPlayer = (playerName: string) => {
  state.value.playerList.push(new Player(playerName));
  console.log(state.value.playerList);
};

const switchTurn = () => {
  //If true = Player X turn
  state.value.playerxTurn = !state.value.playerxTurn;
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
    :playerx-turn="state.playerxTurn"
    @switch-turn="switchTurn"
  ></Game>
</template>

<style scoped lang="scss"></style>
