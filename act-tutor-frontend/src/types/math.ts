export interface MathQuestion {
    math_question_id: number;
    test_id: number;
    math_section_id: number;
    created_at: string;  // dates come as strings from API
    image_url: string | null;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string;
    answer: string;
}

export interface MathSection {
    section_id: number;
    test_id: number;
    difficulty: number;
    num_questions: number;
    created_at: string;
} 