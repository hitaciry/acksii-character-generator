<script>
import DinamicComponent from './DinamicComponent.vue';
import { useCharacterStore } from '@/stores/characterStore';
import { useClassStore } from '@/stores/classStore';
import { rollDiceWithSkip, rollTheRange } from '@/utils/diceRoller';
export default {
  components:{DinamicComponent},
  setup(){
    const characterStore = useCharacterStore();
    const classStore = useClassStore();
    const rollSubclass = () =>{
      const $class = characterStore.class
      const { subclasses } = classStore.subClasses[$class.className]
      const rolledIndex = rollTheRange('3d6', subclasses.map(s =>s.roll))
      const subclass = subclasses[rolledIndex];
      const hitDice = rollDiceWithSkip($class.hitDice, null, 4 ) + characterStore.attributes.find(a =>a.key === 'CON').mod
      classStore.$patch({
        selectedSubclass: subclass
      })
      characterStore.$patch({
        subclass,
        hitDice
      })

    }
    return{
      characterStore, 
      rollSubclass
    }
  }
}
</script>

<template>
  <button v-if="characterStore.subclass===null && characterStore.class!==null" @click="rollSubclass()"> Roll hit dice and subclass </button>
  <DinamicComponent v-if="characterStore.hitDice" :data="{ hitDice: characterStore.hitDice }"/>
  <DinamicComponent v-if="characterStore.subclass" :data="characterStore.subclass" />
</template>

<style>
</style>