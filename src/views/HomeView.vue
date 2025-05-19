<script setup lang="ts">
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'

const router = useRouter()
const goToCompass = () => {
  router.push('/compass')
}
</script>

<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden"
  ></div>
</template>

<style scoped></style>
