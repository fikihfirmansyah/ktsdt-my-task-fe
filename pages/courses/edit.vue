<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold mb-8">Edit Course</h1>
      <form @submit.prevent="updateCourse">
        <label for="name">Course Name:</label>
        <input type="text" id="name" v-model="form.name" />
        <br />
        <label for="lecturers">Lecturer(s):</label>
        <input type="text" id="lecturers" v-model="form.lecturers" />
        <br />
        <label for="course_tasks">Tasks:</label>
        <input type="text" id="course_tasks" v-model="form.course_tasks" />
        <br />
        <button type="submit">Update Course</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useCoursesStore } from '@/stores/courses';
  import { useRoute } from 'vue-router';
  
  const coursesStore = useCoursesStore();
  const route = useRoute();
  const $router = useRouter();
  const form = ref({
    name: '',
    lecturers: '',
    course_tasks: '',
  });
  
  async function fetchCourse() {
    try {
      const course = await coursesStore.getCourses.find((c) => c.id === route.params.id);
      if (course) {
        form.value = course;
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  }
  
  async function updateCourse() {
    try {
      await coursesStore.updateCourse(form.value);
      // Navigate back to course list
      $router.push('/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  }
  
  onMounted(fetchCourse);
  </script>