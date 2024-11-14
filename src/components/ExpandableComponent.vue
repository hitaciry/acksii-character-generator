<template>
  <div class="expandable">
    <div class="header" @click="toggle">
      <span>{{ title }}</span>
      <span class="arrow"
        ><i v-if="isOpen"><MdRoundExpandLess /></i
        ><i v-else><MdRoundExpandMore /></i
      ></span>
    </div>
    <div v-if="isOpen" class="content">
      <slot></slot>
      <!-- This allows you to pass any content into the component -->
    </div>
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
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.expandable {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f5f5f5;
  cursor: pointer;
}

.content {
  padding: 10px;
  border-top: 1px solid #ccc;
}
.arrow {
  margin-left: 10px;
}
</style>
