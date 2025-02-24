import React, { useState } from 'react';
import './ExplanationChat.scss';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ExplanationChatProps {
  questionId: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  initialExplanation: string;
  onSendMessage: (message: string) => Promise<string>;
}

const ExplanationChat: React.FC<ExplanationChatProps> = ({
  questionId,
  question,
  selectedAnswer,
  correctAnswer,
  initialExplanation,
  onSendMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialExplanation }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Get response from ChatGPT
      const response = await onSendMessage(userMessage);
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="explanation-chat">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content loading">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ExplanationChat; 