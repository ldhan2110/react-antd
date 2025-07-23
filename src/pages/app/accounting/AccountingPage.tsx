import type React from 'react';

const AccoutingPage: React.FC = () => {
  console.log('Rendering AccoutingPage');
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-2xl font-bold">Welcome to the Accouting Page</h1>
      <p className="mt-4 text-gray-600">
        This is a placeholder page for Accouting functionalities.
      </p>
    </div>
  );
};

export default AccoutingPage;
