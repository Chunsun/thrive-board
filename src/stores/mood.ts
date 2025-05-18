import { defineStore } from 'pinia'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    selectedMood: '',
  }),
  actions: {
    setMood(mood: string) {
      this.selectedMood = mood
    },
  },
})
