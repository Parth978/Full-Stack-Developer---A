const mongoose = require('mongoose');
const Question = require('./Questions');

mongoose.connect('mongodb://localhost:27017/adaptive-quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const questions = [
  {
    text: 'What is 7 + 8?',
    options: ['14', '15', '16', '17'],
    correctAnswer: '15',
    difficulty: 1,
    tags: ['arithmetic'],
  },
  {
    text: 'Solve for x: 2x + 5 = 13',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    difficulty: 2,
    tags: ['algebra'],
  },
  {
    text: 'What is the area of a triangle with base 5 cm and height 10 cm?',
    options: ['20 cm²', '25 cm²', '30 cm²', '35 cm²'],
    correctAnswer: '25 cm²',
    difficulty: 1,
    tags: ['geometry'],
  },
  {
    text: 'What is the value of π (pi) to two decimal places?',
    options: ['3.12', '3.14', '3.16', '3.18'],
    correctAnswer: '3.14',
    difficulty: 1,
    tags: ['constants'],
  },
  {
    text: 'Which of the following is a prime number?',
    options: ['21', '33', '37', '39'],
    correctAnswer: '37',
    difficulty: 2,
    tags: ['number theory'],
  },
  {
    text: 'What is the value of 2³?',
    options: ['6', '8', '9', '12'],
    correctAnswer: '8',
    difficulty: 1,
    tags: ['exponents'],
  },
  {
    text: 'What is the slope of the line y = 2x + 3?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    difficulty: 2,
    tags: ['algebra', 'geometry'],
  },
  {
    text: 'Solve: 5! (5 factorial)',
    options: ['60', '100', '120', '150'],
    correctAnswer: '120',
    difficulty: 2,
    tags: ['factorials'],
  },
  {
    text: 'What is the perimeter of a rectangle with length 8 cm and width 3 cm?',
    options: ['22 cm', '24 cm', '26 cm', '28 cm'],
    correctAnswer: '22 cm',
    difficulty: 1,
    tags: ['geometry'],
  },
  {
    text: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12',
    difficulty: 1,
    tags: ['square roots'],
  },
  {
    text: 'Solve for y: 3y - 4 = 11',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    difficulty: 2,
    tags: ['algebra'],
  },
  {
    text: 'What is the value of the expression 3² + 4²?',
    options: ['21', '24', '25', '30'],
    correctAnswer: '25',
    difficulty: 2,
    tags: ['exponents'],
  },
  {
    text: 'Convert 3/4 to a decimal.',
    options: ['0.25', '0.5', '0.75', '1.25'],
    correctAnswer: '0.75',
    difficulty: 1,
    tags: ['fractions', 'decimals'],
  },
  {
    text: 'What is the volume of a cube with side length 3 cm?',
    options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    correctAnswer: '27 cm³',
    difficulty: 2,
    tags: ['geometry'],
  },
  {
    text: 'Which of the following is the quadratic equation?',
    options: ['x + 5 = 0', '2x² - 3x + 1 = 0', 'x³ - 2x² + x = 0', '3x - 4 = 0'],
    correctAnswer: '2x² - 3x + 1 = 0',
    difficulty: 2,
    tags: ['algebra'],
  },
  {
    text: 'What is the sum of the angles in a triangle?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '180°',
    difficulty: 1,
    tags: ['geometry'],
  },
  {
    text: 'If a = 3 and b = 4, what is the value of a² + b²?',
    options: ['12', '18', '25', '29'],
    correctAnswer: '25',
    difficulty: 1,
    tags: ['algebra'],
  },
  {
    text: 'What is the greatest common divisor (GCD) of 24 and 36?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '12',
    difficulty: 2,
    tags: ['number theory'],
  },
  {
    text: 'What is the probability of rolling a sum of 7 with two six-sided dice?',
    options: ['1/6', '1/8', '1/9', '1/12'],
    correctAnswer: '1/6',
    difficulty: 3,
    tags: ['probability'],
  },
  {
    text: 'Simplify: (2x + 3)(x - 4)',
    options: ['2x² - 8', '2x² + 3x - 12', '2x² - 5x - 12', '2x² - 8x + 3'],
    correctAnswer: '2x² - 5x - 12',
    difficulty: 3,
    tags: ['algebra'],
  }
];

Question.insertMany(questions)
  .then(() => {
    console.log('Questions added successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error adding questions:', error);
    mongoose.connection.close();
  });