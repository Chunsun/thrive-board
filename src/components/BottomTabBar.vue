<template>
  <nav
    class="fixed bottom-0 left-0 w-full bg-white/90 border-t border-blue-100/50 shadow-2xl z-50 flex justify-around items-center py-1 px-2 md:px-8 backdrop-blur-xl"
    style="height: 72px"
  >
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="flex flex-col items-center flex-1 group relative"
      :class="[
        isActive(tab.to) ? 'text-indigo-600 font-bold' : 'text-blue-500 hover:text-indigo-500',
      ]"
      @click="playHaptic"
      style="text-decoration: none"
    >
      <!-- Icon in the center of the tab, not floating -->
      <span
        class="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mb-0.5 transition-all duration-200"
        :class="[
          isActive(tab.to)
            ? 'bg-gradient-to-t from-indigo-400 to-blue-300 shadow-lg scale-105 text-white'
            : 'bg-white/80 group-hover:bg-blue-50/80 text-blue-500',
        ]"
      >
        <TabItem
          :to="tab.to"
          :icon="tab.icon"
          :label="''"
          :isActive="isActive(tab.to)"
          style="pointer-events: none"
        />
      </span>
      <!-- Label below the icon, always visible, no underline -->
      <span
        class="block mt-0.5 text-xs md:text-sm font-semibold tracking-wide transition-all duration-200"
        :class="isActive(tab.to) ? 'text-indigo-700' : 'text-blue-500 group-hover:text-indigo-500'"
        style="text-decoration: none"
      >
        {{ tab.label }}
      </span>
      <!-- Active indicator -->
      <span
        v-if="isActive(tab.to)"
        class="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow"
      ></span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TabItem from './TabItem.vue'

const route = useRoute()
const isActive = (path: string) => route.path.startsWith(path)

const playHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5)
  }
}

const tabs = [
  { to: '/compass', icon: 'compass', label: 'Compass' },
  { to: '/journal', icon: 'book', label: 'Journal' },
  { to: '/challenge', icon: 'trophy', label: 'Challenge' },
  { to: '/trends', icon: 'trending-up', label: 'Trends' },
  { to: '/profile', icon: 'user', label: 'Profile' },
]
</script>

<style scoped>
nav {
  min-height: 72px;
}
/* Remove default link underline for all RouterLinks in the tab bar */
nav :deep(a) {
  text-decoration: none !important;
}
</style>
