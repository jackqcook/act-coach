import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionCard from '../components/QuestionCard';

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

  if (!currentPassage) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentPassage.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">
            {currentPassage.content}
          </p>
        </div>

        <div className="space-y-6">
          {currentPassage.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              index={index}
              questionText={question.question_text}
              options={question.options}
              selectedAnswer={selectedAnswers[question.id]}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishPage;
