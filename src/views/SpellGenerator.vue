<template>
  <h2 class="mb-5">Generate Spell</h2>
  <FloatLabel class="w-full sm:w-56 mt-10">
    <Select
      class="w-full"
      showClear
      v-model="spell.type"
      :options="spellTypes"
      :option-label="formatKey"
      id="spellType"
      @change="resetEffectsAndModifiers"
    />
    <label for="spellType">Spell Type:</label>
  </FloatLabel>

  <template v-if="spell.type">
    <template v-if="spellStore.source[spell.type]?.effects">
      <h3 class="my-5">Effects:</h3>
      <div class="flex flex-wrap justify-start items-end gap-4">
        <FloatLabel
          v-for="(effectGroup, groupKey) in spellStore.source[spell.type]
            .effects"
          :key="groupKey"
          class="w-full sm:w-56 mt-5"
        >
          <Select
            class="w-full"
            showClear
            v-model="spell.effects[groupKey]"
            :options="effectGroup"
            optionLabel="label"
            :inputId="groupKey"
          />
          <label :for="groupKey">{{ formatKey(groupKey) }}</label>
        </FloatLabel>
      </div>
    </template>

    <template v-if="spellStore.source[spell.type].modifiers">
      <h3 class="my-5">Modifiers:</h3>
      <div class="flex flex-wrap justify-start items-end gap-4">
        <FloatLabel
          v-for="(modifierGroup, groupKey) in spellStore.source[spell.type]
            .modifiers"
          :key="groupKey"
          class="w-full sm:w-56 mt-5"
        >
          <Select
            class="w-full"
            showClear
            :inputId="groupKey"
            :options="modifierGroup"
            optionLabel="label"
            v-model="spell.modifiers[groupKey]"
          />
          <label :for="groupKey">{{ formatKey(groupKey) }}</label>
        </FloatLabel>
      </div>
    </template>
    <h3 class="my-5">Total Spell Cost: {{ calculateSpellCost() }}</h3>

    <Button @click="generateSpell">Generate Spell</Button>
    <p class="my-5" v-if="generatedSpell">{{ generatedSpell }}</p>
  </template>
</template>

<script setup>
import { ref } from 'vue'
import { useSpellStore } from '@/stores/spellStore'
import { formatKey } from '@/utils/formatKey'
import { Button } from 'primevue'
import axios from 'axios'

// Define spell state
const spell = ref({
  type: '',
  effects: {},
  modifiers: {},
  level: 0,
})

// Access spell store and its types
const spellStore = useSpellStore()
const spellTypes = spellStore.spellTypes // Access spell types from the store

const generatedSpell = ref('')

// Function to reset effects and modifiers when spell type changes
const resetEffectsAndModifiers = () => {
  spell.value.effects = {}
  spell.value.modifiers = {}
}

// Function to calculate total spell cost
const calculateSpellCost = () => {
  let totalCost = 0

  // Sum the costs of selected effects
  for (const effectKey in spell.value.effects) {
    const effect = spell.value.effects[effectKey]
    if (effect && effect.cost) {
      totalCost += effect.cost // Sum effect costs
    }
  }

  // Multiply total cost by selected modifiers
  for (const modifierKey in spell.value.modifiers) {
    const modifier = spell.value.modifiers[modifierKey]
    if (modifier && modifier.multiplier) {
      totalCost *= modifier.multiplier // Apply multiplier
    }
  }
  spell.value.level = Math.ceil(totalCost / 10)

  return totalCost // Return the cost rounded to the nearest integer
}

const generateSpell = async () => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3.2-3B-Instruct',
        messages: [
          {
            role: 'system',
            content:
              'Create a spell description based on the following JSON, ignore cost and multiplier values',
          },
          {
            role: 'user',
            content: JSON.stringify(spell.value),
          },
        ],
        temperature: 0.5,
        max_tokens: 256,
        top_p: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      },
    )
    console.log(response)
    generatedSpell.value = response.data.choices[0].message.content.trim()
  } catch (error) {
    generatedSpell.value =
      'Error: ' +
      (error.response ? error.response.data.error.message : error.message)
  }
}
</script>

<style scoped></style>
