const mongoose = require("mongoose");
const Question = require("./Questions");

mongoose
  .connect("mongodb://localhost:27017/adaptive-quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const questions = [
  {
    text: "What is 7 + 8?",
    options: ["14", "15", "16", "17"],
    correctAnswer: "15",
    difficulty: 1,
    tags: ["arithmetic"],
  },
  {
    text: "Solve for x: 2x + 5 = 13",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    difficulty: 2,
    tags: ["algebra"],
  },
  {
    text: "What is the area of a triangle with base 5 cm and height 10 cm?",
    options: ["20 cm²", "25 cm²", "30 cm²", "35 cm²"],
    correctAnswer: "25 cm²",
    difficulty: 1,
    tags: ["geometry"],
  },
  {
    text: "What is the value of π (pi) to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctAnswer: "3.14",
    difficulty: 1,
    tags: ["constants"],
  },
  {
    text: "Which of the following is a prime number?",
    options: ["21", "33", "37", "39"],
    correctAnswer: "37",
    difficulty: 2,
    tags: ["number theory"],
  },
  {
    text: "What is the value of 2³?",
    options: ["6", "8", "9", "12"],
    correctAnswer: "8",
    difficulty: 1,
    tags: ["exponents"],
  },
  {
    text: "What is the slope of the line y = 2x + 3?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    difficulty: 2,
    tags: ["algebra", "geometry"],
  },
  {
    text: "Solve: 5! (5 factorial)",
    options: ["60", "100", "120", "150"],
    correctAnswer: "120",
    difficulty: 2,
    tags: ["factorials"],
  },
  {
    text: "What is the perimeter of a rectangle with length 8 cm and width 3 cm?",
    options: ["22 cm", "24 cm", "26 cm", "28 cm"],
    correctAnswer: "22 cm",
    difficulty: 1,
    tags: ["geometry"],
  },
  {
    text: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: "12",
    difficulty: 1,
    tags: ["square roots"],
  },
  {
    text: "Solve for y: 3y - 4 = 11",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    difficulty: 2,
    tags: ["algebra"],
  },
  {
    text: "What is the value of the expression 3² + 4²?",
    options: ["21", "24", "25", "30"],
    correctAnswer: "25",
    difficulty: 2,
    tags: ["exponents"],
  },
  {
    text: "Convert 3/4 to a decimal.",
    options: ["0.25", "0.5", "0.75", "1.25"],
    correctAnswer: "0.75",
    difficulty: 1,
    tags: ["fractions", "decimals"],
  },
  {
    text: "What is the volume of a cube with side length 3 cm?",
    options: ["9 cm³", "18 cm³", "27 cm³", "36 cm³"],
    correctAnswer: "27 cm³",
    difficulty: 2,
    tags: ["geometry"],
  },
  {
    text: "Which of the following is the quadratic equation?",
    options: [
      "x + 5 = 0",
      "2x² - 3x + 1 = 0",
      "x³ - 2x² + x = 0",
      "3x - 4 = 0",
    ],
    correctAnswer: "2x² - 3x + 1 = 0",
    difficulty: 2,
    tags: ["algebra"],
  },
  {
    text: "What is the sum of the angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: "180°",
    difficulty: 1,
    tags: ["geometry"],
  },
  {
    text: "If a = 3 and b = 4, what is the value of a² + b²?",
    options: ["12", "18", "25", "29"],
    correctAnswer: "25",
    difficulty: 1,
    tags: ["algebra"],
  },
  {
    text: "What is the greatest common divisor (GCD) of 24 and 36?",
    options: ["4", "6", "8", "12"],
    correctAnswer: "12",
    difficulty: 2,
    tags: ["number theory"],
  },
  {
    text: "What is the probability of rolling a sum of 7 with two six-sided dice?",
    options: ["1/6", "1/8", "1/9", "1/12"],
    correctAnswer: "1/6",
    difficulty: 3,
    tags: ["probability"],
  },
  {
    text: "Simplify: (2x + 3)(x - 4)",
    options: ["2x² - 8", "2x² + 3x - 12", "2x² - 5x - 12", "2x² - 8x + 3"],
    correctAnswer: "2x² - 5x - 12",
    difficulty: 3,
    tags: ["algebra"],
  },
  {
    text: "What is 2x + 5 = 15 solved for x?",
    options: ["3", "5", "10", "7"],
    correctAnswer: "5",
    difficulty: 1,
    tags: ["algebra"],
  },
  {
    text: "Simplify: 3(x + 2) - 2(2x - 1)",
    options: ["3x + 4", "3x + 1", "2x + 7", "4x + 1"],
    correctAnswer: "3x + 4",
    difficulty: 1,
    tags: ["algebra"],
  },
  {
    text: "What is the value of x in the equation 2x - 7 = 11?",
    options: ["9", "7", "8", "6"],
    correctAnswer: "9",
    difficulty: 2,
    tags: ["algebra"],
  },
  {
    text: "Solve for y: 2y - 3 = 5y + 1",
    options: ["-2", "4", "2", "3"],
    correctAnswer: "-2",
    difficulty: 2,
    tags: ["algebra"],
  },
  {
    text: "Factorize the expression: x^2 + 5x + 6",
    options: [
      "(x + 3)(x + 2)",
      "(x - 2)(x - 3)",
      "(x + 6)(x + 1)",
      "(x - 1)(x - 5)",
    ],
    correctAnswer: "(x + 3)(x + 2)",
    difficulty: 3,
    tags: ["algebra"],
  },
  {
    text: "What is the slope-intercept form of the equation: 2x + 3y = 6?",
    options: ["y = 2/3x + 2", "y = 2/3x - 2", "y = 3/2x - 2", "y = 3/2x + 2"],
    correctAnswer: "y = -2/3x + 2",
    difficulty: 3,
    tags: ["algebra"],
  },
  {
    text: "What is the value of x in the equation 2(x - 3) = 10?",
    options: ["8", "7", "6", "5"],
    correctAnswer: "8",
    difficulty: 4,
    tags: ["algebra"],
  },
  {
    text: "Solve for x: x^2 - 5x + 6 = 0",
    options: ["x = 2, 3", "x = 3, 4", "x = 1, 5", "x = 2, 4"],
    correctAnswer: "x = 2, 3",
    difficulty: 4,
    tags: ["algebra"],
  },
  {
    text: "Simplify the expression: (x^2 + 3x - 4) ÷ (x - 1)",
    options: ["x + 4", "x + 2", "x - 2", "x - 4"],
    correctAnswer: "x + 4",
    difficulty: 5,
    tags: ["algebra"],
  },
  {
    text: "What is the value of x in the equation √(x + 3) = 5?",
    options: ["22", "17", "12", "8"],
    correctAnswer: "22",
    difficulty: 5,
    tags: ["algebra"],
  },
  // Geometry Questions
  {
    text: "What is the area of a square with side length 5 units?",
    options: ["10 sq. units", "15 sq. units", "20 sq. units", "25 sq. units"],
    correctAnswer: "25 sq. units",
    difficulty: 1,
    tags: ["geometry"],
  },
  {
    text: "What is the perimeter of a rectangle with length 8 units and width 4 units?",
    options: ["24 units", "32 units", "16 units", "12 units"],
    correctAnswer: "24 units",
    difficulty: 1,
    tags: ["geometry"],
  },
  {
    text: "What is the area of a triangle with base 6 units and height 4 units?",
    options: ["10 sq. units", "12 sq. units", "8 sq. units", "24 sq. units"],
    correctAnswer: "12 sq. units",
    difficulty: 2,
    tags: ["geometry"],
  },
  {
    text: "What is the circumference of a circle with radius 5 units?",
    options: ["10π units", "20π units", "15π units", "25π units"],
    correctAnswer: "10π units",
    difficulty: 2,
    tags: ["geometry"],
  },
  {
    text: "What is the surface area of a cube with edge length 3 units?",
    options: ["27 sq. units", "36 sq. units", "45 sq. units", "54 sq. units"],
    correctAnswer: "54 sq. units",
    difficulty: 3,
    tags: ["geometry"],
  },
  {
    text: "What is the volume of a cylinder with radius 4 units and height 6 units?",
    options: [
      "48π cu. units",
      "96π cu. units",
      "64π cu. units",
      "24π cu. units",
    ],
    correctAnswer: "96π cu. units",
    difficulty: 3,
    tags: ["geometry"],
  },
  {
    text: "What is the area of a trapezoid with bases 5 units and 7 units and height 4 units?",
    options: ["24 sq. units", "28 sq. units", "32 sq. units", "36 sq. units"],
    correctAnswer: "24 sq. units",
    difficulty: 4,
    tags: ["geometry"],
  },
  {
    text: "What is the surface area of a sphere with radius 6 units?",
    options: [
      "36π sq. units",
      "72π sq. units",
      "144π sq. units",
      "216π sq. units",
    ],
    correctAnswer: "144π sq. units",
    difficulty: 4,
    tags: ["geometry"],
  },
  {
    text: "Solve for x: 3x^2 - 6x - 2 = 0",
    options: ["-1", "1", "2", "3"],
    correctAnswer: "1",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Find the roots of the equation 4x^3 + 8x^2 - 9x - 18 = 0",
    options: ["-3, -2, 2", "-2, 1, 3", "-3, -1, 3", "-1, 2, 3"],
    correctAnswer: "-3, -1, 3",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Simplify the expression (4x^3 - 8x^2 + 2x) / (2x - 4)",
    options: ["2x^2 - 3x", "2x^2 - 5x", "2x^2 - 7x", "2x^2 - 9x"],
    correctAnswer: "2x^2 - 3x",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "If f(x) = 2x^3 - 4x^2 + 3x - 6, find f'(x)",
    options: ["6x^2 - 8x + 3", "6x^2 - 8x - 3", "4x^2 - 8x + 3", "4x^2 - 8x - 3"],
    correctAnswer: "6x^2 - 8x + 3",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Determine the value of x in the equation log_2(x^2) - log_2(2x - 1) = 2",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    difficulty: 5,
    tags: ["algebra"]
  },
  // Geometry Questions
  {
    text: "Find the area of a regular hexagon with side length 6",
    options: ["54√3", "72√3", "108√3", "144√3"],
    correctAnswer: "54√3",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Calculate the volume of a pyramid with base area 64 and height 15",
    options: ["320", "480", "640", "800"],
    correctAnswer: "640",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Determine the length of the diagonal of a cube with side length 10",
    options: ["10√2", "20√2", "30√2", "40√2"],
    correctAnswer: "10√3",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Find the surface area of a cone with radius 5 and slant height 13",
    options: ["65π", "85π", "105π", "125π"],
    correctAnswer: "85π",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Calculate the volume of a sphere with surface area 144π",
    options: ["36π", "48π", "64π", "72π"],
    correctAnswer: "64π",
    difficulty: 5,
    tags: ["geometry"]
  },
  // Additional Questions
  {
    text: "Solve for x: 2x - 3y = 4",
    options: ["x = 2, y = 0", "x = 1, y = 2", "x = -1, y = -2", "x = 3, y = 2"],
    correctAnswer: "x = 2, y = 0",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Calculate the determinant of the matrix: [[3, 4], [-2, 5]]",
    options: ["11", "13", "17", "19"],
    correctAnswer: "17",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Find the value of x that satisfies the equation 3^(2x+1) = 81",
    options: ["x = 1", "x = 2", "x = 3", "x = 4"],
    correctAnswer: "x = 2",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Simplify the expression: √(48) / 2",
    options: ["2√(3)", "4√(3)", "6√(2)", "8√(2)"],
    correctAnswer: "4√(3)",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Determine the value of k that makes the matrix singular: [[2, 4], [k, 6]]",
    options: ["2", "3", "4", "6"],
    correctAnswer: "4",
    difficulty: 5,
    tags: ["algebra"]
  },
  {
    text: "Find the length of the longest diagonal of a rectangular prism with side lengths 3, 4, and 5",
    options: ["6", "7", "8", "9"],
    correctAnswer: "9",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Calculate the surface area of a cylinder with radius 6 and height 8",
    options: ["288π", "384π", "432π", "576π"],
    correctAnswer: "432π",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Find the length of the arc of a circle with radius 10 and central angle π/3 radians",
    options: ["5π/3", "5π", "10π/3", "10π"],
    correctAnswer: "10π/3",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Determine the area of the region bounded by the curve y = x^2 and the x-axis from x = 1 to x = 4",
    options: ["9", "10", "11", "12"],
    correctAnswer: "9",
    difficulty: 5,
    tags: ["geometry"]
  },
  {
    text: "Solve for x: 2x + 5 = 13",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Factorize the expression: x^2 + 5x + 6",
    options: ["(x + 2)(x + 3)", "(x - 2)(x - 3)", "(x + 2)(x - 3)", "(x - 2)(x + 3)"],
    correctAnswer: "(x + 2)(x + 3)",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Find the value of x: 3x - 7 = 2x + 3",
    options: ["10", "6", "4", "2"],
    correctAnswer: "10",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Solve the inequality: 2x + 3 < 7",
    options: ["x < 2", "x < 4", "x > 2", "x > 4"],
    correctAnswer: "x < 2",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Evaluate the expression: 3(x - 4) + 2(2x + 1) - 5",
    options: ["5x - 5", "5x - 7", "6x - 7", "6x - 5"],
    correctAnswer: "5x - 7",
    difficulty: 4,
    tags: ["algebra"]
  },
  
  // Geometry Questions
  {
    text: "Calculate the area of a triangle with base 6 and height 8",
    options: ["24", "30", "36", "48"],
    correctAnswer: "24",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Find the circumference of a circle with radius 10",
    options: ["20π", "40π", "60π", "80π"],
    correctAnswer: "20π",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Calculate the volume of a cylinder with radius 4 and height 10",
    options: ["80π", "100π", "120π", "160π"],
    correctAnswer: "160π",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Determine the surface area of a rectangular prism with dimensions 5, 6, and 8",
    options: ["160", "200", "240", "280"],
    correctAnswer: "200",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Find the area of a circle with diameter 14",
    options: ["49π", "98π", "196π", "392π"],
    correctAnswer: "49π",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "If f(x) = 2x^2 - 5x + 3, find f(-1)",
    options: ["4", "6", "8", "10"],
    correctAnswer: "10",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Simplify the expression: (2x^2 - 3x - 5)(x^2 + 2x + 4)",
    options: ["2x^4 - 3x^3 - x^2 - 11x - 20", "2x^4 - 3x^3 - 9x^2 - 11x - 20", "2x^4 - 3x^3 - 5x^2 - 11x - 20", "2x^4 - 3x^3 - 5x^2 - 6x - 20"],
    correctAnswer: "2x^4 - 3x^3 - 5x^2 - 11x - 20",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Find the slope of the line passing through the points (3, 5) and (-2, 7)",
    options: ["-1/5", "-2/5", "1/5", "2/5"],
    correctAnswer: "-2/5",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Solve for x: log₂(x - 3) = 2",
    options: ["7", "9", "11", "13"],
    correctAnswer: "7",
    difficulty: 4,
    tags: ["algebra"]
  },
  {
    text: "Determine the domain of the function f(x) = √(4x - 1)",
    options: ["x ≥ 1/4", "x ≥ 1/2", "x ≤ 1/4", "x ≤ 1/2"],
    correctAnswer: "x ≥ 1/4",
    difficulty: 4,
    tags: ["algebra"]
  },
  
  // Geometry Questions
  {
    text: "Calculate the perimeter of a rectangle with length 10 and width 6",
    options: ["20", "22", "24", "26"],
    correctAnswer: "32",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Find the area of a trapezoid with bases 5 and 9 and height 8",
    options: ["56", "64", "72", "80"],
    correctAnswer: "64",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Determine the volume of a cube with edge length 7",
    options: ["343", "392", "441", "490"],
    correctAnswer: "343",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Calculate the surface area of a sphere with radius 9",
    options: ["324π", "486π", "648π", "972π"],
    correctAnswer: "324π",
    difficulty: 4,
    tags: ["geometry"]
  },
  {
    text: "Find the area of a regular pentagon with side length 12",
    options: ["270", "312", "360", "420"],
    correctAnswer: "270",
    difficulty: 4,
    tags: ["geometry"]
  }
];

Question.insertMany(questions)
  .then(() => {
    console.log("Questions added successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error adding questions:", error);
    mongoose.connection.close();
  });
