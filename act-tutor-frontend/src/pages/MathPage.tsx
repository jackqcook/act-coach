import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';
import './MathPage.scss';

interface MathQuestion {
  id: number;
  question_text: string;
  image_url?: string;
  options: string[];
  correct_answer: string;
}

const MathPage: React.FC = () => {
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { getQuestions } = useDatabase();
  const location = useLocation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions('math');
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching math questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="math-page">
      <div className="directions">
        <p>
          DIRECTIONS: Solve each problem, choose the correct answer, and then fill in the corresponding
          oval on your answer document. Do not linger over problems that take too much time. Solve as
          many as you can; then return to the others in the time you have left for this test.
        </p>
        <p>
          You are permitted to use a calculator on this test. You may use your calculator for any
          problems you choose, but some of the problems may best be done without using a calculator.
        </p>
        <p>
          Note: Unless otherwise stated, all of the following should be assumed:
        </p>
        <ol>
          <li>Illustrative figures are NOT necessarily drawn to scale.</li>
          <li>Geometric figures lie in a plane.</li>
          <li>The word line indicates a straight line.</li>
          <li>The word average indicates arithmetic mean.</li>
        </ol>
      </div>

      <div className="questions-grid">
        {questions.map((question, index) => (
          <div key={question.id} className="question-container">
            <div className="question-header">
              <span className="question-number">{index + 1}.</span>
              <div className="question-content">
                <p className="question-text">{question.question_text}</p>
                {question.image_url && (
                  <div className="question-image">
                    <img src={question.image_url} alt={`Figure for question ${index + 1}`} />
                  </div>
                )}
              </div>
            </div>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="option">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={selectedAnswers[question.id] === option}
                    onChange={() => handleAnswerSelect(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MathPage; 