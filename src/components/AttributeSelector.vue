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
      <button @click="generateAttribute(index)" v-if="attribute.value === null">
        Roll
      </button>
    </div>
  </div>
  <button v-if="characterStore.attributes.findIndex(a=>a.value===null)===-1" @click="nextStep">Next</button>
</template>

<script>
import { rollAttribute } from '../utils/diceRoller'
import { useCharacterStore } from '../stores/characterStore'

export default {
  setup() {
    const characterStore = useCharacterStore()
    const generateAttribute = index =>
      characterStore.setAttribute(
        index,
        rollAttribute(characterStore.nonNullAttributeCount),
      )
    const nextStep = () => characterStore.nextStep('Select class')
    return {
      characterStore,
      generateAttribute,
      nextStep
    }
  },
}
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

button {
  padding: 5px 10px;
}
</style>
