<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { User, Pencil, Bell, Download, Info } from 'lucide-vue-next'

// Mock user data (replace with real store later)
const user = ref({
  username: 'Alex',
  avatar: '🧑‍🎨',
  greeting: '持續成長，Alex！',
})

const metrics = [
  { key: 'growth', label: '成長', emoji: '🧠', value: 72, color: 'bg-green-500' },
  { key: 'health', label: '健康', emoji: '💪', value: 60, color: 'bg-red-400' },
  { key: 'mindfulness', label: '正念', emoji: '🧘', value: 68, color: 'bg-purple-500' },
  { key: 'connection', label: '連結', emoji: '🤝', value: 52, color: 'bg-yellow-500' },
  { key: 'contribution', label: '貢獻', emoji: '🎁', value: 75, color: 'bg-pink-500' },
]

const streaks = [
  { icon: '🔥', label: '目前連續天數', value: '4 天' },
  { icon: '🏆', label: '最長連續天數', value: '9 天' },
  { icon: '🕒', label: '活躍天數', value: '17' },
]

const badges = [
  { icon: '🥇', label: '完成第一個挑戰' },
  { icon: '✍️', label: '7 天日誌連續紀錄' },
  { icon: '📊', label: '所有指標 > 70%' },
  { icon: '➕', label: '更多徽章即將推出...' },
]
</script>

<template>
  <div class="max-w-xl mx-auto p-4 space-y-8">
    <!-- Profile Header -->
    <div class="flex items-center gap-2 text-2xl font-bold mb-2">
      <User class="w-7 h-7 text-blue-500" />
      <span>個人檔案</span>
    </div>

    <!-- User Section -->
    <div class="bg-white rounded-2xl shadow p-4 flex flex-col items-center mb-2">
      <div class="text-5xl mb-2">{{ user.avatar }}</div>
      <div class="text-lg font-semibold mb-1">{{ user.greeting }}</div>
      <div class="text-gray-500 text-sm">@{{ user.username }}</div>
    </div>

    <!-- Metric Overview -->
    <div class="bg-white rounded-2xl shadow p-4 mb-2">
      <div class="font-semibold mb-2 flex items-center gap-2">
        <span class="text-lg">📈</span> 指標總覽
      </div>
      <div class="space-y-2">
        <div v-for="m in metrics" :key="m.key" class="flex items-center gap-2">
          <span class="w-7">{{ m.emoji }}</span>
          <span class="w-32 font-medium">{{ m.label }}</span>
          <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              :class="[m.color, 'h-3 rounded-full transition-all']"
              :style="{ width: m.value + '%' }"
            ></div>
          </div>
          <span class="w-10 text-right font-mono">{{ m.value }}%</span>
        </div>
      </div>
    </div>

    <!-- Streaks & Milestones -->
    <div class="bg-white rounded-2xl shadow p-4 mb-2">
      <div class="font-semibold mb-2 flex items-center gap-2">
        <span class="text-lg">🔥</span> 連續紀錄與里程碑
      </div>
      <div class="flex flex-col gap-1">
        <div v-for="s in streaks" :key="s.label" class="flex items-center gap-2">
          <span class="w-7">{{ s.icon }}</span>
          <span class="flex-1">{{ s.label }}</span>
          <span class="font-mono">{{ s.value }}</span>
        </div>
      </div>
    </div>

    <!-- Badges -->
    <div class="bg-white rounded-2xl shadow p-4 mb-2">
      <div class="font-semibold mb-2 flex items-center gap-2">
        <span class="text-lg">🎖️</span> 徽章
      </div>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="b in badges"
          :key="b.label"
          class="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm"
        >
          <span>{{ b.icon }}</span>
          <span>{{ b.label }}</span>
        </div>
      </div>
    </div>

    <!-- Settings Section -->
    <div class="bg-white rounded-2xl shadow p-4 mb-2">
      <div class="font-semibold mb-2 flex items-center gap-2">
        <span class="text-lg">⚙️</span> 設定
      </div>
      <div class="flex flex-col gap-2">
        <Button variant="ghost" class="justify-start gap-2 w-full"
          ><Pencil class="w-4 h-4" /> 編輯個人檔案</Button
        >
        <Button variant="ghost" class="justify-start gap-2 w-full"
          ><Bell class="w-4 h-4" /> 通知設定</Button
        >
        <Button variant="ghost" class="justify-start gap-2 w-full"
          ><Download class="w-4 h-4" /> 匯出資料</Button
        >
        <Button variant="ghost" class="justify-start gap-2 w-full"
          ><Info class="w-4 h-4" /> 關於 / 版本資訊</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
