import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../hooks/useDatabase';
import './SciencePage.scss';

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
        // Transform questions into study format
        if (questions.length > 0) {
          const study: Study = {
            id: 1,
            title: "Study 3",
            content: "The scientists determined the thermal conductivity of the 4 rock types at a number of different temperatures between 0°C and 400°C. The results are shown in Figure 1.",
            graph_data: {
              type: 'line',
              url: '/path/to/graph.png', // This would be replaced with actual graph URL
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

  if (!currentStudy) return <div>Loading...</div>;

  return (
    <div className="science-page">
      <div className="directions">
        <h3>DIRECTIONS:</h3>
        <p>
          The passages in this test describe several scientific situations and experiments. 
          Each passage is followed by several questions. After reading each passage, select 
          the best answer to each question and fill in the corresponding oval on your answer 
          document. You may refer to the passages as often as necessary.
        </p>
        <p>
          You are NOT permitted to use a calculator on this test.
        </p>
      </div>

      <div className="content-container">
        <div className="study-section">
          <h2>{currentStudy.title}</h2>
          <div className="study-content">
            <p>{currentStudy.content}</p>
            
            {currentStudy.graph_data && (
              <div className="graph-container">
                <img 
                  src={currentStudy.graph_data.url} 
                  alt={currentStudy.graph_data.caption}
                  className="graph-image"
                />
                <p className="caption">{currentStudy.graph_data.caption}</p>
              </div>
            )}

            {currentStudy.table_data && (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      {currentStudy.table_data.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudy.table_data.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="caption">{currentStudy.table_data.caption}</p>
              </div>
            )}
          </div>
        </div>

        <div className="questions-section">
          {currentStudy.questions.map((question, index) => (
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

export default SciencePage; 