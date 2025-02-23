import React from 'react';
import './ScoreDisplay.scss';

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  totalQuestions,
  onReset
}) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  return (
    <div className="score-display">
      <h3>Your Score: {score} out of {totalQuestions} ({percentage}%)</h3>
      <button className="reset-button" onClick={onReset}>
        Try Again
      </button>
    </div>
  );
};

export default ScoreDisplay; 