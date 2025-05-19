<template>
  <nav
    class="fixed bottom-0 left-0 w-full z-50 bg-white/90 border-t border-blue-100/50 shadow-2xl flex justify-around items-center py-1 px-2 md:px-8 backdrop-blur-xl"
    style="height: 72px"
  >
    <div v-for="tab in tabs" :key="tab.to" class="flex flex-col items-center flex-1 group relative">
      <button
        @click="go(tab.to)"
        class="flex flex-col items-center w-full focus:outline-none"
        :class="
          isActive(tab.to) ? 'text-indigo-600 font-bold' : 'text-blue-500 hover:text-indigo-500'
        "
        style="background: none; border: none; padding: 0; margin: 0"
      >
        <span
          class="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mb-0.5 transition-all duration-200"
          :class="
            isActive(tab.to)
              ? 'bg-gradient-to-t from-indigo-400 to-blue-300 shadow-lg scale-105 text-white'
              : 'bg-white/80 group-hover:bg-blue-50/80 text-blue-500'
          "
        >
          <component
            :is="tab.iconComponent"
            class="w-6 h-6"
            :class="isActive(tab.to) ? 'text-white' : 'text-blue-500'"
          />
        </span>
        <span
          class="block mt-0.5 text-xs md:text-sm font-semibold tracking-wide transition-all duration-200"
          :class="
            isActive(tab.to) ? 'text-indigo-700' : 'text-blue-500 group-hover:text-indigo-500'
          "
        >
          {{ tab.label }}
        </span>
        <span
          v-if="isActive(tab.to)"
          class="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow"
        ></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Compass, Book, Trophy, TrendingUp, User } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const isActive = (path: string) => route.path.startsWith(path)
const go = (to: string) => router.push(to)

const tabs = [
  { to: '/compass', icon: 'compass', label: 'Compass', iconComponent: Compass },
  { to: '/journal', icon: 'book', label: 'Journal', iconComponent: Book },
  { to: '/challenge', icon: 'trophy', label: 'Challenge', iconComponent: Trophy },
  { to: '/trends', icon: 'trending-up', label: 'Trends', iconComponent: TrendingUp },
  { to: '/profile', icon: 'user', label: 'Profile', iconComponent: User },
]
</script>

<style scoped>
nav {
  min-height: 72px;
}
</style>
