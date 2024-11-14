import { defineStore } from 'pinia'

import classData from '../assets/classes.json' // Adjust the path as needed
import subClassData from '../assets/subclasses.json'

export const useClassStore = defineStore('class', {
  state: () => ({
    classes: classData, // Store all classes data
    subClasses: subClassData,
  }),
  getters: {
    allClasses(state) {
      return Object.keys(state.classes) // Returns an array of class names
    }
  },
})
