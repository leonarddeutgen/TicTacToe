<script setup lang="ts">
import { ref } from "vue";
interface playerTurn {
  playerTurn: boolean;
  gameIsRunning: boolean;
  box: string | null;
  index: number;
}

const currentPlayerSymbol = ref("");
const props = defineProps<playerTurn>();
const emit = defineEmits<{
  (e: "switchTurn"): void;
  (e: "handleBoxValue", currentSymbol: string): void;
}>();

const handleClick = () => {
  //Kollar om speler ät igång
  if (props.gameIsRunning === true) {
    if (props.playerTurn === true && currentPlayerSymbol.value != "O") {
      currentPlayerSymbol.value = "X";

      emit("handleBoxValue", currentPlayerSymbol.value);
      emit("switchTurn");
    }
    if (props.playerTurn === false && currentPlayerSymbol.value != "X") {
      currentPlayerSymbol.value = "O";

      emit("handleBoxValue", currentPlayerSymbol.value);
      emit("switchTurn");
    }
  }
};
</script>

<template>
  <div class="box" @click="handleClick">{{ currentPlayerSymbol }}</div>
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
