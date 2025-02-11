import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MathSection, Difficulty } from "../types/math";
import { supabase } from '../supabaseClient';
import { apiService } from "../services/api.service";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const getDifficultyStyle = (difficulty: Difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-100 text-green-800';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'Hard':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function MathSectionsPage() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [sections, setSections] = useState<MathSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchSections = async () => {
            try {
                const { data, error } = await supabase.from('math_sections').select('*');
                if (error) throw error;
                if (!data) throw new Error('No data returned');
                setSections(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch math sections");
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [user]);

    if (authLoading || loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <ErrorMessage 
            title="Access Required" 
            message="Please log in to view math sections." 
        />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!sections.length) {
        return <ErrorMessage 
            title="No Sections Available" 
            message="Please check back later for available sections." 
        />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Available Math Sections
            </h1>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <div 
                        key={section.section_id} 
                        onClick={() => navigate(`/math/${section.section_id}`)}
                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                Section {section.section_id}
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(section.difficulty)}`}>
                                {section.difficulty}
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Questions</span>
                                <span className="font-medium">{section.num_questions}</span>
                            </div>
                            <div className="pt-4">
                                <button 
                                    className="w-full btn btn-primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/math/${section.section_id}`);
                                    }}
                                >
                                    Start Practice
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
