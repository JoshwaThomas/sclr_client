import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-emerald-700">
    <div className="flex justify-center items-center rounded-lg bg-emerald-700 ">
      <div className=' h-56 flex flex-col justify-evenly rounded-lg  mx-40'>
        <button
          onClick={() => navigate('/student/dashboard')}
          className="px-4 py-2 bg-amber-50 text-emerald-700 font-bold rounded-lg"
        >
          Student
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-amber-50 text-emerald-700 font-bold rounded-lg"
        >
          Admin
        </button>
      </div>
      </div>
    </div>
    
  );
}

export default LandingPage;
