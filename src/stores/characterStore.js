// src/stores/characterStore.js
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => {
    return {
      attributes: [
        { name: 'Strength (STR)', value: null, key: 'STR', mod: null },
        { name: 'Dexterity (DEX)', value: null, key: 'DEX', mod: null },
        { name: 'Constitution (CON)', value: null, key: 'CON', mod: null },
        { name: 'Intellect (INT)', value: null, key: 'INT', mod: null },
        { name: 'Will (WIL)', value: null, key: 'WIL', mod: null },
        { name: 'Charisma (CHA)', value: null, key: 'CHA', mod: null },
      ],
      className: null,
      subclassTemplate: null,
      rollHistory: [], // Add this line for roll history
      hitDice: null,
      HP: null,
      name: null,
      proficiencies: null,
      startingEquipment: null,
    }
  },
  actions: {
    addRollToHistory(roll) {
      this.rollHistory.push(roll) // Add new roll to the history
    },
    setAttribute(index, value) {
      this.attributes[index].value = value
      this.attributes[index].mod = attributeModifier(value)
    },
    nextStep(step) {
      this.step = step
    },
  },
  getters: {
    nonNullAttributeCount(state) {
      return state.attributes.filter(attribute => attribute.value !== null)
        .length
    },
    allAttributesSelected(state) {
      return state.attributes.every(attribute => attribute.value !== null)
    },
    modSum(state) {
      return state.attributes.reduce((a, n) => a + n.mod, 0)
    },
  },
})

function attributeModifier(value) {
  if (value === 3) return -3
  if (value <= 5) return -2
  if (value <= 8) return -1
  if (value <= 12) return 0
  if (value <= 15) return 1
  if (value <= 17) return 2
  if (value === 18) return 3

  return 0 // Fallback; shouldn't be reached
}
