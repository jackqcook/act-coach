import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';
import { MathQuestion } from '../types/math';
import './MathPage.scss';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

export default function MathPage() {
    const { sectionId } = useParams();
    const [questions, setQuestions] = useState<MathQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
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

            <div className="questions-container">
                {questions.map((question) => (
                    <div key={question.math_question_id} className="question-card">
                        <p>{question.question}</p>
                        {question.image_url && (
                            <img src={question.image_url} alt="Question diagram" />
                        )}
                        <div className="answers">
                            <div className="answer-option">A. {question.answer_a}</div>
                            <div className="answer-option">B. {question.answer_b}</div>
                            <div className="answer-option">C. {question.answer_c}</div>
                            <div className="answer-option">D. {question.answer_d}</div>
                            <div className="answer-option">E. {question.answer_e}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 