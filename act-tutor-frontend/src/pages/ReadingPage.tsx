import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';
import './ReadingPage.scss';

interface Question {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
}

interface Passage {
  id: number;
  title: string;
  content: string;
  questions: Question[];
}

const ReadingPage: React.FC = () => {
  const [currentPassage, setCurrentPassage] = useState<Passage | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { getQuestions } = useDatabase();
  const location = useLocation();

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const questions = await getQuestions('reading');
        // Transform questions into passage format
        if (questions.length > 0) {
          const passage: Passage = {
            id: 1,
            title: "The Men of Brewster Place",
            content: "Clifford Jackson, or Abshu, as he preferred to be called...",
            questions: questions
          };
          setCurrentPassage(passage);
        }
      } catch (error) {
        console.error('Error fetching passage:', error);
      }
    };

    fetchPassage();
  }, []);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  if (!currentPassage) return <div>Loading...</div>;

  return (
    <div className="reading-page">
      <div className="directions">
        <h3>DIRECTIONS:</h3>
        <p>There are several passages in this test. Each passage is accompanied by several questions. After reading a passage, choose the best answer to each question and fill in the corresponding oval on your answer document. You may refer to the passages as often as necessary.</p>
      </div>

      <div className="content-container">
        <div className="passage-section">
          <div className="passage-number">1.</div>
          <div className="passage-content">
            <h2>{currentPassage.title}</h2>
            <div className="passage-text">{currentPassage.content}</div>
          </div>
        </div>

        <div className="questions-section">
          {currentPassage.questions.map((question, index) => (
            <div key={question.id} className="question-container">
              <div className="question-number">{index + 1}.</div>
              <div className="question-content">
                <p className="question-text">{question.question_text}</p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingPage; 