import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';

interface Question {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
}

interface Study {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  graph_data?: {
    type: 'line' | 'bar' | 'scatter';
    url: string;
    caption: string;
  };
  table_data?: {
    headers: string[];
    rows: string[][];
    caption: string;
  };
  questions: Question[];
}

const SciencePage: React.FC = () => {
  const [currentStudy, setCurrentStudy] = useState<Study | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { getQuestions } = useDatabase();
  const location = useLocation();

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const questions = await getQuestions('science');
        if (questions.length > 0) {
          const study: Study = {
            id: 1,
            title: "Study 3",
            content: "The scientists determined the thermal conductivity of the 4 rock types at a number of different temperatures between 0°C and 400°C. The results are shown in Figure 1.",
            graph_data: {
              type: 'line',
              url: '/path/to/graph.png',
              caption: "Figure 1: Thermal conductivity of different rock types at various temperatures"
            },
            questions: questions
          };
          setCurrentStudy(study);
        }
      } catch (error) {
        console.error('Error fetching study:', error);
      }
    };

    fetchStudy();
  }, []);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  if (!currentStudy) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-3">DIRECTIONS:</h3>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The passages in this test describe several scientific situations and experiments. 
            Each passage is followed by several questions. After reading each passage, select 
            the best answer to each question and fill in the corresponding oval on your answer 
            document. You may refer to the passages as often as necessary.
          </p>
          <p className="font-medium">
            You are NOT permitted to use a calculator on this test.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentStudy.title}</h2>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">{currentStudy.content}</p>
            
            {currentStudy.graph_data && (
              <div className="space-y-2">
                <img 
                  src={currentStudy.graph_data.url} 
                  alt={currentStudy.graph_data.caption}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
                <p className="text-sm text-gray-600 text-center italic">
                  {currentStudy.graph_data.caption}
                </p>
              </div>
            )}

            {currentStudy.table_data && (
              <div className="space-y-2">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {currentStudy.table_data.headers.map((header, index) => (
                          <th 
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentStudy.table_data.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 text-center italic">
                  {currentStudy.table_data.caption}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {currentStudy.questions.map((question, index) => (
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

export default SciencePage; 