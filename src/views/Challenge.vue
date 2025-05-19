<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const challenges = ref([
  { id: 1, text: 'Drink 2L of water today', completed: false },
  { id: 2, text: 'Sleep 7 hours tonight', completed: false },
])

const toggle = (id: number) => {
  const challenge = challenges.value.find((c) => c.id === id)
  if (challenge) challenge.completed = !challenge.completed
}

const progress = computed(() => {
  const total = challenges.value.length
  const done = challenges.value.filter((c) => c.completed).length
  return Math.round((done / total) * 100)
})

const router = useRouter()
const goNext = () => {
  router.push('/insurance')
}
</script>

<template>
  <div class="max-w-xl mx-auto space-y-6">
    <h2 class="text-2xl font-bold">Your Challenges</h2>

    <div class="space-y-4">
      <div
        v-for="c in challenges"
        :key="c.id"
        class="flex items-center justify-between p-4 border rounded-lg"
      >
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="c.completed" />
          <span :class="{ 'line-through text-gray-400': c.completed }">{{ c.text }}</span>
        </label>
      </div>
    </div>

    <div>
      <p class="text-sm text-gray-600">Progress: {{ progress }}%</p>
      <div class="w-full h-3 bg-gray-200 rounded">
        <div class="h-full bg-blue-500 rounded" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <button @click="goNext" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Next
    </button>
  </div>
</template>
