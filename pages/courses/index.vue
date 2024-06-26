<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-8">Course List</h1>

    <!-- Tombol untuk menuju halaman create kursus -->
    <router-link to="/courses/create" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
      Tambah Course
    </router-link>

    <table id="courseTable" class="table-auto w-full whitespace-nowrap mt-4">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">No.</th>
          <th class="px-4 py-2 text-left">Course Name</th>
          <th class="px-4 py-2 text-left">Lecturer(s)</th>
          <th class="px-4 py-2 text-left">Tasks</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in courses" :key="course.id">
          <td class="border px-4 py-2">{{ index + 1 }}</td> <!-- Nomor urut dimulai dari 1 -->
          <td class="border px-4 py-2">{{ course.name }}</td>
          <td class="border px-4 py-2">
            <ul>
              <li v-for="lecturer in course.lecturers" :key="lecturer.id">{{ lecturer.name }}</li>
            </ul>
          </td>
          <td class="border px-4 py-2">
            <ul>
              <li v-for="task in course.course_tasks" :key="task.id">{{ task.title }}</li>
            </ul>
          </td>
          <td class="border px-4 py-2">
            <router-link :to="'/courses/' + course.id + '/edit'" class="text-blue-600 hover:text-blue-900">Edit</router-link>
            <button @click="deleteCourse(course.id)" class="text-red-600 hover:text-red-900 ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

const courses = ref([]);
const config = useRuntimeConfig(); // Pastikan konfigurasi ini sesuai di nuxt.config.js

onMounted(async () => {
  try {
    const response = await axios.get(`${config.public.apiBase}/v1/courses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    courses.value = response.data.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
});

const deleteCourse = async (courseId: string) => {
  try {
    const response = await axios.delete(`${config.public.apiBase}/v1/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    console.log('Course deleted successfully:', response.data);
    // Update local courses list after deletion
    courses.value = courses.value.filter(course => course.id !== courseId);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
