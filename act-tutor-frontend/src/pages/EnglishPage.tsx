import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';
import './EnglishPage.scss';

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

const EnglishPage: React.FC = () => {
  const [currentPassage, setCurrentPassage] = useState<Passage | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { getQuestions } = useDatabase();
  const location = useLocation();

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        const questions = await getQuestions('english');
        // Transform questions into passage format
        if (questions.length > 0) {
          const passage: Passage = {
            id: 1,
            title: "A Microscope in the Kitchen",
            content: "I grew up with buckets, shovels, and nets waiting by the back door; hip-waders hanging in the closet; tide table charts covering the refrigerator door; and a microscope was sitting on the kitchen table.",
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
    <div className="english-page">
      <div className="directions">
        <p>
          DIRECTIONS: In the passage that follows, certain words and phrases are underlined and numbered. 
          In the right-hand column, you will find alternatives for the underlined part. In most cases, you are to 
          choose the one that best expresses the idea, makes the statement appropriate for standard written English, 
          or is worded most consistently with the style and tone of the passage as a whole. If you think the original 
          version is best, choose "NO CHANGE." In some cases, you will find in the right-hand column a question about 
          the underlined part. You are to choose the best answer to the question.
        </p>
        <p>
          You will also find questions about a section of the passage, or about the passage as a whole. These questions 
          do not refer to an underlined portion of the passage, but rather are identified by a number or numbers in a box.
        </p>
        <p>
          For each question, choose the alternative you consider best and fill in the corresponding oval on your answer 
          document. Read the passage through once before you begin to answer the questions that accompany it. For many 
          of the questions, you must read several sentences beyond the question to determine the answer. Be sure that 
          you have read far enough ahead each time you choose an alternative.
        </p>
      </div>

      <div className="content-container">
        <div className="passage-section">
          <h2>{currentPassage.title}</h2>
          <div className="passage-text">
            <p>
              I grew up with buckets, shovels, and nets <span className="underlined">waiting by the</span> 
              <span className="number">1</span> back door; hip-waders hanging in the closet; tide table 
              charts covering the refrigerator door; and a microscope <span className="underlined">was sitting</span>
              <span className="number">2</span> on the kitchen table.
            </p>
          </div>
        </div>

        <div className="questions-section">
          {currentPassage.questions.map((question, index) => (
            <div key={question.id} className="question-container">
              <div className="question-number">{index + 1}.</div>
              <div className="question-content">
                <p className="question-text">Choose the best answer.</p>
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

export default EnglishPage;
