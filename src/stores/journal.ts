import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journal', {
  state: () => ({
    entries: [] as { mood: string; text: string; date: string }[],
  }),
  actions: {
    addEntry(entry: { mood: string; text: string; date: string }) {
      this.entries.push(entry)
      localStorage.setItem('journalEntries', JSON.stringify(this.entries))
    },
    loadEntries() {
      const saved = localStorage.getItem('journalEntries')
      if (saved) {
        this.entries = JSON.parse(saved)
      }
    },
  },
})
