import React from 'react';
import './TestDirections.scss';

interface TestDirectionsProps {
  subject: 'math' | 'english' | 'reading' | 'science';
}

const TestDirections: React.FC<TestDirectionsProps> = ({ subject }) => {
  const getDirections = () => {
    switch (subject) {
      case 'math':
        return (
          <>
            <p>
              DIRECTIONS: Solve each problem, choose the correct answer, and then fill in the corresponding
              oval on your answer document. Do not linger over problems that take too much time. Solve as
              many as you can; then return to the others in the time you have left for this test.
            </p>
            <p>
              You are permitted to use a calculator on this test. You may use your calculator for any
              problems you choose, but some of the problems may best be done without using a calculator.
            </p>
            <p>Note: Unless otherwise stated, all of the following should be assumed:</p>
            <ol>
              <li>Illustrative figures are NOT necessarily drawn to scale.</li>
              <li>Geometric figures lie in a plane.</li>
              <li>The word line indicates a straight line.</li>
              <li>The word average indicates arithmetic mean.</li>
            </ol>
          </>
        );

      case 'english':
        return (
          <p>
            DIRECTIONS: In the passage that follows, certain words and phrases are underlined and numbered.
            In the right-hand column, you will find alternatives for the underlined part. In most cases, you
            are to choose the one that best expresses the idea, makes the statement appropriate for standard
            written English, or is worded most consistently with the style and tone of the passage as a whole.
            If you think the original version is best, choose "NO CHANGE."
          </p>
        );

      case 'reading':
        return (
          <p>
            DIRECTIONS: There are several passages in this test. Each passage is accompanied by several questions.
            After reading a passage, choose the best answer to each question and fill in the corresponding oval
            on your answer document. You may refer to the passages as often as necessary.
          </p>
        );

      case 'science':
        return (
          <>
            <p>
              DIRECTIONS: The passages in this test describe several scientific situations and experiments.
              Each passage is followed by several questions. After reading each passage, select the best
              answer to each question and fill in the corresponding oval on your answer document. You may
              refer to the passages as often as necessary.
            </p>
            <p>
              You are NOT permitted to use a calculator on this test.
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="test-directions">
      {getDirections()}
    </div>
  );
};

export default TestDirections; 