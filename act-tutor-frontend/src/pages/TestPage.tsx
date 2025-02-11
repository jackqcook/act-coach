import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>('');

  const sections = [
    { value: 'math', label: 'Mathematics', path: '/math-sections' },
    { value: 'reading', label: 'Reading', path: '/reading' },
    { value: 'english', label: 'English', path: '/english' },
    { value: 'science', label: 'Science', path: '/science' },
  ];

  const handleContinue = () => {
    const section = sections.find(s => s.value === selectedSection);
    if (section) {
      navigate(section.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
            Select a Test Section
          </h2>
          
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="section" 
                className="sr-only"
              >
                Test Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
              >
                <option value="">Choose a section</option>
                {sections.map(section => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleContinue}
              disabled={!selectedSection}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;