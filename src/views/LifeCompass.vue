<script setup lang="ts">
import { ref } from 'vue'
import LifeRadar from '@/components/LifeRadar.vue'
import BottomTabBar from '@/components/BottomTabBar.vue'
import { HeartPulse, TrendingUp, Users, Brain, HandCoins } from 'lucide-vue-next'

const metrics = [
  {
    icon: HeartPulse,
    label: '健康',
    value: 72,
    change: 2,
    color: 'text-pink-500 bg-pink-100 from-pink-400 to-pink-300',
  },
  {
    icon: TrendingUp,
    label: '成長',
    value: 65,
    change: -1,
    color: 'text-green-600 bg-green-100 from-green-400 to-green-300',
  },
  {
    icon: Users,
    label: '連結',
    value: 70,
    change: 0,
    color: 'text-blue-500 bg-blue-100 from-blue-400 to-blue-300',
  },
  {
    icon: Brain,
    label: '正念',
    value: 68,
    change: 1,
    color: 'text-purple-500 bg-purple-100 from-purple-400 to-purple-300',
  },
  {
    icon: HandCoins,
    label: '貢獻',
    value: 69,
    change: 3,
    color: 'text-yellow-600 bg-yellow-100 from-yellow-400 to-yellow-300',
  },
]

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const insuranceTips = [
  '每天 30 分鐘運動，也是在為未來減少醫療風險 — 富邦醫療險守護你的健康。',
  '人生每個階段都能有保障。學習與規劃，是為未來鋪路。',
  '今天的平靜，是未來安心的開始。富邦年金險給你穩定生活的後盾。',
  '為家人努力的你，也值得一份保障。富邦壽險讓愛延續。',
  '重要的連結，需要時間與保障共同維繫。',
]
const insuranceTip = ref(insuranceTips[Math.floor(Math.random() * insuranceTips.length)])
</script>

<template>
  <div
    class="relative min-h-[80vh] flex flex-col items-center justify-center px-2 pb-24 pt-10 space-y-6"
  >
    <!-- LIFE COMPASS CARD -->
    <div
      class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col items-center"
    >
      <div class="text-2xl font-bold flex items-center gap-2 mb-2">🧭 幸福指南針</div>
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
        如何提升這些指標？
      </button>
    </div>

    <!-- INSURANCE TIP CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">💡 今日保險小知識</div>
      <div class="text-gray-700">{{ insuranceTip }}</div>
      <button class="text-company-blue underline text-sm w-fit hover:text-company-green">
        了解更多保險知識 ↓
      </button>
    </div>

    <!-- JOURNAL SNAPSHOT CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">📖 今日日誌摘要</div>
      <div class="flex items-center gap-2 text-base">
        <span>心情：</span> <span class="text-2xl">🙂</span> <span>正向</span>
      </div>
      <div class="text-gray-700 truncate">「今天早上專注力提升，工作效率更好⋯⋯」</div>
      <div class="text-green-600 text-sm font-medium">+2 正念</div>
    </div>

    <!-- ACTIVE CHALLENGE CARD -->
    <div class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2">
      <div class="text-lg font-semibold flex items-center gap-2">🏆 進行中挑戰</div>
      <div class="flex items-center gap-2">
        <span class="text-xl">💤</span> <span>23:00 前就寢（連續 3 天）</span>
      </div>
      <div class="flex gap-2 mt-1">
        <span class="px-2 py-1 rounded bg-green-100 text-green-700 font-bold">✅ 第 1 天</span>
        <span class="px-2 py-1 rounded bg-gray-100 text-gray-500 font-bold">⬜ 第 2 天</span>
        <span class="px-2 py-1 rounded bg-gray-100 text-gray-500 font-bold">⬜ 第 3 天</span>
      </div>
      <div class="text-pink-600 text-sm font-medium">獎勵：+3 ❤️ 健康</div>
      <button class="text-company-blue underline text-sm w-fit hover:text-company-green">
        查看所有挑戰
      </button>
    </div>

    <!-- SHARE PROGRESS CARD (triggered) -->
    <div
      class="w-full max-w-xl mx-auto bg-white p-4 rounded-2xl shadow-md flex flex-col gap-2 items-center transition-all duration-500 animate-fade-in"
    >
      <div class="text-lg font-semibold flex items-center gap-2">🎉 分享你的進步</div>
      <div class="text-green-700 font-bold">✅ 今日所有指標皆有提升！</div>
      <button
        class="mt-2 px-4 py-2 rounded bg-gradient-to-r from-company-blue to-company-green text-white font-semibold shadow hover:scale-105 transition"
      >
        分享幸福指南針
      </button>
    </div>

    <!-- Modal for improvement tips -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
        <div class="text-lg font-bold mb-2">如何提升你的指標</div>
        <ul class="list-disc pl-5 text-gray-700 space-y-1">
          <li>健康：充足睡眠、均衡飲食、規律運動。</li>
          <li>成長：學習新知、設定目標、每日反思。</li>
          <li>連結：聯絡親友、參加社群。</li>
          <li>正念：冥想、寫日誌、正念休息。</li>
          <li>貢獻：志工服務、幫助他人、知識分享。</li>
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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
