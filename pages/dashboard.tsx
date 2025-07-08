import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import ProjectsList from '../components/ProjectsList';
import ProjectForm from '../components/ProjectForm';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Called after successful project creation
  const handleProjectCreated = () => {
    setShowForm(false);
    setRefresh(r => r + 1); // trigger ProjectsList refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">PharmaBrand AI Dashboard</h1>
        <AuthForm />
        <div className="my-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowForm(true)}
          >
            Create New Brand Project
          </button>
          {/* Modal for ProjectForm */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-lg">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black"
                  onClick={() => setShowForm(false)}
                >
                  &times;
                </button>
                <ProjectForm onSuccess={handleProjectCreated} />
              </div>
            </div>
          )}
          <ProjectsList key={refresh} />
        </div>
      </div>
    </div>
  );
} 