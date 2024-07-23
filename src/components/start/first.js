import React from 'react';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
// import Stud from '../../assets/stud.mp4';
import Stud1 from '../../assets/stud1.gif'

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className=" w-screen h-screen flex flex-col space-x-4  overflow-hidden justify-center items-center p-10 bg-blue-500">
      <div className="flex justify-center items-center rounded-lg bg-blue-500 ">

        <div className="w-1/2 -ml-10">
          <img src={Jmclogo} alt="" className="absolute mt-16   h-2/3 w-96 ml-36 opacity-10 " />
          <img src={Jamal} alt="" className="mt-40 opacity-100"/>
          <h1 className="text-white text-center font-semibold text-2xl italic -mt-5 mr-10">
              Shows Us The Right Path </h1>
          <div className="relative z-10">
          <h2 className="relative z-10 text-amber-300 font-semibold text-center text-3xl font-serif mt-28 ml-16">
            "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
          </h2>
              <img src={Stud1} alt="" className="absolute  w-30 h-52 -ml-36 -mt-44 " />
          </div>
        
       

        </div>
        <div className='h-56 flex flex-col justify-evenly rounded-lg mx-20'>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="px-20 py-7 ml-20 bg-amber-50 text-black font-bold text-2xl hover:bg-amber-200 hover:text-black rounded-lg"
          >
            STUDENT
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-20 py-7 ml-20 mt-10 bg-amber-50 text-black font-bold text-2xl hover:bg-amber-200 hover:text-black rounded-lg"
          >
            ADMIN
          </button>
        </div>
      </div>
    </div>

  );
}

export default LandingPage;
