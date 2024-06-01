import React, { useContext, useState, useEffect } from "react";
import userPic from "../../public/profile.png";
import userContext from "../context/context";
import axios from 'axios';
import Question from './Questions';
import Result from './Result';
import LoginPrompt from "./LoginPrompt";


const Dashboard = () => {
  const { user, setUser } = useContext(userContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        console.log(response);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswer = async (questionId, selectedOption) => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit-answer', { questionId, selectedOption });
      const { isCorrect } = response.data;
      if (isCorrect) {
        setScore(score + 1);
      }

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex >= questions.length) {
        setIsQuizCompleted(true);
      } else {
        setCurrentQuestionIndex(nextQuestionIndex);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (isQuizCompleted) {
    return <Result score={score} totalQuestions={questions.length} />;
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
          {questions.length > 0 && (
            <Question
              question={questions[currentQuestionIndex]}
              handleAnswer={handleAnswer}
            />
          )}
        </div>
        </div>
      ) : (
        <div>
        <LoginPrompt />
        </div>
      )}
    </>
  )

}

  export default Dashboard;
