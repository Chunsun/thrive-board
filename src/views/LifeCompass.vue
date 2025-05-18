/// views/Compass.vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMoodStore } from '@/stores/mood'

const router = useRouter()
const store = useMoodStore()

const moods = [
  { label: '😊 Happy', value: 'happy', color: 'bg-yellow-300' },
  { label: '😐 Okay', value: 'okay', color: 'bg-gray-300' },
  { label: '😔 Sad', value: 'sad', color: 'bg-blue-300' },
  { label: '😠 Angry', value: 'angry', color: 'bg-red-300' },
  { label: '😰 Anxious', value: 'anxious', color: 'bg-purple-300' },
]

const selected = ref('')

const selectMood = (mood: string) => {
  selected.value = mood
  store.setMood(mood)
  setTimeout(() => router.push('/journal'), 500)
}
</script>

<template>
  <div class="text-center py-10">
    <h2 class="text-2xl font-semibold mb-6">How do you feel today?</h2>
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <div
        v-for="m in moods"
        :key="m.value"
        @click="selectMood(m.value)"
        class="cursor-pointer px-6 py-3 rounded-xl shadow-md transition-transform duration-200"
        :class="[
          m.color,
          selected === m.value ? 'scale-110 ring-2 ring-blue-600' : 'hover:scale-105',
        ]"
      >
        {{ m.label }}
      </div>
    </div>
  </div>
</template>
