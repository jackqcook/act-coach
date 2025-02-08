import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestPage.scss';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string>('');

  const handleContinue = () => {
    if (selectedSection === 'math') {
      navigate('/math-sections');
    } else if (selectedSection === 'reading') {
      navigate('/reading');
    } else if (selectedSection === 'english') {
      navigate('/english');
    } else if (selectedSection === 'science') {
      navigate('/science');
    }
  };

  return (
    <div className="test-page">
      <div className="test-setup">
        <h2>Select a Test Section</h2>
        <div className="form-group">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Choose a section</option>
            <option value="math">Mathematics</option>
            <option value="reading">Reading</option>
            <option value="english">English</option>
            <option value="science">Science</option>
          </select>
        </div>

        <button 
          className="continue-button" 
          onClick={handleContinue}
          disabled={!selectedSection}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TestPage;