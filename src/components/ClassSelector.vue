<template>
  <div v-if="characterStore.className === null" class="flex-container ">
      <div
       v-for="([className, classDetails]) in Object.entries(classes)" :key="className"
        class="flex-item"
      >
      <div class="short-texts">
        <span>{{ formatKey(className) }}</span>
        <span>{{ classDetails.keyAttribute}}</span>
        <span>Hit Dice: {{classDetails.hitDice}}</span>

        <button
          v-if="characterStore.allAttributesSelected && characterStore.className===null"
          @click="selectClass(className)"
        >
          Select
        </button>
      </div>
        <p class="description">{{ classDetails.description}}</p>
      </div>
    </div>
  <template v-if="characterStore.className !== null">
    <DinamicComponent :data="classes[characterStore.className]" />
  </template>
</template>

<script>
import { useClassStore } from '../stores/classStore'
import { useCharacterStore } from '../stores/characterStore'
import { formatKey } from '@/utils/formatKey'
import DinamicComponent from './DinamicComponent.vue'
import { rollDiceWithSkip } from '@/utils/diceRoller';

export default {
  components: {
    DinamicComponent, // Register the component here
  },
  setup() {
    const {classes, allClasses} = useClassStore()
    const characterStore = useCharacterStore()

    const selectClass = className => {
      const { attributes, $patch} = characterStore
      const { hitDice } = classes[className]
      const HP =  rollDiceWithSkip(hitDice, null, 4 ) + attributes.find(a =>a.key === 'CON').mod
      $patch({
        className,
        hitDice,
        HP
      }); // Select the character class
    }

    return {
      classes,
      allClasses,
      selectClass,
      formatKey,
      characterStore,
    }
  },
}
</script>

<style scoped>
.flex-container {
  display: flex;                   /* Enable flexbox */
  flex-wrap: wrap;                /* Allow items to wrap into multiple rows */
  justify-content: space-around;  /* Distribute items evenly with space around them */
  align-content: space-between;    /* Align the rows if there's space */
  margin: 20px;                   /* Optional: Add margin around the container */
}

.flex-item {
  flex: 0 1 calc(30% - 20px);     /* Set the flex-basis to create responsive columns */
  margin: 10px;                   /* Add margin between items */
}

@media (max-width: 768px) {
  .flex-item {
    flex: 0 1 calc(45% - 20px);    /* Two columns on smaller screens */
  }
}

@media (max-width: 480px) {
  .flex-item {
    flex: 0 1 calc(100% - 20px);   /* Full width on mobile screens */
  }
}
.short-texts {
  display: flex;
  justify-content: space-between; /* Distribute short texts in one row */
  margin-bottom: 10px; /* Space below the short texts */
}

.short-texts span {
  margin-right: 10px; /* Optional spacing between short texts */
}

.description {
  margin-top: auto; /* Push the description to the bottom of the flex item */
}

</style>
