import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Get all questions
  const getQuestions = async (category?: string) => {
    setLoading(true);
    try {
      let query = supabase.from('questions').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Start a new test
  const createTest = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tests')
        .insert([{
          user_id: userId,
          start_time: new Date().toISOString(),
          score: {}
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Save a user's response
  const saveResponse = async (testId: number, questionId: number, answer: string, isCorrect: boolean) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_responses')
        .insert([{
          test_id: testId,
          question_id: questionId,
          user_answer: answer,
          is_correct: isCorrect
        }])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get user's test history
  const getUserTests = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tests')
        .select(`
          *,
          user_responses (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getQuestions,
    createTest,
    saveResponse,
    getUserTests
  };
};