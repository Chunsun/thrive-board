<template>
  <RouterLink
    :to="to"
    class="group relative flex flex-col items-center px-2 py-1 md:px-3 md:py-2 rounded-xl transition-all duration-300 ease-out-expo will-change-transform"
    :class="[
      isActive
        ? 'text-white bg-gradient-to-t from-indigo-500 to-blue-400 shadow-lg scale-105'
        : 'text-blue-500 hover:text-indigo-600 hover:bg-blue-50/60',
      'font-semibold',
    ]"
  >
    <!-- Animated icon with glassy effect -->
    <span
      class="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mb-0.5 transition-all duration-300"
      :class="[
        isActive
          ? 'bg-white/30 shadow-xl ring-2 ring-indigo-200/60 backdrop-blur animate-float'
          : 'bg-white/60 group-hover:bg-white/80',
      ]"
    >
      <span class="text-2xl md:text-3xl select-none">
        {{ emojiFallback }}
      </span>
    </span>
    <!-- Label with fade/slide -->
    <span
      class="mt-0.5 text-xs md:text-sm font-medium tracking-wide transition-all duration-300 origin-bottom"
      :class="
        isActive
          ? 'opacity-100 scale-100 text-white drop-shadow'
          : 'opacity-70 scale-95 text-blue-700'
      "
    >
      {{ label }}
    </span>
    <!-- Active indicator -->
    <span
      v-if="isActive"
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow"
    ></span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  isActive: { type: Boolean, default: false },
})

const emojiFallbacks = {
  compass: '🧭',
  book: '📖',
  trophy: '🏆',
  'trending-up': '📈',
  user: '👤',
}
const emojiFallback = computed(
  () => emojiFallbacks[props.icon as keyof typeof emojiFallbacks] || '🔘',
)
</script>

<style scoped>
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
