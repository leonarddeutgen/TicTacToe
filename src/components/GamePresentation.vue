<script setup lang="ts">
import { ref } from "vue";
interface playerTurn {
  playerTurn: boolean;
  playerSymbol: string;
  gameIsRunning: boolean;
  box: string;
  index: number;
}
const props = defineProps<playerTurn>();

let currentPlayerSymbol = ref(props.box);
const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "handleBoxValue"): void;
}>();

const handleClick = () => {
  if (props.gameIsRunning) {
    //Gör inget ifall currentPlayerSymbol har ett värde
    // if (
    //   currentPlayerSymbol.value === "X" ||
    //   currentPlayerSymbol.value === "O"
    // ) {
    //   return;
    // }

    // let updateSymbol;
    // if (props.playerTurn && currentPlayerSymbol.value != "X") {
    //   updateSymbol = "X";
    //   console.log(props.box);
    // } else if (!props.playerTurn && currentPlayerSymbol.value != "O") {
    //   updateSymbol = "O";
    // }

    // if (updateSymbol) {
    //   currentPlayerSymbol.value = updateSymbol;
    //   emit("handleBoxValue", currentPlayerSymbol.value);
    //   emit("switchTurn");
    // }

    emit("handleBoxValue");
    emit("switchTurn");
  }
};
</script>

<template>
  <div class="box" @click="handleClick">{{ box }}</div>
</template>

<style scoped lang="scss">
.box {
  height: 10rem;
  border: 1px solid black;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;

  &:hover {
    border-color: #646cff;
  }
}
</style>
