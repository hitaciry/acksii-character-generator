<template>
  <table v-if="isTable(data)">
    <thead>
      <tr>
        <!-- Dynamically create table headers -->
        <th v-for="key in Object.keys(data[0])" :key="key">
          {{ formatKey(key) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <!-- Dynamically create table cells -->
        <td v-for="[key, value] in Object.entries(item)" :key="key">
          <DinamicComponent :data="value" />
        </td>
      </tr>
    </tbody>
  </table>
  <ul
    v-else-if="Array.isArray(data)"
    v-for="(item, index) in data"
    :key="index"
  >
    <li>
      <DinamicComponent :data="item" />
    </li>
  </ul>
  <ul
    v-else-if="isObject(data)"
    v-for="[key, value] in Object.entries(data)"
    :key="key"
  >
    <li v-if="isObject(value) || Array.isArray(value)">
      <h3>{{ formatKey(key) }}:</h3>
      <DinamicComponent :data="value" />
    </li>
    <li v-else>
      <strong>{{ formatKey(key) }}:</strong> {{ value }}
    </li>
  </ul>
  <p v-else>
    {{ data }}
  </p>
</template>

<script>
import { formatKey } from '@/utils/formatKey';
export default {
  name: 'DinamicComponent',
  props: {
    data: {
      type: [Object, Array, String, Number, Boolean],
      required: true,
    },
  },
  methods: {
    isObject(value) {
      return value !== null && typeof value === 'object'
    },
    isTable(arr) {
      // Check if arr is an array
      if (!Array.isArray(arr) || arr.length === 0) {
        return false // or handle as needed (e.g., return true for empty arrays)
      }

      // Get the keys of the first object
      const keys = Object.keys(arr[0])

      for (const item of arr) {
        // Check if item is an object and not null
        if (typeof item !== 'object' || item === null) {
          return false // Not an object
        }

        // Get the keys of the current object
        const currentKeys = Object.keys(item)

        // Check if current object's keys are the same as the first object's keys
        if (
          currentKeys.length !== keys.length ||
          !currentKeys.every(key => keys.includes(key))
        ) {
          return false // Keys do not match
        }
      }

      return true // All checks passed; all elements are objects and have the same keys
    },
    formatKey
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 10px;
}
h3 {
  margin: 5px 0;
}
</style>
