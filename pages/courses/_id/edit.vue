<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-8">Edit Course</h1>
    <form @submit.prevent="saveChanges">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Name</label>
        <input v-model="course.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="mb-5">
        <label for="lecturers" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lecturer(s)</label>
        <input v-model="course.lecturers" type="text" id="lecturers" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div class="mb-5">
        <label for="tasks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tasks</label>
        <textarea v-model="course.tasks" id="tasks" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '@nuxtjs/composition-api';

const router = useRouter();
const config = useRuntimeConfig();

let courseId = $route.params.id; // Assuming you pass the course ID via route params
let course = ref({ name: '', lecturers: '', tasks: '' });

// Fetch course details on component mount
onMounted(async () => {
  try {
    const response = await axios.get(`${config.public.apiBase}/v1/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    course.value = response.data.data; // Assuming response.data contains the course data
  } catch (error) {
    console.error('Error fetching course:', error);
  }
});

// Save changes to the course
const saveChanges = async () => {
  try {
    await axios.put(`${config.public.apiBase}/v1/courses/${courseId}`, course.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    router.push('/courses'); // Redirect to course list after saving changes
  } catch (error) {
    console.error('Error saving course changes:', error);
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
