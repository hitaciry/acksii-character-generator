<template>
  <div class="item">
    <i @click="toggleExpand">
      <slot name="icon"></slot>
    </i>
    <div @click="toggleExpand" class="header">
      <!-- Add click to toggle on heading -->
      <span>
        <slot name="heading"></slot>
      </span>
      <span class="arrow">
        <MdRoundExpandLess v-if="internalIsOpen" />
        <MdRoundExpandMore v-else />
      </span>
    </div>
  </div>
  <div v-if="internalIsOpen">
    <!-- Show content conditionally based on isOpen -->
    <slot></slot>
  </div>
</template>

<script>
import { MdRoundExpandLess } from '@kalimahapps/vue-icons'
import { MdRoundExpandMore } from '@kalimahapps/vue-icons'
export default {
  components: {
    MdRoundExpandLess,
    MdRoundExpandMore,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false, // Default to false if not provided
    },
  },
  data() {
    return {
      internalIsOpen: this.isOpen, // Initialize with the prop value
    }
  },
  methods: {
    toggleExpand() {
      this.internalIsOpen = !this.internalIsOpen // Toggle internal state
    },
  },
  watch: {
    // Watch for changes to the prop to update internal state
    isOpen(newVal) {
      this.internalIsOpen = newVal
    },
  },
}
</script>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
  cursor: pointer; /* Change cursor to indicate clickability */
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

.header {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  margin-left: 1rem;  
  color: var(--color-heading);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
}
.arrow {
  margin-left: 10px;
}
</style>
