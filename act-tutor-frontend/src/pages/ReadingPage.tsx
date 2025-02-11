import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';

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

  if (!currentPassage) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-3">DIRECTIONS:</h3>
        <p className="text-gray-700 leading-relaxed">
          There are several passages in this test. Each passage is accompanied by several questions. 
          After reading a passage, choose the best answer to each question and fill in the corresponding 
          oval on your answer document. You may refer to the passages as often as necessary.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4">
            <span className="text-lg font-bold text-gray-700">1.</span>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentPassage.title}</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {currentPassage.content}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentPassage.questions.map((question, index) => (
            <div 
              key={question.id} 
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex gap-4">
                <span className="text-lg font-bold text-gray-700">{index + 1}.</span>
                <div className="flex-1">
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {question.question_text}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <label 
                        key={optionIndex} 
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={selectedAnswers[question.id] === option}
                          onChange={() => handleAnswerSelect(question.id, option)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
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