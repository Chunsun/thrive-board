<template>
  <nav
    class="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-blue-100 shadow-lg flex justify-around items-center py-1 px-2 md:px-8 backdrop-blur-xl"
    style="height: 64px"
  >
    <div v-for="tab in tabs" :key="tab.to" class="flex flex-col items-center flex-1 group relative">
      <button
        @click="go(tab.to)"
        class="flex flex-col items-center w-full focus:outline-none transition-all duration-150 active:scale-95"
        :class="
          isActive(tab.to)
            ? 'text-primary font-semibold'
            : 'text-gray-500 font-normal hover:text-primary'
        "
        style="background: none; border: none; padding: 0; margin: 0"
      >
        <span
          class="inline-flex items-center justify-center rounded-full mb-0.5 transition-all duration-150"
          :class="[
            isActive(tab.to)
              ? 'text-primary bg-white border-t-2 border-primary shadow-sm scale-110'
              : 'text-gray-500 bg-transparent',
            isActive(tab.to) ? 'w-11 h-11 md:w-12 md:h-12' : 'w-9 h-9 md:w-10 md:h-10',
          ]"
        >
          <component
            :is="tab.iconComponent"
            :class="isActive(tab.to) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'"
            class="transition-all duration-150"
            :style="isActive(tab.to) ? 'font-size: 26px;' : 'font-size: 22px;'"
          />
        </span>
        <span
          class="block mt-0.5 transition-all duration-150"
          :class="[
            isActive(tab.to)
              ? 'text-primary font-semibold text-xs md:text-sm'
              : 'text-gray-500 font-normal text-xs md:text-sm group-hover:text-primary',
          ]"
        >
          {{ tab.label }}
        </span>
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
  min-height: 64px;
}
.border-primary {
  border-color: #2563eb !important; /* Tailwind blue-600 */
}
.text-primary {
  color: #2563eb !important;
}
</style>
