import React from 'react';
import './QuestionCard.scss';

interface Option {
  letter: string;
  text: string;
}

interface QuestionCardProps {
  questionId: number;
  questionNumber: number;
  questionText: string;
  options: Option[];
  selectedAnswer?: string;
  correctAnswer?: string;
  imageUrl?: string;
  isSubmitted?: boolean;
  onAnswerSelect: (questionId: number, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionId,
  questionNumber,
  questionText,
  options,
  selectedAnswer,
  correctAnswer,
  imageUrl,
  isSubmitted = false,
  onAnswerSelect,
}) => {
  return (
    <div className="question-card">
      <div className="question-content">
        <div className="question-header">
          <span className="question-number">{questionNumber}.</span>
          <p className="question-text">{questionText}</p>
        </div>
        
        {imageUrl && (
          <div className="question-image">
            <img src={imageUrl} alt="Question diagram" />
          </div>
        )}

        <div className="options">
          {options.map(({ letter, text }) => {
            const isSelected = selectedAnswer === letter;
            const isCorrect = isSubmitted && letter === correctAnswer;
            const isWrong = isSubmitted && isSelected && !isCorrect;

            return (
              <label
                key={letter}
                className={`option ${isSelected ? 'selected' : ''} 
                  ${isCorrect ? 'correct' : ''} 
                  ${isWrong ? 'wrong' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${questionId}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(questionId, letter)}
                  disabled={isSubmitted}
                />
                <span>{letter}. {text}</span>
              </label>
            );
          })}
        </div>

        {isSubmitted && (
          <div className="feedback">
            {selectedAnswer === correctAnswer ? (
              <p className="correct-message">Correct!</p>
            ) : (
              <p className="wrong-message">
                Incorrect. The correct answer is {correctAnswer}.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard; 