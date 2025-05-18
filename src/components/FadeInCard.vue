<!-- components/FadeInCard.vue -->
<template>
  <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    transition="ease-in-out"
  >
    <Card>Animated Entry</Card>
  </motion.div>
</template>

<script setup>
import { motion } from 'motion-v'
</script>
