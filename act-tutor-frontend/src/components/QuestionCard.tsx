import React from 'react';

interface QuestionCardProps {
  id: number;
  index: number;
  questionText: string;
  options: string[];
  selectedAnswer?: string;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  id,
  index,
  questionText,
  options,
  selectedAnswer,
  onAnswerSelect
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex gap-4">
        <span className="text-lg font-bold text-gray-700">{index + 1}.</span>
        <div className="flex-1">
          <p className="text-gray-800 mb-4 leading-relaxed">
            {questionText}
          </p>
          <div className="space-y-3">
            {options.map((option, optionIndex) => (
              <label 
                key={optionIndex} 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${id}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => onAnswerSelect(id, option)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard; 