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

  if (!currentPassage) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
        <div className="prose max-w-none space-y-4">
          <p className="text-gray-700 leading-relaxed">
            DIRECTIONS: In the passage that follows, certain words and phrases are underlined and numbered. 
            In the right-hand column, you will find alternatives for the underlined part. In most cases, you are to 
            choose the one that best expresses the idea, makes the statement appropriate for standard written English, 
            or is worded most consistently with the style and tone of the passage as a whole. If you think the original 
            version is best, choose "NO CHANGE." In some cases, you will find in the right-hand column a question about 
            the underlined part. You are to choose the best answer to the question.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You will also find questions about a section of the passage, or about the passage as a whole. These questions 
            do not refer to an underlined portion of the passage, but rather are identified by a number or numbers in a box.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For each question, choose the alternative you consider best and fill in the corresponding oval on your answer 
            document. Read the passage through once before you begin to answer the questions that accompany it. For many 
            of the questions, you must read several sentences beyond the question to determine the answer. Be sure that 
            you have read far enough ahead each time you choose an alternative.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentPassage.title}</h2>
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">
              I grew up with buckets, shovels, and nets <span className="underline decoration-2 decoration-primary">waiting by the</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full ml-1">1</span> 
              back door; hip-waders hanging in the closet; tide table charts covering the refrigerator door; and a microscope 
              <span className="underline decoration-2 decoration-primary">was sitting</span>
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full ml-1">2</span> 
              on the kitchen table.
            </p>
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
                  <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                    Choose the best answer.
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

export default EnglishPage;
