import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MathSection } from "../types/math";
import { supabase } from '../supabaseClient';
import { apiService } from "../services/api.service";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext

export default function MathSectionsPage() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth(); // Check if user is authenticated
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

    if (authLoading || loading) return <div>Loading...</div>;
    if (!user) return <div>Please log in to view math sections.</div>;
    if (error) return <div>Error: {error}</div>;
    if (!sections.length) return <div>No sections available</div>;

    return (
        <div className="math-sections-page">
            <h1>Available Math Sections</h1>
            <div className="sections-grid">
                {sections.map((section) => (
                    <div 
                        key={section.section_id} 
                        className="section-card"
                        onClick={() => navigate(`/math/${section.section_id}`)}
                    >
                        <h2>Section {section.section_id}</h2>
                        <p>Difficulty: {section.difficulty}</p>
                        <p>Questions: {section.num_questions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
