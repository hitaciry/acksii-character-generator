<script setup>
import Stepper from 'primevue/stepper'
import StepItem from 'primevue/stepitem'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Dock from 'primevue/dock'
import Attributes from '@/components/AttributeSelector.vue'
import Class from '@/components/ClassSelector.vue'
import DownloadSection from '@/components/DownloadSection.vue'
import DiceRoll from '@/components/DiceRoll.vue'
import IconFabDice from '@/components/icons/IconFabDice.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { formatKey } from '@/utils/formatKey'
import { ref } from 'vue'
import { PrimeIcons } from '@primevue/core/api'
const format = key => formatKey(key)
const characterStore = useCharacterStore()
const isOpen = ref(false)
const toggleRollHistory = () => isOpen.value = !isOpen.value;
const items = ref([
  {
    label: 'Reset',
    icon: PrimeIcons.UNDO,
    command: () => {
      characterStore.$reset()
    },
  },
  {
    label: 'Roll History',
    icon: IconFabDice, // Direct reference to the imported icon
    command: toggleRollHistory,
  },
])
const onDockItemClick = (event, item) => {
  if (item.command) {
    item.command()
  }

  event.preventDefault()
}
</script>

<template>
  <Stepper value="1" linear>
    <StepItem value="1">
      <Step value="1">
        Character Attributes
        <span class="green" v-if="characterStore.allAttributesSelected">
          <template
            v-for="(attribute, index) in characterStore.attributes"
            :key="index"
            >{{ attribute.key }}:{{ attribute.value }} &nbsp;
          </template>
        </span>
      </Step>
      <StepPanel v-slot="{ activateCallback }">
        <Attributes />
        <div class="flex py-6">
          <Button
            label="Next"
            :disabled="!characterStore.allAttributesSelected"
            @click="activateCallback('2')"
          />
        </div>
      </StepPanel>
    </StepItem>
    <StepItem value="2">
      <Step value="2"
        >Select class
        <span class="green" v-if="characterStore.className">
          Class: {{ format(characterStore.className) }} &nbsp; Subclass:{{
            format(characterStore.subclassTemplate)
          }}
          &nbsp; Hit dice:{{ format(characterStore.hitDice) }} &nbsp; HP:{{
            format(characterStore.HP)
          }}
          &nbsp;
        </span>
      </Step>
      <StepPanel v-slot="{ activateCallback }">
        <Class />
        <div class="flex py-6 gap-2">
          <Button
            label="Back"
            severity="secondary"
            @click="activateCallback('1')"
          />
          <Button
            label="Next"
            :disabled="characterStore.className === null"
            @click="activateCallback('3')"
          />
        </div>
      </StepPanel>
    </StepItem>
    <StepItem value="3">
      <Step value="3">Save character</Step>
      <StepPanel v-slot="{ activateCallback }">
        <DownloadSection />
        <div class="flex py-6 gap-2">
          <Button
            label="Back"
            severity="secondary"
            @click="activateCallback('2')"
          />
        </div>
      </StepPanel>
    </StepItem>
  </Stepper>
  <Dock breakpoint="10px" :model="items">
    <template #item="{ item }">
      <a
        v-tooltip="item.label"
        href="#"
        class="p-dock-item-link"
        @click="onDockItemClick($event, item)"
      >
        <template v-if="typeof item.icon === 'string'">
          <i :class="item.icon" style="font-size: 2rem"></i>
        </template>
        <template v-else>
          <component :is="item.icon" />
        </template>
      </a>
    </template>
  </Dock>
  <DiceRoll :isOpen="isOpen" @update:isOpen="toggleRollHistory" />
</template>
