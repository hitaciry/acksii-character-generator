<script setup>
import CharacterSection from './CharacterSection.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import Attributes from './AttributeSelector.vue'
import Class from './ClassSelector.vue'
import SubclassSection from './SubclassSection.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { formatKey } from '@/utils/formatKey'
const format = key => formatKey(key)
const characterStore = useCharacterStore();
</script>

<template>
  <CharacterSection :isOpen="characterStore.className===null" >
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Character Attributes
      <p class="green" v-if="characterStore.allAttributesSelected">
        <template v-for="(attribute, index) in characterStore.attributes"
      :key="index">{{ attribute.key }}:{{ attribute.value }} &nbsp;
      </template>
      </p>
    </template>
    <Attributes />
  </CharacterSection>

  <CharacterSection :isOpen="characterStore.allAttributesSelected && characterStore.subclassTemplate === null">
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Select class
      <p class="green" v-if="characterStore.className">
        {{ format(characterStore.className)
        }}<strong> ✔ Selected</strong>
      </p>
    </template>
    <Class />
  </CharacterSection>

  <CharacterSection :isOpen="characterStore.className!==null">
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Roll subclass
      <p class="green" v-if="characterStore.subclassTemplate">
        {{ format(characterStore.subclassTemplate)
        }}<strong> ✔ Selected</strong>
      </p>
    </template>
    <SubclassSection />
  </CharacterSection>
</template>
