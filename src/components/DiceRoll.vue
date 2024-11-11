<template>
  <div>
    <div class="chat-container" v-if="isOpen">
      <div class="chat-header">
        <h2>Dice Roller</h2>
        <button @click="toggleChat" class="close-button">X</button>
      </div>
      <div class="chat-body">
        <input v-model="input" placeholder="Enter like '1d6'" />
        <button @click="rollTheDice">Roll</button>
        <div v-if="result">
          <h3>Results:</h3>
          <p>{{ result }}</p>
        </div>
        <div v-if="error" style="color: red">
          {{ error }}
        </div>
        <div></div>
        <h3>Roll History:</h3>
        <div class="roll-history">
          <div v-for="(roll, index) in rollHistory" :key="index">
            {{ roll }}
          </div>
        </div>
      </div>
    </div>

    <button class="fab" @click="toggleChat">
      <IconFabDice />
    </button>
  </div>
</template>

<script>
import { rollDice } from '../utils/diceRoller'
import IconFabDice from './icons/IconFabDice.vue'
import { useCharacterStore } from '../stores/characterStore' // Importing the store
export default {
  components: {
    IconFabDice,
  },
  setup() {
    const characterStore = useCharacterStore()

    return {
      rollHistory: characterStore.rollHistory.reverse()
    }
  },
  data() {
    return {
      isOpen: false,
      input: '',
      result: null,
      error: null,
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
    },
    rollTheDice() {
      try {
        const { rolls, total } = rollDice(this.input)
        this.result = `Rolled: ${this.input} - Rolls: ${rolls.join(', ')} (Total: ${total})`
        this.error = null
      } catch (err) {
        this.error = err.message
        this.results = null
      }
    },
  },
}
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 300px;
  background: var(--color-background);
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.chat-body {
  padding: 10px;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: transparent; /* Transparent background */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}

.fab svg {
  fill: var(--color-text); /* Icon color */
  width: 55px; /* Set size */
  height: 55px; /* Set size */
}

.roll-history {
  max-height: 200px; /* Set max height */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>
