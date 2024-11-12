<script setup>
import CharacterSection from './CharacterSection.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import Attributes from './AttributeSelector.vue'
import Class from './ClassSelector.vue'
import SubclassSection from './SubclassSection.vue'
</script>

<template>
  <CharacterSection >
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Character Attributes</template>
    <Attributes />
  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Select class</template>
    <Class />
  </CharacterSection>

  <CharacterSection>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Roll subclass and HP</template>
    <SubclassSection />
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
