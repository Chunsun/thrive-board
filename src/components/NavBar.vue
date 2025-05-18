<!-- components/NavBar.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-xl font-bold text-blue-600">MyLife</h1>
      <nav class="flex space-x-4">
        <RouterLink
          to="/"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          active-class="font-semibold text-blue-600"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/journal"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          active-class="font-semibold text-blue-600"
        >
          Journal
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
