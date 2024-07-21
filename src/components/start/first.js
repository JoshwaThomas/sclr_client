import React from 'react';
import Jamal from '../../assets/myjamalmypride.png'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-emerald-700">
    <div className="flex justify-center items-center rounded-lg bg-emerald-700 ">
      <div className='mr-32'>
    <img src={Jamal} alt=""/>
    <h2 className='text-amber-300 font-semibold text-center text-2xl mt-4'>"Jamal: Empowering your future with education and scholarship."</h2>
    <div>
    <h1 className='text-white text-center font-semibold text-xl mt-3'>Shows Us The Right Path</h1>
    </div>
    </div>
      <div className='h-56 flex flex-col justify-evenly rounded-lg  mx-40'>
        <button
          onClick={() => navigate('/student/dashboard')}
          className="px-16 py-6 ml-2 bg-amber-50 text-emerald-700 font-bold hover:bg-green-300 rounded-lg"
        >
          Student
        </button>
        <button
          onClick={() => navigate('/login')}
          className="px-16 py-6 ml-2 mt-3 bg-amber-50 text-emerald-700 font-bold hover:bg-green-300  rounded-lg"
        >
          Admin
        </button>
      </div>
      </div>
    </div>
    
  );
}

export default LandingPage;
