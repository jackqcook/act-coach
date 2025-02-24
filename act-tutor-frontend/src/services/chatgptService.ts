import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Queue for processing requests
let requestQueue: Promise<any> = Promise.resolve();

// Add delay between requests (increased to 5 seconds)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Process requests sequentially with delay
const processSequentially = async <T>(items: T[], processor: (item: T) => Promise<any>, delayMs = 5000) => {
  const results = [];
  for (const item of items) {
    try {
      const result = await processor(item);
      results.push(result);
      await delay(delayMs); // Wait between requests
    } catch (error: unknown) {
      console.error('Error processing item:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      results.push('Error: ' + errorMessage);
    }
  }
  return results;
};

export const getExplanation = async (question: string, selectedAnswer: string | undefined, correctAnswer: string) => {
  if (!selectedAnswer) {
    return "Question was not answered.";
  }

  if (!apiKey) {
    return 'Error: OpenAI API key is not configured.';
  }

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful math tutor explaining why an answer is correct or incorrect."
      },
      {
        role: "user",
        content: `For this question: "${question}", explain why "${selectedAnswer}" is incorrect and why "${correctAnswer}" is the correct answer. Be clear and concise.`
      }
    ]
  };

  try {
    const response = await axios.post(
      apiUrl,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data?.choices?.[0]?.message?.content?.trim() || 'No explanation available.';
  } catch (error: any) {
    console.error('Error getting explanation:', error.response?.data || error.message);
    
    if (error.response?.data?.error?.code === 'insufficient_quota') {
      return 'Explanations are temporarily unavailable. Please try again later or contact support.';
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    } else if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request format.');
    }
    
    throw new Error('Failed to get explanation. Please try again later.');
  }
};

export const getExplanationsForQuestions = async (questions: Array<{
  question: string,
  selectedAnswer?: string,
  correctAnswer: string
}>) => {
  return processSequentially(
    questions,
    async (q) => {
      try {
        return await getExplanation(q.question, q.selectedAnswer, q.correctAnswer);
      } catch (error: any) {
        return `Error: ${error.message || 'Failed to get explanation'}`;
      }
    },
    5000 // 5 second delay between questions
  );
};

export const sendFollowUpQuestion = async (
  question: string,
  selectedAnswer: string,
  correctAnswer: string,
  originalQuestion: string,
  followUpQuestion: string
) => {
  if (!apiKey) {
    return 'Error: OpenAI API key is not configured.';
  }

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful math tutor having a conversation about a math problem. Provide clear, step-by-step explanations."
      },
      {
        role: "user",
        content: `For this math question: "${question}", the student chose "${selectedAnswer}" but the correct answer was "${correctAnswer}". They are asking: "${followUpQuestion}"`
      }
    ]
  };

  try {
    const response = await axios.post(
      apiUrl,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data?.choices?.[0]?.message?.content?.trim() || 'No response available.';
  } catch (error: any) {
    console.error('Error sending follow-up:', error.response?.data || error.message);
    if (error.response?.data?.error?.code === 'insufficient_quota') {
      return 'Chat feature is temporarily unavailable. Please try again later or contact support.';
    }
    return 'Failed to get response. Please try again later.';
  }
};
