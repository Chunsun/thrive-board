<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Brain,
  HeartPulse,
  Smile,
  Handshake,
  Gift,
} from 'lucide-vue-next'
import VChart from 'vue-echarts'

// Define a DateRangeOption interface
interface DateRangeOption {
  label: string
  value: number | string
}
const dateRanges: DateRangeOption[] = [
  { label: '14 天', value: 14 },
  { label: '30 天', value: 30 },
  { label: '自訂', value: 'custom' },
]
const selectedRange = ref<DateRangeOption>(dateRanges[0])
const showRangeDropdown = ref(false)

const chartData = ref({
  labels: [
    '5月7日',
    '5月8日',
    '5月9日',
    '5月10日',
    '5月11日',
    '5月12日',
    '5月13日',
    '5月14日',
    '5月15日',
    '5月16日',
    '5月17日',
    '5月18日',
    '5月19日',
    '5月20日',
  ],
  metrics: [
    {
      key: 'growth',
      label: '成長',
      icon: Brain,
      color: 'text-green-600',
      points: [55, 57, 60, 62, 63, 65, 66, 67, 68, 70, 72, 67, 69, 67],
      emoji: '🧠',
    },
    {
      key: 'health',
      label: '健康',
      icon: HeartPulse,
      color: 'text-red-500',
      points: [60, 61, 62, 63, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
      emoji: '💪',
    },
    {
      key: 'mindfulness',
      label: '正念',
      icon: Smile,
      color: 'text-purple-500',
      points: [50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76],
      emoji: '🧘',
    },
    {
      key: 'connection',
      label: '連結',
      icon: Handshake,
      color: 'text-yellow-600',
      points: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66],
      emoji: '🤝',
    },
    {
      key: 'contribution',
      label: '貢獻',
      icon: Gift,
      color: 'text-pink-500',
      points: [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
      emoji: '🎁',
    },
  ],
})

const selectedPoint = ref<null | { metric: string; date: string; value: number; reason?: string }>(
  null,
)
const showEntryDetails = ref(false)

function selectPoint(metric: string, date: string, value: number, reason?: string) {
  selectedPoint.value = { metric, date, value, reason }
  showEntryDetails.value = true
}
function closeEntryDetails() {
  showEntryDetails.value = false
}

function selectDateRange(r: DateRangeOption) {
  selectedRange.value = r
  showRangeDropdown.value = false
}

function onRangeSelect(r: { label: string; value: number | string }) {
  selectedRange.value = r
  showRangeDropdown.value = false
}

const insights = [
  { text: '最顯著進步：🧠 成長 (+12%)' },
  { text: '最少活躍：🎁 貢獻' },
  { text: '挑戰完成率在週末激增' },
  { text: '繼續努力！小行動 = 強大影響' },
]

// ECharts line chart option for metrics trends
const lineChartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    data: chartData.value.metrics.map((m) => m.label),
    top: 10,
    textStyle: { color: '#222', fontSize: 13 },
  },
  grid: { left: 40, right: 20, top: 40, bottom: 30 },
  xAxis: {
    type: 'category',
    data: chartData.value.labels,
    boundaryGap: false,
    axisLabel: { fontSize: 12, color: '#888' },
    axisLine: { lineStyle: { color: '#e5e7eb' } },
    splitLine: { show: false },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 100,
    axisLabel: { formatter: '{value}%', color: '#888' },
    axisLine: { lineStyle: { color: '#e5e7eb' } },
    splitLine: { show: true, lineStyle: { color: '#f3f4f6' } },
  },
  series: chartData.value.metrics.map((m) => ({
    name: m.label,
    type: 'line',
    data: m.points,
    symbol: 'circle',
    symbolSize: 10,
    lineStyle: { width: 3, color: getColor(m.color) },
    itemStyle: { color: getColor(m.color) },
    emphasis: { focus: 'series' },
    smooth: true,
  })),
  backgroundColor: 'rgba(255,255,255,0)',
}))

// Helper to convert Tailwind color class to hex (simple mapping)
function getColor(tw: string) {
  return (
    {
      'text-green-600': '#16a34a',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a21caf',
      'text-yellow-600': '#ca8a04',
      'text-pink-500': '#ec4899',
    }[tw] || '#8884d8'
  )
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-4 space-y-8">
    <!-- 趨勢標題 -->
    <div class="flex items-center gap-2 text-2xl font-bold mb-2">
      <TrendingUp class="w-7 h-7 text-blue-500" />
      <span>趨勢</span>
    </div>

    <!-- 日期範圍選擇器 -->
    <div class="flex items-center gap-2 mb-2">
      <CalendarDays class="w-5 h-5 text-gray-400" />
      <Button variant="ghost" size="sm" class="px-2 py-1" @click="selectDateRange(dateRanges[0])">
        <ChevronLeft class="w-4 h-4" />
      </Button>
      <div class="relative">
        <Button
          variant="outline"
          size="sm"
          class="flex items-center gap-1 px-3 py-1 rounded-lg font-semibold"
          @click="showRangeDropdown = !showRangeDropdown"
        >
          {{ selectedRange.label }}
          <ChevronDown class="w-4 h-4" />
        </Button>
        <div
          v-if="showRangeDropdown"
          class="absolute z-10 mt-1 bg-white border rounded shadow w-32"
        >
          <div
            v-for="r in dateRanges"
            :key="r.value"
            class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
            @click="onRangeSelect(r)"
          >
            {{ r.label }}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="sm" class="px-2 py-1" @click="selectDateRange(dateRanges[0])">
        <ChevronRight class="w-4 h-4" />
      </Button>
      <span class="ml-2 text-gray-500 text-sm">【最近 {{ selectedRange.label }}】</span>
    </div>

    <!-- 折線圖 -->
    <div class="bg-white rounded-2xl shadow p-4 mb-2">
      <div class="flex items-center gap-2 mb-2">
        <TrendingUp class="w-5 h-5 text-blue-400" />
        <span class="font-semibold">指標變化趨勢</span>
      </div>
      <div class="text-xs text-gray-400 mb-2">
        Y 軸：指標百分比 (0–100%) &nbsp;|&nbsp; X 軸：日期（最近 14 天）
      </div>
      <!-- 圖表區域（ECharts） -->
      <div class="h-56 flex flex-col justify-center items-center relative">
        <VChart :option="lineChartOption" autoresize class="w-full h-full" />
        <div class="flex flex-wrap gap-4 mt-4">
          <span
            v-for="metric in chartData.metrics"
            :key="metric.key"
            class="flex items-center gap-1 text-sm"
          >
            <span>{{ metric.emoji }}</span>
            <span :class="metric.color">{{ metric.label }}</span>
          </span>
        </div>
      </div>
      <div class="text-xs text-gray-400 mt-2">（點擊圓點可查看百分比與原因）</div>
    </div>

    <!-- 詳細資料彈窗 -->
    <div
      v-if="showEntryDetails && selectedPoint"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm relative">
        <button
          @click="closeEntryDetails"
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xl">{{
            chartData.metrics.find((m) => m.label === selectedPoint?.metric)?.emoji
          }}</span>
          <span class="font-bold"
            >{{ selectedPoint.metric }}，{{ selectedPoint.date }}： {{ selectedPoint.value }}%</span
          >
        </div>
        <div class="text-sm text-gray-700 mb-1">• 來源：✅ 挑戰：「閱讀 15 分鐘」</div>
        <div class="text-sm text-gray-500 mb-2">• 當天未填寫日誌</div>
        <Button @click="closeEntryDetails" variant="secondary" class="w-full mt-2">關閉</Button>
      </div>
    </div>

    <!-- 每週洞察 -->
    <div class="bg-white rounded-2xl shadow p-4 mt-4">
      <div class="font-semibold mb-2 flex items-center gap-2">
        <span class="text-lg">📖</span> 每週洞察
      </div>
      <ul class="list-disc pl-6 text-gray-700 space-y-1">
        <li v-for="insight in insights" :key="insight.text">{{ insight.text }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
