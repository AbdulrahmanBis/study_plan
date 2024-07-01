<template>
  <div class="container mx-auto p-4 bg-blue-100">
    <h1 class="text-3xl font-bold mb-4 text-center">Courses</h1>
    <div v-for="level in 8" :key="level" class="mb-4 flex">
      <!-- Left side: Courses (80% width) -->
      <div 
        class="w-4/5 bg-white p-4 rounded-lg shadow-lg mr-4"
        @dragover.prevent
        @drop="onDrop($event, level)"
      >
        <div class="grid grid-cols-4 gap-4">
          <div 
            v-for="course in coursesByLevel[level]" 
            :key="course.name"
            class="bg-gray-100 p-4 rounded-lg shadow cursor-move"
            draggable="true"
            @dragstart="onDragStart($event, course, level)"
          >
            <h3 class="text-md font-semibold text-red-800">{{ course.name }}</h3>
            <p class="text-sm">Hours: {{ course.hours }}</p>
            <p class="text-sm">Difficulty: {{ getDifficultyWord(course.difficulty) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Right side: Hours and Difficulty (20% width) -->
      <div class="w-1/5 bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center">
        <h3 class="text-lg font-bold">Hours: {{ getTotalHours(level) }}</h3>
        <h3 class="text-lg font-bold">Difficulty: {{ getAverageDifficulty(level) }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import courses from './courses';

export default {
  name: 'CourseGrid',
  setup() {
    const coursesList = ref(courses);
    const difficultyWords = ["Trivial", "Easy", "Medium", "Hard", "Expert"];

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

    return {
      coursesByLevel,
      getDifficultyWord,
      getTotalHours,
      getAverageDifficulty,
      onDragStart,
      onDrop
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>