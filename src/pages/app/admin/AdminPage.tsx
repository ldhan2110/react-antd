import type React from 'react';

const AdminPage: React.FC = () => {
  console.log('Rendering AdminPage');
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <h1 className="text-2xl font-bold">Welcome to the Admin Page</h1>
      <p className="mt-4 text-gray-600">This is a placeholder page for admin functionalities.</p>
    </div>
  );
};

export default AdminPage;
