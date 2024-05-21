<script setup lang="ts">
import { ref } from "vue";
interface playerTurn {
  playerTurn: boolean;
  box: number;
}

const currentPlayerSymbol = ref("");
const props = defineProps<playerTurn>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
}>();

const handleClick = () => {
  if (props.playerTurn === true && currentPlayerSymbol.value != "O") {
    console.log("Den är trueee");
    currentPlayerSymbol.value = "X";

    emit("switchTurn");
  }
  if (props.playerTurn === false && currentPlayerSymbol.value != "X") {
    console.log("den är false");
    currentPlayerSymbol.value = "O";
    emit("switchTurn");
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
