<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([RadarChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const option = ref({
  title: {
    text: 'Life Compass',
    left: 'center',
    textStyle: {
      fontSize: 20,
      color: '#4f46e5',
    },
  },
  tooltip: {},
  radar: {
    indicator: [
      { name: '健康', max: 100 },
      { name: 'Relationships', max: 100 },
      { name: 'Money', max: 100 },
      { name: '成長', max: 100 },
      { name: 'Security', max: 100 },
    ],
    radius: '65%',
  },
  series: [
    {
      name: 'Life Balance',
      type: 'radar',
      data: [
        {
          value: [80, 60, 70, 90, 50],
          name: 'You',
          areaStyle: { opacity: 0.4 },
        },
      ],
      itemStyle: {
        color: '#6366f1',
      },
      lineStyle: {
        width: 3,
      },
    },
  ],
})
</script>

<template>
  <div class="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
    <VChart :option="option" autoresize style="height: 400px" />
  </div>
</template>
