import { defineStore } from 'pinia';
import axios from 'axios';

const config = useRuntimeConfig();

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    courses: [],
    loading: false,
  }),
  getters: {
    getCourses: (state) => state.courses,
  },
  actions: {
    async fetchCourses() {
      try {

        this.loading = true;
        const response  = await axios.get(`${config.public.apiBase}/v1/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.courses = response.data.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        this.loading = false;
      }
    },
    async createCourse(course: { name: string; lecturers: string; course_tasks: string; }) {
      try {
        const response = await axios.post(config.public.apiBase+'/courses', course);
        this.courses.push(response.data.data);
      } catch (error) {
        console.error('Error creating course:', error);
      }
    },
    async updateCourse(course) {
      try {
        const response = await axios.put(config.public.apiBase+`/courses/${course.id}`, course);
        const index = this.courses.findIndex((c) => c.id === course.id);
        if (index!== -1) {
          this.courses.splice(index, 1, response.data.data);
        }
      } catch (error) {
        console.error('Error updating course:', error);
      }
    },
    async deleteCourse(id) {
      try {
        const response = await axios.delete(config.public.apiBase+`/courses/${id}`);
        const index = this.courses.findIndex((c) => c.id === id);
        if (index!== -1) {
          this.courses.splice(index, 1);
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    },
  },
});