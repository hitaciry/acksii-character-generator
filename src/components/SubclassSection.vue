<script>
import DinamicComponent from './DinamicComponent.vue';
import { useCharacterStore } from '@/stores/characterStore';
import { useClassStore } from '@/stores/classStore';
import { rollDiceWithSkip, rollTheRange } from '@/utils/diceRoller';
export default {
  components:[DinamicComponent],
  setup(){
    const characterStore = useCharacterStore();
    const classStore = useClassStore();
    const subclass = classStore.subClasses[classStore.selectedClass][rollTheRange('3d6', classStore.subClasses[classStore.selectedClass].map(s =>s.roll))];
    const hitDice = rollDiceWithSkip(characterStore.selectClass.hitDice, null, 4 ) + characterStore.attributes.find(a =>a.key === 'CON').mod
    characterStore.$patch({
      subclass,
      hitDice
    })
    return{
      characterStore
    }
  }
}
</script>

<template>
  <DinamicComponent :data="characterStore.subclass" />
  <DinamicComponent :data="{ hitDice: characterStore.hitDice }"/>
</template>

<style>
</style>