<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const start = () => router.push('/compass')
</script>

<template>
  <div class="text-center py-10">
    <h1 class="text-3xl font-bold mb-4">Track your well-being</h1>
    <p class="text-gray-600 mb-6">Reflect, grow, and stay protected.</p>
    <button @click="start" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
      Start Now
    </button>
  </div>
</template>
