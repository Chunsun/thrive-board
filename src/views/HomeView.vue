<script setup lang="ts">
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
const goToCompass = () => {
  router.push('/compass')
}
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden"
  >
    <!-- Animated decorative background -->
    <motion.div
      :initial="{ scale: 0.9, opacity: 0.5 }"
      :animate="{ scale: [0.9, 1.05, 0.95, 1], opacity: [0.5, 0.7, 0.5, 0.6] }"
      :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[520px] md:h-[520px] bg-green-200/30 rounded-full blur-3xl z-0"
    />
    <motion.div
      :initial="{ y: 40, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
      class="w-full max-w-md md:max-w-xl z-10"
    >
      <Card
        class="shadow-2xl rounded-3xl bg-white/90 backdrop-blur border-2 border-green-100 px-6 py-10 md:py-14 flex flex-col items-center"
      >
        <template #title>
          <span class="flex items-center justify-center gap-3">
            <i class="pi pi-compass text-green-500 text-3xl" />
            <span class="text-3xl md:text-5xl font-extrabold text-green-800 drop-shadow"
              >LifeWell</span
            >
          </span>
        </template>
        <template #content>
          <p class="text-base md:text-lg text-gray-600 mb-8 mt-2">
            Track your well-being. Reflect, grow, and stay protected with gentle daily actions.
          </p>
          <Button
            label="Start Now"
            icon="pi pi-play"
            class="p-button-raised p-button-lg p-button-success text-lg font-bold shadow-lg w-full md:w-auto"
            @click="goToCompass"
          />
        </template>
      </Card>
    </motion.div>
  </div>
</template>

<style scoped>
/* Responsive font for title */
@media (max-width: 640px) {
  .text-3xl {
    font-size: 2rem;
  }
}
</style>
