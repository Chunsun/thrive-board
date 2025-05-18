<!-- components/LifeRadar.vue -->
<template>
  <Card>
    <VChart :option="radarOption" style="height: 400px" />
  </Card>
</template>

<script setup>
const radarOption = {
  title: { text: 'Life Compass' },
  tooltip: {},
  legend: { data: ['You'] },
  radar: {
    indicator: [
      { name: 'Health', max: 100 },
      { name: 'Money', max: 100 },
      { name: 'Growth', max: 100 },
      { name: 'Security', max: 100 },
      { name: 'Relationships', max: 100 },
    ],
  },
  series: [
    {
      name: 'Score',
      type: 'radar',
      data: [
        {
          value: [75, 60, 80, 55, 65],
          name: 'You',
        },
      ],
    },
  ],
}
</script>
