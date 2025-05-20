<template>
  <nav
    class="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-blue-100 shadow-lg flex justify-around items-center py-1 px-2 md:px-8 backdrop-blur-xl"
    style="height: 64px"
  >
    <div v-for="tab in tabs" :key="tab.to" class="flex-1 h-full">
      <button
        @click="go(tab.to)"
        class="flex flex-col items-center justify-center w-full h-full focus:outline-none transition-all duration-150 active:scale-95 rounded-t-xl"
        :class="
          isActive(tab.to)
            ? 'text-primary font-semibold bg-gradient-to-t from-company-blue to-company-green scale-105 border-2 border-company-blue shadow-md'
            : 'text-gray-500 font-normal hover:text-primary'
        "
        style="background: none; border: none; padding: 0; margin: 0"
      >
        <!-- Icon with no circle, background, or shadow -->
        <span class="mb-0.5 transition-all duration-150">
          <component
            :is="tab.iconComponent"
            :class="
              isActive(tab.to)
                ? 'text-primary drop-shadow'
                : 'text-gray-500 group-hover:text-primary'
            "
            class="transition-all duration-150"
            :style="isActive(tab.to) ? 'font-size: 26px;' : 'font-size: 22px;'"
          />
        </span>
        <span
          class="block mt-0.5 transition-all duration-150"
          :class="[
            isActive(tab.to)
              ? 'text-primary font-semibold text-xs md:text-sm drop-shadow'
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
  { to: '/compass', icon: 'compass', label: '指南針', iconComponent: Compass },
  { to: '/journal', icon: 'book', label: '日誌', iconComponent: Book },
  { to: '/challenge', icon: 'trophy', label: '挑戰', iconComponent: Trophy },
  { to: '/trends', icon: 'trending-up', label: '趨勢', iconComponent: TrendingUp },
  { to: '/profile', icon: 'user', label: '個人檔案', iconComponent: User },
]
</script>

<style scoped>
nav {
  min-height: 64px;
}
.border-company-blue {
  border-color: #0089d1 !important;
}
.from-company-blue {
  --tw-gradient-from: #0089d1;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 137, 209, 0));
}
.to-company-green {
  --tw-gradient-to: #01b6ad;
}
.text-primary {
  color: #0089d1 !important;
}
</style>
