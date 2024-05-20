<script setup lang="ts">
interface playerTurn {
  playerTurn: boolean;
  box: number;
}

const props = defineProps<playerTurn>();

const emit = defineEmits<{
  (e: "switchTurn"): void;
}>();

const handleClick = () => {
  if (props.playerTurn === true) {
    console.log("Den är trueee");

    emit("switchTurn");
  } else {
    console.log("den är false");
    emit("switchTurn");
  }
};
</script>

<template>
  <div class="box" @click="handleClick"></div>
</template>

<style scoped lang="scss">
.box {
  height: 10rem;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    border-color: #646cff;
  }
}
</style>
