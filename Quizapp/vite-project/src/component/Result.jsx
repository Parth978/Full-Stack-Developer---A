import React from 'react';

function Result({ score, totalQuestions }) {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p className="text-lg mb-2">Your Score: <span className="font-bold">{score}</span> out of <span className="font-bold">{totalQuestions}</span></p>
      <p className="text-lg">Percentage: <span className="font-bold">{((score / totalQuestions) * 100).toFixed(2)}%</span></p>
    </div>
  );
}

export default Result;