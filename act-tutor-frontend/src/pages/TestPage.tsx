import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestPage.scss';

interface Question {
  id: number;
  section: string;
  questionText: string;
  passage?: string;
  options: string[];
  correctAnswer: string;
}

interface TestSetup {
  section: string;
  questionCount: number;
  difficulty: string;
}

const TestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isTestActive, setIsTestActive] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const [testSetup, setTestSetup] = useState<TestSetup>({
    section: 'math',
    questionCount: 10,
    difficulty: 'medium'
  });

  // Fetch questions from the database with filters
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions', {
          params: {
            section: testSetup.section,
            count: testSetup.questionCount,
            difficulty: testSetup.difficulty
          }
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (isTestActive) {
      fetchQuestions();
    }
  }, [isTestActive, testSetup]);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSetup(false);
    setIsTestActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestSetup(prev => ({
      ...prev,
      [name]: name === 'questionCount' ? parseInt(value) : value
    }));
  };

  const submitTest = () => {
    setIsTestActive(false);
    // Add logic to submit answers to backend
  };

  if (showSetup) {
    return (
      <div className="test-page">
        <div className="test-header">
          <h1>ACT Practice Test</h1>
        </div>
        <div className="test-setup">
          <h2>Test Setup</h2>
          <form onSubmit={handleSetupSubmit}>
            <div className="form-group">
              <label htmlFor="section">Select Section:</label>
              <select
                id="section"
                name="section"
                value={testSetup.section}
                onChange={handleInputChange}
              >
                <option value="math">Mathematics</option>
                <option value="english">English</option>
                <option value="reading">Reading</option>
                <option value="science">Science</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="questionCount">Number of Questions:</label>
              <input
                type="number"
                id="questionCount"
                name="questionCount"
                min="1"
                max="60"
                value={testSetup.questionCount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level:</label>
              <select
                id="difficulty"
                name="difficulty"
                value={testSetup.difficulty}
                onChange={handleInputChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button type="submit" className="start-button">Start Test</button>
          </form>
        </div>
      </div>
    );
  }

  if (!isTestActive || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="test-page">
      <div className="test-header">
        <h1>ACT Practice Test - {testSetup.section.toUpperCase()}</h1>
        <div className="timer">Time Remaining: {formatTime(timeRemaining)}</div>
      </div>

      <div className="test-content">
        <div className="question-navigation">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>

        <div className="question-container">
          {currentQuestion.passage && (
            <div className="passage-section">
              <h3>Passage</h3>
              <div className="passage-content">{currentQuestion.passage}</div>
            </div>
          )}

          <div className="question-section">
            <h3>Question</h3>
            <p>{currentQuestion.questionText}</p>
            
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {currentQuestionIndex === questions.length - 1 && (
          <button className="submit-button" onClick={submitTest}>
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage; 