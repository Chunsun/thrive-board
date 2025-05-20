<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  XCircle,
  Users,
  HeartPulse,
  HandCoins,
  MessageCircle,
  Handshake,
  Smile,
  HandHeart,
  NotebookPen,
  GraduationCap,
} from 'lucide-vue-next'

// Map challenge and boost icon labels to Lucide components
const lucideIconMap: Record<string, unknown> = {
  '📘': NotebookPen,
  '🧠': GraduationCap,
  '🧘': Smile, // fallback for meditation/mindfulness
  '🤝': Handshake,
  '💬': MessageCircle,
  '🙏': HandHeart,
  '🏋': HeartPulse,
  '❤️': HeartPulse,
  '💼': Users,
  '💰': HandCoins,
}

// Add a color map for icons
const iconColorMap: Record<string, string> = {
  '📘': 'text-blue-500',
  '🧠': 'text-green-600',
  '🧘': 'text-purple-500',
  '🤝': 'text-yellow-600',
  '💬': 'text-pink-500',
  '🙏': 'text-orange-500',
  '🏋': 'text-red-500',
  '❤️': 'text-pink-600',
  '💼': 'text-gray-700',
  '💰': 'text-yellow-500',
}

// Active challenges (max 3)
const activeChallenges = ref([
  {
    id: 1,
    icon: '📘',
    title: '連續寫日誌 3 天',
    days: 3,
    progress: 1,
    boosts: [
      { value: 2, icon: '🧠', label: '成長' },
      { value: 1, icon: '🧘', label: '正念' },
    ],
  },
  {
    id: 2,
    icon: '🧠',
    title: '學習一項新知',
    days: 3,
    progress: 0,
    boosts: [{ value: 2, icon: '🧠', label: '成長' }],
  },
])

const cancelChallenge = (id: number) => {
  activeChallenges.value = activeChallenges.value.filter((c) => c.id !== id)
}

// Browseable challenges
const browseChallenges = [
  {
    id: 3,
    icon: '💬',
    title: '與朋友聊天',
    boosts: [{ value: 2, icon: '🤝', label: '連結' }],
    days: 2,
  },
  {
    id: 4,
    icon: '🧘',
    title: '5 分鐘冥想',
    boosts: [{ value: 2, icon: '🧘', label: '正念' }],
    days: 3,
  },
  {
    id: 5,
    icon: '🙏',
    title: '感恩練習',
    boosts: [
      { value: 1, icon: '🧘', label: '正念' },
      { value: 1, icon: '🧠', label: '成長' },
    ],
    days: 3,
  },
]

const joinChallenge = (id: number) => {
  const found = browseChallenges.find((c) => c.id === id)
  if (found && activeChallenges.value.length < 3) {
    activeChallenges.value.push({ ...found, progress: 0 })
  }
}

const toggleDay = (challenge: any, day: number) => {
  if (day === challenge.progress + 1) {
    challenge.progress++
  } else if (day === challenge.progress) {
    challenge.progress--
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto space-y-8 p-4">
    <!-- Onboarding Tip -->
    <div
      class="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 shadow mb-4"
    >
      <span class="text-2xl">💡</span>
      <span class="text-sm text-gray-700">小提示：參加挑戰，養成健康習慣並獲得幸福！</span>
    </div>

    <!-- Section: Active Challenges -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <div class="flex items-center gap-2 text-lg font-bold mb-4">
        🔔 進行中挑戰 <span class="text-xs text-gray-400">（最多 3 項）</span>
      </div>
      <div v-if="activeChallenges.length === 0" class="text-gray-400 text-sm py-6 text-center">
        尚無進行中的挑戰。
      </div>
      <div
        v-for="c in activeChallenges"
        :key="c.id"
        class="mb-8 border-b last:border-b-0 pb-6 last:pb-0"
      >
        <div class="flex items-center gap-3 text-base font-semibold mb-2">
          <span class="text-2xl">
            <component
              :is="lucideIconMap[c.icon] || c.icon"
              class="w-6 h-6 drop-shadow-md"
              :class="iconColorMap[c.icon] || 'text-blue-400'"
            />
          </span>
          <span>{{ c.title }}</span>
        </div>
        <!-- Progress Row -->
        <div class="flex gap-3 items-center mb-3 bg-gray-50 rounded-lg px-3 py-2">
          <span v-for="d in c.days" :key="d" class="flex items-center gap-1">
            <Checkbox
              :checked="c.progress >= d"
              @update:checked="() => toggleDay(c, d)"
              class="shadcn-checkbox-sm"
            />
            <span :class="c.progress >= d ? 'text-green-600 font-bold' : 'text-gray-400 font-bold'"
              >第 {{ d }} 天</span
            >
          </span>
        </div>
        <!-- Boosts -->
        <div class="flex gap-4 items-center mb-2">
          <span
            v-for="b in c.boosts"
            :key="b.label"
            class="text-sm flex items-center gap-1 bg-green-50 rounded px-2 py-1 shadow-sm"
          >
            +{{ b.value }}
            <component
              :is="lucideIconMap[b.icon] || b.icon"
              class="w-4 h-4 drop-shadow-sm"
              :class="iconColorMap[b.icon] || 'text-blue-400'"
            />
            <span class="text-gray-500">{{ b.label }}</span>
          </span>
        </div>
        <div class="flex gap-3 mt-2 justify-between">
          <Button
            variant="secondary"
            class="flex items-center gap-1 px-4 py-2 rounded-lg shadow text-gray-700 hover:bg-gray-100"
          >
            <MessageCircle class="w-4 h-4" /> 更多資訊
          </Button>
          <Button
            variant="destructive"
            class="flex items-center gap-1 px-4 py-2 rounded-lg shadow text-destructive border border-destructive bg-destructive/10 hover:bg-destructive/20"
            @click="cancelChallenge(c.id)"
          >
            <XCircle class="w-4 h-4" /> 取消
          </Button>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="h-2"></div>

    <!-- Section: Browse New Challenges -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div class="flex items-center gap-2 font-semibold mb-4 text-base">➕ 瀏覽新挑戰</div>
      <div
        v-for="c in browseChallenges"
        :key="c.id"
        class="mb-8 border-b last:border-b-0 pb-6 last:pb-0"
      >
        <div class="flex items-center gap-3 text-base font-semibold mb-2">
          <span class="text-2xl">
            <component
              :is="lucideIconMap[c.icon] || c.icon"
              class="w-6 h-6 drop-shadow-md"
              :class="iconColorMap[c.icon] || 'text-blue-400'"
            />
          </span>
          <span>{{ c.title }}</span>
        </div>
        <div class="flex gap-4 items-center mb-2">
          <span
            v-for="b in c.boosts"
            :key="b.label"
            class="text-sm flex items-center gap-1 bg-green-50 rounded px-2 py-1 shadow-sm"
          >
            指標加成：+{{ b.value }}
            <component
              :is="lucideIconMap[b.icon] || b.icon"
              class="w-4 h-4 drop-shadow-sm"
              :class="iconColorMap[b.icon] || 'text-blue-400'"
            />
            <span class="text-gray-500">{{ b.label }}</span>
          </span>
        </div>
        <div class="text-xs text-gray-500 mb-2">📅 持續天數：{{ c.days }} 天</div>
        <Button
          @click="joinChallenge(c.id)"
          :disabled="activeChallenges.length >= 3"
          variant="default"
          class="w-full max-w-xs mx-auto mt-1 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow text-white border-0 company-gradient"
        >
          <Handshake class="w-4 h-4" /> 參加挑戰
        </Button>
      </div>
    </div>
  </div>
</template>
