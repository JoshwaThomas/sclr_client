import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-yellow-300 container">
      <div className="space-x-4">
        <button
          onClick={() => navigate('/student')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Student
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Admin
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
