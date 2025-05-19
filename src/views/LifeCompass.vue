<script setup lang="ts">
import { ref } from 'vue'
import LifeRadar from '@/components/LifeRadar.vue'
import FadeInCard from '@/components/FadeInCard.vue'
import BottomTabBar from '@/components/BottomTabBar.vue'
import { HeartPulse, TrendingUp, Users, Brain, HandCoins } from 'lucide-vue-next'

const metrics = [
  {
    icon: HeartPulse,
    label: 'Health',
    value: 72,
    change: 2,
    color: 'text-pink-500 bg-pink-100 from-pink-400 to-pink-300',
  },
  {
    icon: TrendingUp,
    label: 'Growth',
    value: 65,
    change: -1,
    color: 'text-green-600 bg-green-100 from-green-400 to-green-300',
  },
  {
    icon: Users,
    label: 'Connection',
    value: 70,
    change: 0,
    color: 'text-blue-500 bg-blue-100 from-blue-400 to-blue-300',
  },
  {
    icon: Brain,
    label: 'Mindfulness',
    value: 68,
    change: 1,
    color: 'text-purple-500 bg-purple-100 from-purple-400 to-purple-300',
  },
  {
    icon: HandCoins,
    label: 'Contribution',
    value: 69,
    change: 3,
    color: 'text-yellow-600 bg-yellow-100 from-yellow-400 to-yellow-300',
  },
]

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
</script>

<template>
  <div
    class="relative min-h-[80vh] flex flex-col items-center justify-center px-2 pb-24 pt-10 space-y-6"
  >
    <!-- LIFE COMPASS CARD -->
    <div
      class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col items-center"
    >
      <div class="text-2xl font-bold flex items-center gap-2 mb-2">🧭 LIFE COMPASS</div>
      <div class="w-full flex items-center justify-center">
        <LifeRadar />
      </div>
      <!-- METRICS -->
      <div class="w-full mt-2">
        <div class="flex flex-col gap-2">
          <div
            v-for="m in metrics"
            :key="m.label"
            class="grid grid-cols-[auto_minmax(7rem,1fr)_120px_3.5rem_2.5rem_2.5rem] items-center gap-2 text-base md:text-lg"
          >
            <component :is="m.icon" :class="['w-7 h-7 flex-shrink-0', m.color.split(' ')[0]]" />
            <span class="font-medium">{{ m.label }}</span>
            <span class="inline-block h-3 rounded-full w-full relative bg-gray-100">
              <span
                :style="{ width: m.value + '%' }"
                :class="[
                  'absolute left-0 top-0 h-3 rounded-full',
                  'bg-gradient-to-r',
                  m.color.split(' ')[2],
                  m.color.split(' ')[3],
                ]"
              ></span>
            </span>
            <span class="text-right font-semibold">{{ m.value }}%</span>
            <span class="text-center">
              <span v-if="m.change > 0" class="text-green-600">↑ {{ Math.abs(m.change) }}</span>
              <span v-else-if="m.change < 0" class="text-red-500">↓ {{ Math.abs(m.change) }}</span>
              <span v-else class="text-gray-400">=</span>
            </span>
          </div>
        </div>
      </div>
      <button
        @click="openModal"
        class="mt-4 text-sm text-company-blue underline hover:text-company-green"
      >
        How do I improve these?
      </button>
    </div>

    <!-- INSURANCE TIP CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">💡 INSURANCE TIP OF THE DAY</div>
      <div class="text-gray-700">“Reducing stress reduces long-term risk.”</div>
      <button class="text-company-blue underline text-sm w-fit hover:text-company-green">
        See how insurance supports this ↓
      </button>
    </div>

    <!-- JOURNAL SNAPSHOT CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">📖 TODAY'S JOURNAL SNAPSHOT</div>
      <div class="flex items-center gap-2 text-base">
        <span>Mood:</span> <span class="text-2xl">🙂</span> <span>Positive</span>
      </div>
      <div class="text-gray-700 truncate">“I focused better today after a morning...”</div>
      <div class="text-green-600 text-sm font-medium">+2 Mindfulness</div>
    </div>

    <!-- ACTIVE CHALLENGE CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">🏆 ACTIVE CHALLENGE</div>
      <div class="flex items-center gap-2">
        <span class="text-xl">💤</span> <span>Sleep before 11pm (x3 days)</span>
      </div>
      <div class="flex gap-2 mt-1">
        <span class="px-2 py-1 rounded bg-green-100 text-green-700 font-bold">✅ Day 1</span>
        <span class="px-2 py-1 rounded bg-gray-100 text-gray-500 font-bold">⬜ Day 2</span>
        <span class="px-2 py-1 rounded bg-gray-100 text-gray-500 font-bold">⬜ Day 3</span>
      </div>
      <div class="text-pink-600 text-sm font-medium">Reward: +3 ❤️ Health</div>
      <button class="text-company-blue underline text-sm w-fit hover:text-company-green">
        View All Challenges
      </button>
    </div>

    <!-- SHARE PROGRESS CARD (triggered) -->
    <FadeInCard>
      <div
        class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2 items-center"
      >
        <div class="text-lg font-semibold flex items-center gap-2">🎉 SHARE YOUR PROGRESS</div>
        <div class="text-green-700 font-bold">✅ All metrics improved today!</div>
        <button
          class="mt-2 px-4 py-2 rounded bg-gradient-to-r from-company-blue to-company-green text-white font-semibold shadow hover:scale-105 transition"
        >
          Share as Image
        </button>
      </div>
    </FadeInCard>

    <!-- Modal for improvement tips -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
        <div class="text-lg font-bold mb-2">How to Improve Your Metrics</div>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>Health: Sleep well, eat balanced, exercise regularly.</li>
          <li>Growth: Learn something new, set goals, reflect daily.</li>
          <li>Connection: Reach out to friends/family, join a group.</li>
          <li>Mindfulness: Meditate, journal, take mindful breaks.</li>
          <li>Contribution: Volunteer, help others, share knowledge.</li>
        </ul>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<style scoped>
.from-company-blue {
  --tw-gradient-from: #0089d1;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 137, 209, 0));
}
.to-company-green {
  --tw-gradient-to: #01b6ad;
}
.text-company-blue {
  color: #0089d1;
}
.hover\:text-company-green:hover {
  color: #01b6ad;
}
</style>
