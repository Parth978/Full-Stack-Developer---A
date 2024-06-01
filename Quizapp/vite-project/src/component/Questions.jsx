import React, { useState } from 'react';

function Question({ question, handleAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = () => {
    handleAnswer(question._id, selectedOption);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{question?.text}</h2>
      <ul>
        {question?.options?.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={onSubmit}
        disabled={!selectedOption}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        submit
      </button>
    </div>
  );
}

export default Question;