import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  fullScreen?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  title = 'Error', 
  message, 
  fullScreen = true 
}) => {
  const containerClasses = fullScreen ? 'min-h-screen flex items-center justify-center' : 'flex items-center justify-center';
  
  return (
    <div className={containerClasses}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage; 