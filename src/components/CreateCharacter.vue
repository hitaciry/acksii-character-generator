<script>
import CharacterSection from './CharacterSection.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import Attributes from './AttributeSelector.vue'
import Class from './ClassSelector.vue'
import { useCharacterStore } from '../stores/characterStore'
export default {
  components: {
    CharacterSection, // Register the component here
    DocumentationIcon,
    Class,
    Attributes,
    ToolingIcon,
    EcosystemIcon,
    CommunityIcon,
    SupportIcon
  },
  setup() {
    const store = useCharacterStore();
    return{
      store
    }
  }}
</script>

<template>
  <button @click="store.$reset">Reset</button>
  <CharacterSection >
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Character Attributes</template>
    <Attributes v-if="store.step===null" />
  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Select class</template>
    <Class v-if="store.step==='Select class'"/>
  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Roll subclass and HP</template>

  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

   
  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support </template>

   
  </CharacterSection>
</template>
