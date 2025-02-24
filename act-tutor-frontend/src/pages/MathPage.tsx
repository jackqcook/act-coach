import { useState, useEffect } from 'react';
// import { apiService } from '../services/api.service';
import { MathQuestion } from '../types/math';
import './MathPage.scss';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';
import ScoreDisplay from '../components/ScoreDisplay';
import ExplanationChat from '../components/ExplanationChat';
import { getExplanation, sendFollowUpQuestion, getExplanationsForQuestions } from '../services/chatgptService';

export default function MathPage() {
    const { sectionId } = useParams();
    const [questions, setQuestions] = useState<MathQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [explanations, setExplanations] = useState<Record<number, string>>({});
    
    // Fetch questions for a specific section (e.g., section_id = 1)
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data, error } = await supabase
                    .from('math_question')
                    .select('*')
                    .eq('math_section_id', sectionId);
                if (error) {
                    throw error;
                }
                console.log('Fetched questions:', data); // Debug log
                setQuestions(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };
        
        if (sectionId) {
            fetchQuestions();
        }
    }, [sectionId]);

    const handleAnswerSelect = (questionId: number, answer: string) => {
        if (!isSubmitted) {
            console.log('Selected answer:', answer); // Debug log
            setSelectedAnswers(prev => ({
                ...prev,
                [questionId]: answer
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            console.log('Starting submission...'); // Debug log
            let correctAnswers = 0;
            const questionsToExplain: Array<{
                question: string;
                selectedAnswer?: string;
                correctAnswer: string;
            }> = [];

            // First pass: count correct answers and collect questions that need explanations
            for (const question of questions) {
                const selectedAnswer = selectedAnswers[question.math_question_id];
                console.log('Processing question:', { // Debug log
                    id: question.math_question_id,
                    question: question.question,
                    selectedAnswer,
                    correctAnswer: question.answer
                });

                if (!selectedAnswer) {
                    questionsToExplain.push({
                        question: question.question,
                        selectedAnswer: undefined,
                        correctAnswer: question.answer
                    });
                } else if (selectedAnswer.toLowerCase() === question.answer?.toLowerCase()) {
                    correctAnswers++;
                } else {
                    questionsToExplain.push({
                        question: question.question,
                        selectedAnswer,
                        correctAnswer: question.answer
                    });
                }
            }

            console.log('Questions to explain:', questionsToExplain); // Debug log

            // Get explanations for all incorrect answers at once
            const explanationResults = await getExplanationsForQuestions(questionsToExplain);
            console.log('Explanation results:', explanationResults); // Debug log

            // Create the explanations object
            const newExplanations: Record<number, string> = {};
            questions.forEach((question) => {
                const selectedAnswer = selectedAnswers[question.math_question_id];
                const questionIndex = questionsToExplain.findIndex(
                    q => q.question === question.question
                );

                if (selectedAnswer?.toLowerCase() === question.answer?.toLowerCase()) {
                    newExplanations[question.math_question_id] = "Correct!";
                } else if (questionIndex >= 0) {
                    newExplanations[question.math_question_id] = explanationResults[questionIndex];
                } else {
                    newExplanations[question.math_question_id] = "Question was not answered.";
                }
            });

            console.log('Final explanations:', newExplanations); // Debug log

            setExplanations(newExplanations);
            setScore(correctAnswers);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            // Set a generic explanation for all questions in case of error
            const errorExplanations: Record<number, string> = {};
            questions.forEach(question => {
                errorExplanations[question.math_question_id] = "Sorry, there was an error getting the explanation.";
            });
            setExplanations(errorExplanations);
            setIsSubmitted(true);
        }
    };

    const handleReset = () => {
        setSelectedAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setExplanations({});
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="math-page">
            <div className="directions">
                <p>
                    DIRECTIONS: Solve each problem, choose the correct answer, and then fill in the corresponding
                    oval on your answer document. Do not linger over problems that take too much time. Solve as
                    many as you can; then return to the others in the time you have left for this test.
                </p>
                <p>
                    You are permitted to use a calculator on this test. You may use your calculator for any
                    problems you choose, but some of the problems may best be done without using a calculator.
                </p>
                <p>
                    Note: Unless otherwise stated, all of the following should be assumed:
                </p>
                <ol>
                    <li>Illustrative figures are NOT necessarily drawn to scale.</li>
                    <li>Geometric figures lie in a plane.</li>
                    <li>The word line indicates a straight line.</li>
                    <li>The word average indicates arithmetic mean.</li>
                </ol>
            </div>

            {isSubmitted && (
                <ScoreDisplay
                    score={score}
                    totalQuestions={questions.length}
                    onReset={handleReset}
                />
            )}

            <div className="questions-container">
                {questions.map((question) => {
                    // Debug log for each question
                    console.log('Question:', {
                        id: question.math_question_id,
                        answer: question.answer,
                        selected: selectedAnswers[question.math_question_id]
                    });
                    
                    return (
                        <div key={question.math_question_id} className="question-card">
                            <p>{question.question}</p>
                            {question.image_url && (
                                <img src={question.image_url} alt="Question diagram" />
                            )}
                            <div className="answers">
                                {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                                    const answerKey = `answer_${letter.toLowerCase()}` as keyof MathQuestion;
                                    const answerText = question[answerKey];
                                    const isSelected = selectedAnswers[question.math_question_id] === letter;
                                    const isCorrect = isSubmitted && letter.toLowerCase() === question.answer?.toLowerCase();
                                    const isWrong = isSubmitted && isSelected && !isCorrect;

                                    return (
                                        <div
                                            key={letter}
                                            className={`answer-option ${isSelected ? 'selected' : ''} 
                                                ${isCorrect ? 'correct' : ''} 
                                                ${isWrong ? 'wrong' : ''}`}
                                            onClick={() => handleAnswerSelect(question.math_question_id, letter)}
                                        >
                                            {letter}. {answerText}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!isSubmitted && questions.length > 0 && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit Answers
                </button>
            )}

            {isSubmitted && (
                <div className="explanations">
                    <h3>Explanations and Discussion:</h3>
                    {Object.entries(explanations).map(([questionId, explanation]) => {
                        const question = questions.find(q => q.math_question_id.toString() === questionId);
                        if (!question) return null;

                        const isExplanationUnavailable = explanation.includes('temporarily unavailable');
                        
                        return (
                            <div key={questionId} className="explanation">
                                <p><strong>Question {questionId}:</strong></p>
                                {isExplanationUnavailable ? (
                                    <div className="explanation-unavailable">
                                        <p>{explanation}</p>
                                        <p>In the meantime, here's the correct answer: {question.answer}</p>
                                        <p>You selected: {selectedAnswers[parseInt(questionId)] || "No answer selected"}</p>
                                    </div>
                                ) : selectedAnswers[parseInt(questionId)] ? (
                                    <ExplanationChat
                                        questionId={questionId}
                                        question={question.question}
                                        selectedAnswer={selectedAnswers[parseInt(questionId)]}
                                        correctAnswer={question.answer}
                                        initialExplanation={explanation}
                                        onSendMessage={(message) => 
                                            sendFollowUpQuestion(
                                                question.question,
                                                selectedAnswers[parseInt(questionId)],
                                                question.answer,
                                                explanation,
                                                message
                                            )
                                        }
                                    />
                                ) : (
                                    <p>{explanation}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
} 