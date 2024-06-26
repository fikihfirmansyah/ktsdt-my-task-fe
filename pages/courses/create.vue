<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Create New Course</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="courseName" class="block text-sm font-medium text-gray-700">Course Name</label>
        <input v-model="form.name" type="text" id="courseName" name="courseName" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      </div>
      <div class="flex justify-end">
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Course
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const form = ref({
  name: '',
});

const config = useRuntimeConfig(); // Ensure you have configured this properly in nuxt.config.js

const handleSubmit = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/v1/courses`, {
      name: form.value.name,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    console.log('Course created successfully:', response.data);
    navigateTo('/courses');
    // Optionally, redirect to course list or show success message
  } catch (error) {
    console.error('Error creating course:', error);
    // Handle error state or show error message
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
