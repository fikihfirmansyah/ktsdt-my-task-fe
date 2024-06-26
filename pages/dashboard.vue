<!-- pages/dashboard.vue -->

<template>
  <div class="max-w-2xl p-4 mx-auto">
    <h1>Welcome to Dashboard, <strong>{{ me }}</strong></h1>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth', 'me'], // Assuming 'auth' middleware checks authentication
});

const me = ref('');
onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    me.value = JSON.parse(userData).data.name
  }
});
</script>
