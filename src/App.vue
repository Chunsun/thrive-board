<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 relative overflow-hidden"
  >
    <!-- Animated background shapes using motion-v component syntax -->
    <motion.div
      :initial="{ y: 0, scale: 1 }"
      :animate="{ y: [0, 30, 0], scale: [1, 1.1, 1] }"
      :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
      class="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 opacity-30 rounded-full blur-3xl z-0"
    />
    <motion.div
      :initial="{ y: 0, scale: 1 }"
      :animate="{ y: [0, -30, 0], scale: [1, 1.08, 1] }"
      :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
      class="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl z-0"
    />

    <header class="z-10 relative">
      <Menubar
        :model="menuItems"
        class="shadow-lg bg-white/80 backdrop-blur rounded-b-2xl px-6 py-2 border-b border-blue-100"
      >
        <template #start>
          <span class="flex items-center gap-2">
            <i class="pi pi-compass text-blue-500 text-2xl" />
            <span class="text-2xl font-extrabold tracking-tight text-blue-700 drop-shadow"
              >Wellbeing Compass</span
            >
          </span>
        </template>
      </Menubar>
    </header>

    <main class="flex-1 flex flex-col justify-center items-center px-4 py-8 z-10 relative">
      <RouterView />
    </main>

    <footer
      class="z-10 relative p-4 text-center text-xs text-blue-700/60 font-medium bg-white/70 backdrop-blur rounded-t-2xl shadow-inner"
    >
      © 2025 LifeCare Prototype. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import { motion } from 'motion-v'

const menuItems = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'Compass', icon: 'pi pi-sliders-h', to: '/compass' },
  { label: 'Journal', icon: 'pi pi-book', to: '/journal' },
  { label: 'Challenges', icon: 'pi pi-star', to: '/challenge' },
])
</script>

<style scoped>
/* Custom background animation tweaks if needed */
</style>
