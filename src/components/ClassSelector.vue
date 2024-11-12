<template>
  <div v-if="characterStore.class === null" class="class-container">
    <div class="class-grid">
      <div v-for="(className, index) in classStore.allClasses" :key="index" class="class-row">
        <div>{{ formatKey(className) }}</div>
        <button v-if="characterStore.nonNullAttributeCount===6" @click="selectClass(className)">Select</button>
      </div>
    </div>
  </div>
  <template v-if="characterStore.class !== null">
    <div class="green">
      {{ formatKey(characterStore.class?.className)
      }}<strong> ✔ Selected</strong>
    </div>
    <DinamicComponent :data="classStore.selectedClass" />
  </template>
</template>

<script>
import { useClassStore } from '../stores/classStore'
import { useCharacterStore } from '../stores/characterStore'
import { formatKey } from '@/utils/formatKey'
import DinamicComponent from './DinamicComponent.vue'

export default {
  components: {
    DinamicComponent, // Register the component here
  },
  setup() {
    const classStore = useClassStore()
    const characterStore = useCharacterStore()

    const selectClass = className => {
      const classItem = classStore.selectClass(className)
      characterStore.selectClass({ className, ...classItem }) // Select the character class
    }

    const nextStep = () => characterStore.nextStep('Class selected')
    return {
      classStore,
      characterStore,
      selectClass,
      formatKey,
      nextStep,
    }
  },
}
</script>

<style scoped>
.class-container {
  margin: 20px;
}

.class-grid {
  display: grid;
  /* Use grid layout */
  grid-template-columns: repeat(3, 1fr);
  /* Create 3 equal width columns */
  gap: 10px;
  /* Space between grid items */
}

.class-row {
  display: flex;
  justify-content: space-between;
  /* Space between title and button */
  padding: 10px;
  /* Padding for better appearance */
  min-width: 150px;
}

button {
  padding: 5px 10px;
}
</style>
