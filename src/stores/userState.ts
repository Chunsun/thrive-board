// stores/userState.ts
import { defineStore } from 'pinia'

export const useUserState = defineStore('userState', {
  state: () => ({
    mood: '',
  }),
  actions: {
    setMood(newMood: string) {
      this.mood = newMood
    },
  },
})
