<!-- components/LifeRadar.vue -->
<template>
  <div class="w-full flex items-center justify-center">
    <div class="relative w-full max-w-[400px] aspect-square">
      <VChart :option="radarOption" autoresize class="absolute inset-0 w-full h-full z-0" />
      <!-- Overlay Lucide icons at radar axis positions -->
      <div
        v-for="(indicator, idx) in radarOption.radar.indicator"
        :key="indicator.name"
        :style="getIconStyle(idx)"
        class="absolute flex flex-col items-center z-10 pointer-events-none"
      >
        <component
          :is="iconComponents[indicator.name]"
          :class="iconColors[indicator.name] + ' w-7 h-7 drop-shadow-md'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VChart from 'vue-echarts'
import { HeartPulse, TrendingUp, Users, Brain, HandCoins } from 'lucide-vue-next'

const iconComponents = {
  Health: HeartPulse,
  Growth: TrendingUp,
  Connection: Users,
  Mindfulness: Brain,
  Contribution: HandCoins,
}
const iconColors = {
  Health: 'text-pink-500',
  Growth: 'text-green-600',
  Connection: 'text-blue-500',
  Mindfulness: 'text-purple-500',
  Contribution: 'text-yellow-600',
}

const radarOption = {
  tooltip: {},
  radar: {
    indicator: [
      { name: 'Health', max: 100 },
      { name: 'Growth', max: 100 },
      { name: 'Connection', max: 100 },
      { name: 'Mindfulness', max: 100 },
      { name: 'Contribution', max: 100 },
    ],
    center: ['50%', '50%'],
    radius: '85%',
    name: {
      fontSize: 0, // Hide ECharts label
      color: 'transparent',
      formatter: () => '',
    },
  },
  series: [
    {
      name: 'Score',
      type: 'radar',
      data: [
        {
          value: [72, 65, 70, 68, 69],
          name: 'You',
          areaStyle: { opacity: 0.3 },
        },
      ],
      itemStyle: { color: '#0089d1' },
      lineStyle: { width: 3 },
    },
  ],
}

// Calculate icon overlay positions
const getIconStyle = (idx: number) => {
  // Radar config
  const N = radarOption.radar.indicator.length
  const angle = (Math.PI * 2 * idx) / N - Math.PI / 2 // start from top
  const r = 0.46 // 46% of container (just outside chart radius)
  const x = 50 + Math.cos(angle) * r * 100
  const y = 50 + Math.sin(angle) * r * 100
  return {
    left: `calc(${x}% - 13px)`, // 18px = half icon size
    top: `calc(${y}% - 13px)`,
  }
}
</script>
