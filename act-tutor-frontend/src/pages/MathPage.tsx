import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';
import { MathQuestion } from '../types/math';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

export default function MathPage() {
    const { sectionId } = useParams();
    const [questions, setQuestions] = useState<MathQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-red-600 text-center">
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        DIRECTIONS: Solve each problem, choose the correct answer, and then fill in the corresponding
                        oval on your answer document. Do not linger over problems that take too much time. Solve as
                        many as you can; then return to the others in the time you have left for this test.
                    </p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        You are permitted to use a calculator on this test. You may use your calculator for any
                        problems you choose, but some of the problems may best be done without using a calculator.
                    </p>
                    <p className="text-gray-700 mb-2 leading-relaxed">
                        Note: Unless otherwise stated, all of the following should be assumed:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Illustrative figures are NOT necessarily drawn to scale.</li>
                        <li>Geometric figures lie in a plane.</li>
                        <li>The word line indicates a straight line.</li>
                        <li>The word average indicates arithmetic mean.</li>
                    </ol>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
                {questions.map((question) => (
                    <div 
                        key={question.math_question_id} 
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <p className="text-gray-800 mb-4 leading-relaxed font-medium">
                            {question.question}
                        </p>
                        {question.image_url && (
                            <div className="mb-4">
                                <img 
                                    src={question.image_url} 
                                    alt="Question diagram" 
                                    className="mx-auto max-w-full h-auto rounded-lg"
                                />
                            </div>
                        )}
                        <div className="space-y-3">
                            {['a', 'b', 'c', 'd', 'e'].map((option) => (
                                <div 
                                    key={option}
                                    className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <span className="font-medium text-gray-700">
                                        {option.toUpperCase()}. {question[`answer_${option}` as keyof MathQuestion]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 