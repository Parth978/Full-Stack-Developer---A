import React, { useContext, useState, useEffect } from "react";
import userPic from "../../public/profile.png";
import userContext from "../context/context";
import axios from 'axios';
import Question from './Questions';
import Result from './Result';
import LoginPrompt from "./LoginPrompt";

const Dashboard = () => {
  const { user } = useContext(userContext);
  const [questions, setQuestions] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(1); // Start at difficulty level 1
  const totalQuestions = 20;
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(new Set());

  useEffect(() => {
    async function fetchQuestions(difficulty) {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions?difficulty=${difficulty}&limit=10`);
        setQuestions(prevQuestions => ({
          ...prevQuestions,
          [difficulty]: response.data
        }));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    if (hasStartedQuiz) {
      // Fetch initial questions for all difficulty levels
      fetchQuestions(1);
      fetchQuestions(2);
      fetchQuestions(3);
      fetchQuestions(5);
      fetchQuestions(4);
    }
  }, [hasStartedQuiz]);

  const handleStartQuiz = () => {
    setHasStartedQuiz(true);
  };

  const handleAnswer = async (questionId, selectedOption) => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answer', { questionId, selectedOption });
      const { isCorrect } = response.data;
      if (isCorrect) {
        setScore(score + 1);
        if (currentDifficulty >= 5) {
          setCurrentDifficulty(5);
        } else {
          setCurrentDifficulty(prevDifficulty => prevDifficulty + 1); // Increase difficulty
        }
      } else {
        setCurrentDifficulty(prevDifficulty => (prevDifficulty > 1 ? prevDifficulty - 1 : 1)); // Decrease difficulty but not below 1
      }

      // Track answered question ID
      setAnsweredQuestionIds(new Set(answeredQuestionIds.add(questionId)));

      // Move to the next question
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (answeredQuestionIds.size >= totalQuestions) {
        setIsQuizCompleted(true);
      } else {
        // Fetch more questions if the current pool is exhausted
        if (nextQuestionIndex >= questions[currentDifficulty].length) {
          await fetchMoreQuestions(currentDifficulty);
          setCurrentQuestionIndex(0); // Reset current question index
        } else {
          setCurrentQuestionIndex(nextQuestionIndex);
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const fetchMoreQuestions = async (difficulty) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/questions?difficulty=${difficulty}&limit=10`);
      setQuestions(prevQuestions => ({
        ...prevQuestions,
        [difficulty]: [...prevQuestions[difficulty], ...response.data]
      }));
    } catch (error) {
      console.error('Error fetching more questions:', error);
    }
  };

  if (isQuizCompleted) {
    return <Result score={score} totalQuestions={totalQuestions} />;
  }

  return (
    <>
      {user !== "" ? (
        <div>
          <div className="bg-red-500 p-4 flex justify-between">
            <h1 className="text-white text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full" src={userPic} alt="user-pic" />
              <h3 className="text-white text-lg ml-2">{user}</h3>
            </div>
          </div>
          <div>
            {hasStartedQuiz ? (
              questions[currentDifficulty].length > 0 && (
                <Question
                  question={questions[currentDifficulty][currentQuestionIndex]}
                  handleAnswer={handleAnswer}
                />
              )
            ) : (
              <div className="flex items-center justify-center min-h-screen">
                <button
                  onClick={handleStartQuiz}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <LoginPrompt />
        </div>
      )}
    </>
  );
};

export default Dashboard;
