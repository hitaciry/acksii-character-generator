import { defineStore } from 'pinia'

import classData from '../assets/classes.json' // Adjust the path as needed
import subClasses from '../assets/subclasses.json'

export const useClassStore = defineStore('class', {
  state: () => ({
    classes: classData, // Store all classes data
    selectedClass: null, // To store selected class if needed
    subClasses: subClasses,
    selectedSubclass: null,
  }),
  actions: {
    selectClass(className) {
      if (this.classes[className]) {
        this.selectedClass = this.classes[className] // Return selected class
        return this.classes[className]
      } else {
        throw new Error('Class not found')
      }
    },
    selectSubclass(subclassName) {
      if (this.subClasses[subclassName]) {
        this.selectedSublass = this.subClasses[subclassName] // Return selected class
        return this.subClasses[subclassName]
      } else {
        throw new Error('Subclass not found')
      }
    },
  },
  getters: {
    allClasses(state) {
      return Object.keys(state.classes) // Returns an array of class names
    },
    allSubclasses(state) {
      return Object.keys(state.subclass)
    },
    getClassByName(state) {
      return className => state.classes[className] || null // Get class data by name
    },
  },
})
