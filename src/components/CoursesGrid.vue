<template>
  <div class="container mx-auto p-4 bg-blue-100">
    <h1 class="text-3xl font-bold mb-4 text-center">Study Plan</h1>

    <div v-if="isMobile" class="mb-4">
      <label for="levelSelect" class="block text-lg font-medium text-gray-700">Select Level:</label>
      <select
        id="levelSelect"
        v-model="selectedLevel"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option v-for="level in 8" :key="level" :value="level">Level {{ level }}</option>
      </select>
    </div>

    <div v-for="level in 8" :key="level" class="mb-4 flex flex-col md:flex-row">
      <!-- Left side: Courses (80% width) -->
      <div
        class="w-full md:w-4/5 bg-white p-4 rounded-lg shadow-lg mr-0 md:mr-4"
        @dragover.prevent
        @drop="onDrop($event, level)"
        v-show="!isMobile || selectedLevel === level"
      >
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div
            v-for="course in coursesByLevel[level]"
            :key="course.name"
            class="bg-gray-100 p-4 rounded-lg shadow cursor-move"
            draggable="true"
            @dragstart="onDragStart($event, course, level)"
            @click="(isMobile || dropdown) && openModal(course)"
          >
            <h3 class="text-md font-semibold text-red-800">{{ course.name }}</h3>
            <p class="text-sm">Hours: {{ course.hours }}</p>
          </div>
        </div>
      </div>

      <!-- Right side: Hours and Difficulty (20% width) -->
      <div   
      :class="['w-full md:w-1/5 bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center', { 'mt-4': isMobile }]"
      v-show="!isMobile || selectedLevel === level"
      >
        <h3 class="text-lg font-bold">Hours: {{ getTotalHours(level) }}</h3>
        <h3 class="text-lg font-bold">Difficulty: {{ getAverageDifficulty(level) }}</h3>
      </div>
    </div>

    <!-- Modal for changing course level on mobile -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h3 class="text-lg font-bold mb-2">Change Course Level</h3>
        <select v-model="newLevel" class="block w-full mt-1">
          <option v-for="level in 8" :key="level" :value="level">Level {{ level }}</option>
        </select>
        <div class="mt-4 flex justify-end">
          <button @click="changeCourseLevel" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button @click="closeModal" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal backdrop -->
    <div v-if="showModal" class="fixed inset-0 bg-black opacity-50 z-40"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import courses from './courses';

export default {
  name: 'CourseGrid',
  setup() {
    const coursesList = ref(courses);
    const difficultyWords = ["Trivial", "Easy", "Medium", "Hard", "Expert"];
    const selectedLevel = ref(1);  // Default selected level for mobile users
    const isMobile = ref(false);
    const showModal = ref(false);
    const currentCourse = ref(null);
    const newLevel = ref(null);
    const dropdown = ref(false);
    const coursesByLevel = computed(() => {
      return coursesList.value.reduce((acc, course) => {
        if (!acc[course.level]) acc[course.level] = [];
        acc[course.level].push(course);
        return acc;
      }, {});
    });

    const getDifficultyWord = (difficulty) => difficultyWords[difficulty - 1] || 'Unknown';

    const getTotalHours = (level) => {
      return coursesByLevel.value[level]?.reduce((sum, course) => sum + course.hours, 0) || 0;
    };

    const getAverageDifficulty = (level) => {
      const courses = coursesByLevel.value[level] || [];
      if (courses.length === 0) return 'N/A';
      const avgDifficulty = courses.reduce((sum, course) => sum + course.difficulty, 0) / courses.length;
      return getDifficultyWord(Math.round(avgDifficulty));
    };

    const onDragStart = (event, course, fromLevel) => {
      event.dataTransfer.setData('courseData', JSON.stringify({ course, fromLevel }));
    };

    const onDrop = (event, toLevel) => {
      const { course, fromLevel } = JSON.parse(event.dataTransfer.getData('courseData'));
      if (fromLevel !== toLevel) {
        const courseIndex = coursesList.value.findIndex(c => c.name === course.name);
        if (courseIndex !== -1) {
          coursesList.value[courseIndex] = { ...course, level: toLevel };
          coursesList.value = [...coursesList.value]; // Trigger reactivity
        }
      }
    };

    const checkIfMobile = () => {
      isMobile.value = window.innerWidth <= 768;
      window.innerHeight <= 600 ? (dropdown.value = true) : (dropdown.value = false);
    };

    const openModal = (course) => {
      currentCourse.value = course;
      newLevel.value = course.level;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      currentCourse.value = null;
      newLevel.value = null;
    };

    const changeCourseLevel = () => {
      if (currentCourse.value && newLevel.value !== currentCourse.value.level) {
        const courseIndex = coursesList.value.findIndex(c => c.name === currentCourse.value.name);
        if (courseIndex !== -1) {
          coursesList.value[courseIndex] = { ...currentCourse.value, level: newLevel.value };
          coursesList.value = [...coursesList.value]; // Trigger reactivity
        }
      }
      closeModal();
    };

    onMounted(() => {
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
    });

    return {
      coursesByLevel,
      getDifficultyWord,
      getTotalHours,
      getAverageDifficulty,
      onDragStart,
      onDrop,
      selectedLevel,
      isMobile,
      dropdown,
      showModal,
      openModal,
      closeModal,
      changeCourseLevel,
      newLevel
    };
  }
};
</script>



<style scoped>
.container {
  min-height: 100vh;
}
</style>