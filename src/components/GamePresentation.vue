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
  if (props.gameIsRunning) {
    //Gör inget ifall currentPlayerSymbol har ett värde
    if (
      currentPlayerSymbol.value === "X" ||
      currentPlayerSymbol.value === "O"
    ) {
      return;
    }

    let updateSumbol;
    if (props.playerTurn && currentPlayerSymbol.value != "X") {
      updateSumbol = "X";
    } else if (!props.playerTurn && currentPlayerSymbol.value != "O") {
      updateSumbol = "O";
    }

    if (updateSumbol) {
      currentPlayerSymbol.value = updateSumbol;
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
