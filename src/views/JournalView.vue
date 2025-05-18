<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMoodStore } from '@/stores/mood'
import { useJournalStore } from '@/stores/journal'
import { useRouter } from 'vue-router'

const router = useRouter()
const moodStore = useMoodStore()
const journalStore = useJournalStore()

const entry = ref('')

// Generate prompt based on mood
const prompt = computed(() => {
  const mood = moodStore.selectedMood
  switch (mood) {
    case 'Happy':
      return 'What made you feel happy today?'
    case 'Sad':
      return 'What’s been bothering you lately?'
    case 'Anxious':
      return 'What’s making you anxious?'
    case 'Grateful':
      return 'What are you thankful for today?'
    case 'Tired':
      return 'What drained your energy today?'
    default:
      return 'What’s on your mind today?'
  }
})

const saveEntry = () => {
  journalStore.addEntry({
    mood: moodStore.selectedMood,
    text: entry.value,
    date: new Date().toISOString(),
  })
  router.push('/challenge') // next step in the flow
}
</script>

<template>
  <div class="max-w-xl mx-auto space-y-6">
    <h2 class="text-2xl font-bold">Journal</h2>
    <p class="text-lg">{{ prompt }}</p>

    <textarea
      v-model="entry"
      class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="5"
      placeholder="Write 1–2 sentences here..."
    ></textarea>

    <div class="flex space-x-4">
      <button
        @click="saveEntry"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save
      </button>

      <RouterLink
        to="/journal/history"
        class="text-blue-600 underline hover:text-blue-800 self-center"
      >
        View Past Entries
      </RouterLink>
    </div>
  </div>
</template>
