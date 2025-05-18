<template>
  <div ref="captureArea">
    <LifeRadar />
  </div>
  <Button label="Capture & Share" @click="capture" />
</template>

<script setup>
import { ref } from 'vue'
import LifeRadar from '../components/LifeRadar.vue'
import htmlToImage from 'vue-web-screen-shot'

const captureArea = ref()

const capture = async () => {
  const img = await htmlToImage({
    el: captureArea.value,
    fileName: 'life-compass.png',
    watermarkText: 'MyLife',
  })
  console.log('Captured Image:', img)
}
</script>
