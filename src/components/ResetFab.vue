<template>
  <Button class="fab" @click="characterStore.$reset()">
    <CaReset />
  </Button>
</template>

<script setup>
import { useCharacterStore } from '@/stores/characterStore' // Importing the store
import { CaReset } from '@kalimahapps/vue-icons'
const characterStore = useCharacterStore()
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 20px;
  right: 76px;
  width: 56px;
  height: 56px;
  background: transparent; /* Transparent background */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}
.fab svg {
  fill: var(--color-text); /* Icon color */
  width: 55px; /* Set size */
  height: 55px; /* Set size */
}
</style>
