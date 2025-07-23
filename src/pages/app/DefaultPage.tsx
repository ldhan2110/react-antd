// PGM_ID: ADM_001 - What's news page ?
import type React from 'react';

const DefaultPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-2xl font-bold">Welcome to the Default Page</h1>
      <p className="mt-4 text-gray-600">This is a placeholder page.</p>
    </div>
  );
};

export default DefaultPage;
