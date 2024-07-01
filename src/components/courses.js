// courses.js

const courses = [
    {
      name: 'Introduction to Programming',
      hours: 3,
      difficulty: 2,
      prerequisite: null,
      level: 1
    },
    {
      name: 'Data Structures and Algorithms',
      hours: 4,
      difficulty: 3,
      prerequisite: null,
      level: 2
    },
    {
      name: 'Web Development Fundamentals',
      hours: 3,
      difficulty: 2,
      prerequisite: null,
      level: 1
    },
    {
      name: 'Database Design',
      hours: 4,
      difficulty: 3,
      prerequisite: null,
      level: 2
    },
    {
      name: 'Machine Learning Basics',
      hours: 5,
      difficulty: 4,
      prerequisite: 'Introduction to Programming',
      level: 3
    },
    {
      name: 'Operating Systems',
      hours: 4,
      difficulty: 3,
      prerequisite: 'Introduction to Programming',
      level: 3
    },
    {
      name: 'Computer Networks',
      hours: 4,
      difficulty: 3,
      prerequisite: 'Introduction to Programming',
      level: 5
    },
    {
      name: 'Software Engineering Principles',
      hours: 3,
      difficulty: 2,
      prerequisite: null,
      level: 4
    },
    {
      name: 'Cybersecurity Fundamentals',
      hours: 3,
      difficulty: 2,
      prerequisite: null,
      level: 5
    },
    {
      name: 'Artificial Intelligence Concepts',
      hours: 5,
      difficulty: 1,
      prerequisite: 'Machine Learning Basics',
      level: 3
    },
    {
      name: 'Advanced Web Development',
      hours: 4,
      difficulty: 3,
      prerequisite: 'Web Development Fundamentals',
      level: 6
    },
    {
      name: 'Data Science Essentials',
      hours: 5,
      difficulty: 1,
      prerequisite: 'Data Structures and Algorithms',
      level: 3
    },
    {
      name: 'Mobile App Development',
      hours: 4,
      difficulty: 3,
      prerequisite: 'Web Development Fundamentals',
      level: 7
    },
    {
      name: 'Cloud Computing Basics',
      hours: 3,
      difficulty: 2,
      prerequisite: null,
      level: 8
    },
    {
      name: 'Parallel Computing',
      hours: 4,
      difficulty: 3,
      prerequisite: 'Operating Systems',
      level: 6
    }
  ];
  
  export default courses;
  