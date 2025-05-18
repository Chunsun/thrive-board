<!-- App.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Nav -->
    <NavBar />

    <!-- Page Content -->
    <main class="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
