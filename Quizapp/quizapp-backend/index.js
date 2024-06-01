const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Question = require('./Questions');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/adaptive-quiz').then(() => console.log('connected to mongoDb')).catch((err) => console.log(err));

// Routes
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/submit-answer', async (req, res) => {
  const { questionId, selectedOption } = req.body;
  try {
    const question = await Question.findById(questionId);
    const isCorrect = question.correctAnswer === selectedOption;
    res.json({ isCorrect, correctAnswer: question.correctAnswer });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
})