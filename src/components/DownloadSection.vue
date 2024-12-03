<script setup>
import { useCharacterStore } from '@/stores/characterStore'
const characterStore = useCharacterStore()
const save = () => {
  const characterData = JSON.stringify(characterStore.$state) // Fetch the current character store state
  const blob = new Blob([characterData], { type: 'application/json' }) // Create a blob from the data
  const url = URL.createObjectURL(blob) // Create a URL for the blob

  const link = document.createElement('a') // Create a temporary anchor element
  link.href = url // Set the URL as the href
  link.download = `${characterStore.name}.json` // Set the default file name

  document.body.appendChild(link) // Append link to the document
  link.click() // Programmatically click the link to trigger the download
  document.body.removeChild(link) // Remove the link from the DOM
  URL.revokeObjectURL(url) // Clean up the URL object
}
</script>

<template>
  <div class="flex items-baseline m-5 gap-5">
    <FloatLabel>
      <InputText id="characterName" v-model="characterStore.name" />
      <label for="characterName">Character name</label>
    </FloatLabel>
    <Button
      label="Submit"
      :disabled="characterStore.name === null"
      @click="save()"
    >
      Download
    </Button>
  </div>
</template>
