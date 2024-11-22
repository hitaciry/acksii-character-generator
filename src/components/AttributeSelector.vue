<template>
  <div class="attributes-container">
    <div
      v-for="(attribute, index) in characterStore.attributes"
      :key="index"
      class="attribute-row"
    >
      <span>{{ attribute.name }}</span>
      <span v-if="attribute.value !== null">{{ attribute.value }}</span>
      <span v-if="attribute.value !== null">({{ attribute.mod }})</span>
      <Button @click="generateAttribute(index)" v-if="attribute.value === null">
        Roll
      </Button>
    </div>
  </div>
</template>

<script setup>
import { rollAttribute } from '../utils/diceRoller'
import { useCharacterStore } from '../stores/characterStore'
const characterStore = useCharacterStore()
const generateAttribute = index =>
  characterStore.setAttribute(
    index,
    rollAttribute(characterStore.nonNullAttributeCount),
  )
</script>

<style scoped>
.attributes-container {
  margin: 20px;
}

.attribute-row {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
.attribute-row span {
  flex: 1;
}
</style>
