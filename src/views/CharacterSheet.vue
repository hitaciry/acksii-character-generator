<template>
  <h1>{{ characterStore.characterName }}</h1>

  <div class="grid space-y-4 md:grid-cols-3 md:space-x-4 m-5">
    <div>
      <h2>Attributes</h2>
      <div
        class="flex place-content-between space-x-4"
        v-for="(attribute, index) in characterStore.attributes"
        :key="index"
      >
        <span class="flex-1">{{ attribute.name }}:</span>
        <span>{{
          attribute.value !== null ? attribute.value : 'Not Set'
        }}</span>
        <span>{{ attribute.mod !== null ? attribute.mod : 'Not Set' }}</span>
      </div>
    </div>
    <div>
      <h2>Class: {{ characterStore.className }}</h2>
      <div class="flex justify-between">
        <strong>HD:</strong>
        <span>{{ characterStore.hitDice }}</span>
      </div>
      <div class="flex justify-between">
        <strong>HP:</strong>
        <InputNumber size="small" :default-value="characterStore.HP" />
        <span> of {{ characterStore.HP }}</span>
      </div>
    </div>
    <div>
      <h2>Inventory</h2>
      <DinamicComponent :data="characterStore.startingEquipment" />
    </div>
  </div>
</template>

<script setup>
import DinamicComponent from '@/components/DinamicComponent.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useClassStore } from '@/stores/classStore'

const characterStore = useCharacterStore() // Access the character store
const { classes } = useClassStore()
</script>
