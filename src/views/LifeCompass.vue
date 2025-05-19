/// views/Compass.vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMoodStore } from '@/stores/mood'
import BottomTabBar from '@/components/BottomTabBar.vue'

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
  <div class="relative min-h-[80vh] flex flex-col items-center justify-center px-2 pb-24 pt-10">
    <!-- Animated background accent -->
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] bg-blue-100/40 rounded-full blur-2xl z-0 pointer-events-none"
    />
    <div class="relative z-10 w-full max-w-xl">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 flex items-center justify-center gap-2"
      >
        <i class="pi pi-sliders-h text-blue-400 text-2xl md:text-3xl" />
        Life Compass
      </h2>
      <p class="text-gray-600 mb-8 text-base md:text-lg text-center">
        Assess your well-being in each area. Tap your mood for today:
      </p>
      <div class="flex flex-wrap justify-center gap-4 mb-10">
        <div
          v-for="m in moods"
          :key="m.value"
          @click="selectMood(m.value)"
          class="cursor-pointer px-7 py-4 rounded-2xl shadow-lg font-semibold text-lg transition-all duration-200 border-2 border-transparent hover:border-blue-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          :class="[
            m.color,
            selected === m.value ? 'scale-110 ring-2 ring-blue-600 border-blue-400' : '',
          ]"
        >
          <span class="text-2xl mr-2">{{ m.label.split(' ')[0] }}</span>
          <span class="align-middle">{{ m.label.split(' ').slice(1).join(' ') }}</span>
        </div>
      </div>
      <div v-if="selected" class="flex flex-col items-center mt-6 animate-fade-in">
        <span class="text-blue-700 font-bold text-lg mb-2">Great! Let's continue.</span>
        <span class="text-xs text-blue-400 mb-4">(Redirecting...)</span>
      </div>
    </div>
  </div>
  <BottomTabBar />
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
