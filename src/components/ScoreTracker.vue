<script setup lang="ts">
import { Player } from "../models/Player";

interface playerScoreProps {
  score: Player;
}

defineProps<playerScoreProps>();
</script>

<template>
  <p>{{ score.name }} : {{ score.score }}</p>
</template>

<style scoped lang="scss"></style>
