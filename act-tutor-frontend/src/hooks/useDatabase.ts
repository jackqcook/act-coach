import { useCallback } from 'react';

// Mock data with more questions and categories
const mockQuestions = [
  {
    id: 1,
    question_text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct_answer: "4",
    category: "math"
  },
  {
    id: 2,
    question_text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct_answer: "Paris",
    category: "geography"
  },
  {
    id: 3,
    question_text: "What is the main idea of this passage?",
    options: [
      "The author's childhood",
      "The importance of education",
      "The history of literature",
      "The impact of technology"
    ],
    correct_answer: "The importance of education",
    category: "Reading"
  },
  {
    id: 4,
    question_text: "What is the atomic number of Hydrogen?",
    options: ["1", "2", "3", "4"],
    correct_answer: "1",
    category: "science"
  },
  // Add more questions as needed
];

export const useDatabase = () => {
  const getQuestions = useCallback(async (category?: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (category) {
      return mockQuestions.filter(q => q.category === category);
    }
    return mockQuestions;
  }, []);

  return {
    getQuestions
  };
};