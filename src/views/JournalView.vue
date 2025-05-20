<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMoodStore } from '@/stores/mood'
import { useJournalStore } from '@/stores/journal'

const moodStore = useMoodStore()
const journalStore = useJournalStore()

const today = new Date()
const todayStr = today.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})
const todayISO = today.toISOString().slice(0, 10)

const moods = [
  { label: '😃', value: 'Great' },
  { label: '🙂', value: 'Okay' },
  { label: '😐', value: 'Meh' },
  { label: '🙁', value: 'Down' },
  { label: '😢', value: 'Sad' },
]
const selectedMood = ref(moodStore.selectedMood || '')

const prompts = [
  'What challenged you most today?',
  'What are you grateful for right now?',
  'What did you learn today?',
  'What would you like to improve tomorrow?',
  'Who made a positive impact on you today?',
]
const promptIdx = ref(0)
const prompt = computed(() => prompts[promptIdx.value])
function shufflePrompt() {
  let idx = promptIdx.value
  while (idx === promptIdx.value) {
    idx = Math.floor(Math.random() * prompts.length)
  }
  promptIdx.value = idx
}

const entry = ref('')
const tags = [
  { icon: '🧠', label: '成長' },
  { icon: '🏋', label: '健康' },
  { icon: '❤️', label: 'Love' },
  { icon: '💼', label: 'Work' },
  { icon: '💰', label: 'Finance' },
  { icon: '🧘', label: 'Calm' },
]
const selectedTags = ref<string[]>([])
const showCustomTagInput = ref(false)
const customTag = ref('')
const addCustomTag = () => {
  if (customTag.value && !selectedTags.value.includes(customTag.value)) {
    selectedTags.value.push(customTag.value)
    customTag.value = ''
    showCustomTagInput.value = false
  }
}
const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag)
  } else if (selectedTags.value.length < 3) {
    selectedTags.value.push(tag)
  }
}

// Timer
const startTime = ref<number | null>(null)
const elapsed = ref(0)
const timer = ref<NodeJS.Timeout | null>(null)
function startTimer() {
  if (timer.value) return
  startTime.value = Date.now()
  timer.value = setInterval(() => {
    elapsed.value = Math.floor((Date.now() - (startTime.value || Date.now())) / 1000)
  }, 1000)
}
function stopTimer() {
  if (timer.value) clearInterval(timer.value)
  timer.value = null
}
function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

watch(entry, (val, old) => {
  if (val && !old) startTimer()
  if (!val) {
    stopTimer()
    elapsed.value = 0
  }
})

const saveEntry = () => {
  if (!selectedMood.value || !entry.value.trim()) return
  journalStore.addEntry({
    mood: selectedMood.value,
    text: entry.value,
    date: todayISO,
    tags: [...selectedTags.value],
    seconds: elapsed.value,
  })
  entry.value = ''
  selectedTags.value = []
  moodStore.setMood(selectedMood.value)
  stopTimer()
  elapsed.value = 0
  if (typeof journalStore.loadEntries === 'function') journalStore.loadEntries()
}

if (typeof journalStore.loadEntries === 'function') journalStore.loadEntries()
// Ensure entries are loaded from localStorage if not already
if (!journalStore.entries || journalStore.entries.length === 0) {
  const saved = localStorage.getItem('journalEntries')
  if (saved) {
    journalStore.entries = JSON.parse(saved)
  }
}
const pastEntries = computed(() => journalStore.entries)
const expanded = ref<string | null>(null)

// Streak calculation
const streak = computed(() => {
  const dates = (journalStore.entries || [])
    .map((e) => e.date)
    .sort()
    .reverse()
  let count = 0
  const d = new Date(todayISO)
  for (let i = 0; i < dates.length; i++) {
    if (dates[i] === d.toISOString().slice(0, 10)) {
      count++
      d.setDate(d.getDate() - 1)
    } else if (i === 0) {
      break
    }
  }
  return count
})
</script>

<template>
  <div class="max-w-xl mx-auto space-y-6 p-2">
    <div class="bg-white rounded-2xl shadow p-4">
      <div class="flex items-center gap-2 text-lg font-bold mb-2">📓 Journal</div>
      <div class="flex justify-between text-sm text-gray-500 mb-2">
        <span>🗓️ Today: {{ todayStr }}</span>
        <span>🔥 Streak: {{ streak }} days</span>
      </div>
      <div class="mb-3">
        <div class="font-semibold mb-1">😄 How are you feeling today?</div>
        <div class="flex gap-2">
          <button
            v-for="m in moods"
            :key="m.value"
            @click="selectedMood = m.value"
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center text-2xl border transition',
              selectedMood === m.value
                ? 'bg-blue-100 border-blue-500 scale-110'
                : 'bg-gray-50 border-gray-200 hover:bg-blue-50',
            ]"
          >
            {{ m.label }}
          </button>
        </div>
      </div>
      <div class="mb-3">
        <div class="font-semibold mb-1 flex items-center gap-2">
          💬 Prompt of the Day
          <button
            @click="shufflePrompt"
            class="ml-2 px-2 py-1 rounded bg-gray-100 text-xs hover:bg-blue-100"
          >
            🔄 Shuffle Prompt
          </button>
        </div>
        <div class="italic text-gray-700 mb-1">“{{ prompt }}”</div>
      </div>
      <div class="mb-3">
        <div class="font-semibold mb-1">📝 Your Reflection</div>
        <textarea
          v-model="entry"
          class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base resize-none"
          rows="3"
          maxlength="240"
          placeholder="Share your thoughts..."
        ></textarea>
      </div>
      <div class="mb-3">
        <div class="font-semibold mb-1">🏷️ Tags (select up to 3):</div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in tags"
            :key="tag.icon + tag.label"
            @click="toggleTag(tag.label)"
            :class="[
              'px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition',
              selectedTags.includes(tag.label)
                ? 'bg-blue-100 border-blue-400 text-blue-700 font-semibold'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-blue-50',
            ]"
            :disabled="selectedTags.length >= 3 && !selectedTags.includes(tag.label)"
          >
            <span>{{ tag.icon }}</span> <span>{{ tag.label }}</span>
          </button>
          <button
            v-if="!showCustomTagInput"
            @click="showCustomTagInput = true"
            class="px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-400 text-sm hover:bg-gray-100"
          >
            ➕ Add Tag
          </button>
          <div v-else class="flex items-center gap-1">
            <input
              v-model="customTag"
              class="px-2 py-1 border rounded text-sm w-24"
              placeholder="Tag"
              @keyup.enter="addCustomTag"
            />
            <button @click="addCustomTag" class="text-blue-600 text-sm font-semibold">Add</button>
            <button @click="showCustomTagInput = false" class="text-gray-400 text-sm">✕</button>
          </div>
        </div>
      </div>
      <div class="mb-3 flex items-center gap-2 text-sm text-gray-500">
        <span>⏱️ Reflection Time: {{ formatTime(elapsed) }}</span>
      </div>
      <div class="flex flex-col items-center mt-4">
        <button
          @click="saveEntry"
          :disabled="!selectedMood || !entry.trim()"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow"
        >
          ✅ Submit Journal
        </button>
        <div class="text-xs text-gray-400 mt-1">You’re building a powerful habit!</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow p-4">
      <div class="flex items-center gap-2 text-lg font-bold mb-2">🕰️ Recent Entries</div>
      <div v-if="pastEntries && pastEntries.length === 0" class="text-gray-400 text-sm">
        No past entries yet.
      </div>
      <div v-for="e in pastEntries || []" :key="e.date + e.mood + e.text" class="mb-2">
        <div
          class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-2"
          @click="expanded === e.date ? (expanded = null) : (expanded = e.date)"
        >
          <span class="text-base"
            >•
            {{ new Date(e.date).toLocaleString('en-US', { month: 'short', day: 'numeric' }) }}
            –</span
          >
          <span class="text-xl">{{ moods.find((m) => m.value === e.mood)?.label || '📝' }}</span>
          <span class="font-semibold text-gray-700">{{ e.mood }}</span>
          <span class="flex gap-1">
            <span
              v-for="tag in e && 'tags' in e && Array.isArray(e.tags) ? e.tags : []"
              :key="tag"
              class="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-500 border border-gray-200"
              >{{ tag }}</span
            >
          </span>
          <span
            v-if="'seconds' in e && typeof e.seconds === 'number' && e.seconds > 0"
            class="text-xs text-gray-400 ml-2"
            >({{ formatTime(Number(e.seconds)) }})</span
          >
        </div>
        <div
          v-if="expanded === e.date"
          class="ml-8 text-gray-700 text-sm border-l-2 border-blue-100 pl-4 py-1"
        >
          {{ e.text }}
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <button class="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline">
          📂 View All Journals →
        </button>
      </div>
    </div>
  </div>
</template>
