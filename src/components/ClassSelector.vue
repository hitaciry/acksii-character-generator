<template>
  <div
    v-if="characterStore.className === null"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <Fieldset
      :toggleable="true"
      pt:legend:class="ml-auto"
      v-for="[className, classDetails] in Object.entries(classStore.classes)"
      :key="className"
    >
      <template #legend>
        <div class="flex items-center gap-2">
          <label :for="className" class="flex gap-2">
            <strong class="flex-1">{{ formatKey(className) }}</strong>
            <span>{{ classDetails.keyAttribute }}</span>
            <span>Hit Dice: {{ classDetails.hitDice }}</span>
          </label>
          <Checkbox
            :inputId="className"
            size="small"
            @change="selectClass(className)"
          />
        </div>
      </template>
      <p>{{ classDetails.description }}</p>
    </Fieldset>
  </div>
  <template v-if="characterStore.className !== null">
    <Panel toggleable="true" collapsed="true" header="Class information">
      <DinamicComponent :data="classStore.classes[characterStore.className]" />
    </Panel>
    <Panel toggleable="true" collapsed="true" header="Subclass information">
      <DinamicComponent
        :data="{
          template: characterStore.subclassTemplate,
          proficiencies: characterStore.proficiencies,
          startingEquipment: characterStore.startingEquipment,
        }"
      />
    </Panel>
  </template>
</template>

<script setup>
import { useClassStore } from '../stores/classStore'
import { useCharacterStore } from '../stores/characterStore'
import { formatKey } from '@/utils/formatKey'
import { rollDiceWithSkip, rollTheRange } from '@/utils/diceRoller'
import DinamicComponent from './DinamicComponent.vue'
import Fieldset from 'primevue/fieldset'
import Checkbox from 'primevue/checkbox'
import Panel from 'primevue/panel'

const classStore = useClassStore()
const characterStore = useCharacterStore()

const selectClass = className => {
  const { attributes, $patch } = characterStore
  const { classes, subClasses } = classStore
  const { hitDice } = classes[className]
  const HP =
    rollDiceWithSkip(hitDice, null, 4) +
    attributes.find(a => a.key === 'CON').mod
  const rolledIndex = rollTheRange(
    '3d6',
    subClasses[className].map(s => s.roll),
  )
  const { template, proficiencies, startingEquipment } =
    subClasses[className][rolledIndex]
  $patch({
    className,
    hitDice,
    HP,
    proficiencies,
    startingEquipment,
    subclassTemplate: template,
  }) // Select the character class
}
</script>
