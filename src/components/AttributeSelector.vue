<template>
  <DataTable :value="characterStore.attributes" size="small">
    <Column field="name" header="Name"></Column>
    <Column field="value" header="Value"></Column>
    <Column field="mod" header="Modifier"></Column>
    <Column header="Roll">
      <template #body="attribute">
        <Button
          @click="generateAttribute(attribute.index)"
          :disabled="attribute.data.value !== null"
        >
          Roll
        </Button>
      </template>
    </Column>
    <template #footer>
      Total attributes modifiers sum: {{ characterStore.modSum }}.
      <span
        v-if="characterStore.allAttributesSelected && characterStore.modSum < 0"
        class="text-red-400"
      >
        The rules suggest to reroll attributes
      </span>
    </template>
  </DataTable>
</template>

<script setup>
import { rollAttribute } from '../utils/diceRoller'
import { useCharacterStore } from '../stores/characterStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
const characterStore = useCharacterStore()
const generateAttribute = index =>
  characterStore.setAttribute(
    index,
    rollAttribute(characterStore.nonNullAttributeCount),
  )
</script>
