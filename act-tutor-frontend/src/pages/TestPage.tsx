import React, { useState, useCallback } from 'react';
import { useDatabase } from '../hooks/useDatabase';

// Define types for better type safety
interface Question {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
  category: string;
}

interface TestConfig {
  category: string;
  questionCount: number;
}

interface TestState {
  questions: Question[];
  answers: Record<number, string>;
  isSubmitted: boolean;
  score?: number;
}

const CATEGORIES = ['math', 'geography', 'reading', 'science'];
const QUESTION_COUNTS = [5, 10, 15, 20, 25];

const TestPage: React.FC = () => {
  // Configuration state
  const [isConfiguring, setIsConfiguring] = useState(true);
  const [config, setConfig] = useState<TestConfig>({
    category: '',
    questionCount: QUESTION_COUNTS[0],
  });

  // Test state
  const [testState, setTestState] = useState<TestState>({
    questions: [],
    answers: {},
    isSubmitted: false,
  });

  const { getQuestions } = useDatabase();

  // Handle configuration changes
  const handleConfigChange = (field: keyof TestConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  // Generate test based on configuration
  const handleStartTest = async () => {
    try {
      const allQuestions = await getQuestions(config.category);
      // Randomly select questions based on questionCount
      const selectedQuestions = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, config.questionCount);

      setTestState({
        questions: selectedQuestions,
        answers: {},
        isSubmitted: false,
      });
      setIsConfiguring(false);
    } catch (error) {
      console.error('Error generating test:', error);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answer: string) => {
    if (!testState.isSubmitted) {
      setTestState(prev => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: answer },
      }));
    }
  };

  // Handle test submission
  const handleSubmitTest = () => {
    const score = testState.questions.reduce((acc, question) => {
      return acc + (testState.answers[question.id] === question.correct_answer ? 1 : 0);
    }, 0);

    setTestState(prev => ({
      ...prev,
      isSubmitted: true,
      score,
    }));
  };

  // Reset test to configuration screen
  const handleReset = () => {
    setIsConfiguring(true);
    setTestState({
      questions: [],
      answers: {},
      isSubmitted: false,
    });
  };

  if (isConfiguring) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Configure Your ACT Practice Test</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2">Select Category:</label>
            <select
              className="w-full p-2 border rounded"
              value={config.category}
              onChange={(e) => handleConfigChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Number of Questions:</label>
            <select
              className="w-full p-2 border rounded"
              value={config.questionCount}
              onChange={(e) => handleConfigChange('questionCount', Number(e.target.value))}
            >
              {QUESTION_COUNTS.map(count => (
                <option key={count} value={count}>{count} Questions</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleStartTest}
        >
          Start Test
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          ACT Practice Test
          {testState.isSubmitted && testState.score !== undefined && (
            <span className="ml-4">
              Score: {testState.score} / {testState.questions.length}
              ({((testState.score / testState.questions.length) * 100).toFixed(1)}%)
            </span>
          )}
        </h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleReset}
        >
          New Test
        </button>
      </div>

      <div className="space-y-6">
        {testState.questions.map((q, index) => (
          <div
            key={q.id}
            className="p-4 border rounded shadow-sm"
          >
            <h3 className="font-bold mb-3">
              {index + 1}. {q.question_text}
            </h3>
            <div className="space-y-2">
              {q.options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type="radio"
                    id={`q${q.id}-${idx}`}
                    name={`question-${q.id}`}
                    value={option}
                    checked={testState.answers[q.id] === option}
                    onChange={() => handleAnswerSelect(q.id, option)}
                    disabled={testState.isSubmitted}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`q${q.id}-${idx}`}
                    className={
                      testState.isSubmitted
                        ? option === q.correct_answer
                          ? 'text-green-600'
                          : testState.answers[q.id] === option
                          ? 'text-red-600'
                          : ''
                        : ''
                    }
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {testState.isSubmitted && (
              <div className="mt-2 text-sm">
                {testState.answers[q.id] === q.correct_answer ? (
                  <span className="text-green-600">Correct!</span>
                ) : (
                  <span className="text-red-600">
                    Incorrect. Correct answer: {q.correct_answer}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!testState.isSubmitted && testState.questions.length > 0 && (
        <div className="mt-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmitTest}
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;