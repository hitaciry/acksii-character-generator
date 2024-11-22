<script setup>
import DinamicComponent from './DinamicComponent.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'
import { rollTheRange } from '@/utils/diceRoller'
const characterStore = useCharacterStore()
const { subClasses } = useClassStore()
const rollSubclass = () => {
  const className = characterStore.className
  const rolledIndex = rollTheRange(
    '3d6',
    subClasses[className].map(s => s.roll),
  )
  const { template, proficiencies, startingEquipment } =
    subClasses[className][rolledIndex]
  characterStore.$patch({
    proficiencies,
    startingEquipment,
    subclassTemplate: template,
  })
}
</script>

<template>
  <Button
    label="Submit"
    v-if="
      characterStore.className !== null &&
      characterStore.subclassTemplate === null
    "
    @click="rollSubclass()"
  >
    Roll subclass
  </Button>
  <DinamicComponent
    v-if="characterStore.subclassTemplate"
    :data="{
      template: characterStore.subclassTemplate,
      proficiencies: characterStore.proficiencies,
      startingEquipment: characterStore.startingEquipment,
    }"
  />
</template>

<style></style>
