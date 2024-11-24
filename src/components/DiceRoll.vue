<template>
  <div>
    <div class="chat-container" v-if="isOpen">
      <div class="chat-header">
        <h2>Dice Roller</h2>
        <Button @click="toggleChat">X</Button>
      </div>
      <div class="chat-body">
        <InputText v-model="input" placeholder="Enter like '1d6'" />
        <Button @click="rollTheDice">Roll</Button>

        <div v-if="result">
          <h3>Results:</h3>
          <p>{{ result }}</p>
        </div>
        <div v-if="error" style="color: red">
          {{ error }}
        </div>

        <h3>Roll History:</h3>
        <div class="roll-history">
          <div v-for="(roll, index) in rollHistory" :key="index">
            {{ roll }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { rollDice } from '../utils/diceRoller';
import { useCharacterStore } from '../stores/characterStore'; 

// Accept props
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

// Emit event to inform parent that the state has been toggled
const emit = defineEmits(['update:isOpen']);

const characterStore = useCharacterStore();
const rollHistory = characterStore.rollHistory.reverse();
const input = ref('');
const result = ref(null);
const error = ref(null);

const toggleChat = () => {
  emit('update:isOpen', false); // Emit the updated state to the parent
};

const rollTheDice = () => {
  try {
    const { rolls, total } = rollDice(input.value);
    result.value = `Rolled: ${input.value} - Rolls: ${rolls.join(', ')} (Total: ${total})`;
    error.value = null;
  } catch (err) {
    error.value = err.message;
    result.value = null; // Reset result in case of error
  }
};
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

.roll-history {
  max-height: 200px; /* Set max height */
  overflow-y: auto; /* Enable vertical scrolling */
}
</style>