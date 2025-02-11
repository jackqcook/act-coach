import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = true }) => {
  const containerClasses = fullScreen ? 'min-h-screen flex items-center justify-center' : 'flex items-center justify-center';
  
  return (
    <div className={containerClasses}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingSpinner; 