<script>
import DinamicComponent from './DinamicComponent.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'
import { rollTheRange } from '@/utils/diceRoller'
export default {
  components: { DinamicComponent },
  setup() {
    const characterStore = useCharacterStore();
    const { subClasses } = useClassStore();
    const rollSubclass = () => {
      const className = characterStore.className;
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
    return {
      subClass: {
        template: characterStore.subclassTemplate,
        proficiencies: characterStore.proficiencies,
        startingEquipment: characterStore.startingEquipment,
      },
      characterStore,
      rollSubclass,
    }
  },
}
</script>

<template>
  <button
    v-if="characterStore.className !== null && characterStore.subclassTemplate===null"
    @click="rollSubclass()"
  >
    Roll subclass
  </button>
  <DinamicComponent
    v-if="characterStore.subclassTemplate"
    :data="subClass"
  />
</template>

<style></style>
