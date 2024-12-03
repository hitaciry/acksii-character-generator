import { defineStore } from 'pinia'

import sourceData from '@/assets/spells.json'

export const useSpellStore = defineStore('spell', {
  state: () => ({
    source: sourceData,
  }),

  actions: {
    // You can add any actions related to spell management or modification here
    getSpellCost(spell) {
      if (!spell) return 0

      let baseCost = this.blast.damageEffects[spell.damageEffect] || 0
      let maxModifier = this.blast.maxDamageModifiers[spell.maxDamage] || 1
      let targetFactor = this.blast.targetFactors[spell.target] || 1
      let rangeFactor = this.blast.rangeFactors[spell.range] || 1
      let durationFactor = this.blast.durationFactors[spell.duration] || 1
      let savingThrowFactor =
        this.blast.savingThrowFactors[spell.savingThrow] || 1
      let sourceFactor = this.blast.sourceFactors[spell.source] || 1

      return Math.round(
        baseCost *
          maxModifier *
          targetFactor *
          rangeFactor *
          durationFactor *
          savingThrowFactor *
          sourceFactor,
      ) // Round to the nearest whole number
    },
  },
  getters: {
    spellTypes(state) {
      /*spellTypes: [
      'blast',
      'Death',
      'Detection',
      'Elemental',
      'Enchantment',
      'Healing',
      'Illusion',
      'Movement',
      'Protection',
      'Summoning',
      'Transmogrification',
      'Wall',
      'Esoteric',
    ],*/
      return Object.keys(state.source)
    },
  },
})
