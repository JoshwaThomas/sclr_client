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
          <img src={Jamal} alt="" className="mt-40 opacity-100" />
          <h1 className="text-white text-center font-semibold text-2xl italic -mt-5 mr-10">
            Shows Us The Right Path </h1>
          <div className="relative z-10">
            <h2 className="relative z-10 text-amber-300 font-semibold text-center text-3xl font-serif mt-28 ml-16">
              "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
            </h2>
            <img src={Stud1} alt="" className="absolute  w-30 h-52 -ml-36 -mt-44 " />
          </div>



        </div>
        <div className='mt-36 flex flex-col justify-evenly rounded-lg ml-16'>
          <div className='grid grid-cols-2 gap-14 ml-16'>
            <button
              onClick={() => navigate('/reglog')}
              className="bg-amber-50 text-black font-bold text-2xl shadow-2xl   px-4 py-4 peer-hover: hover:shadow-red-600 hover:bg-amber-200 hover:text-slate-500 rounded-lg  "
            >
              STUDENT
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl  px-4 py-4 hover:bg-amber-200 hover:shadow-orange-500 hover:text-slate-500 rounded-lg"
            >
              ATTENDANCE
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl px-4 py-4 hover:bg-amber-200 hover:shadow-teal-700 hover:text-slate-500 rounded-lg"
            >
              DEENIYATH
            </button>
            <button
              onClick={() => navigate('/login')}
              className="  bg-amber-50 text-black font-bold text-2xl shadow-2xl  px-4 py-4 hover:bg-amber-200 hover:shadow-yellow-400 hover:text-slate-500 rounded-lg"
            >
              MORAL
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl  px-4 py-4 hover:bg-amber-200 hover:shadow-yellow-400 hover:text-slate-500 rounded-lg"
            >
              COE
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl px-4 py-4 hover:bg-amber-200 hover:shadow-yellow-400 hover:text-slate-500 rounded-lg"
            >
              ADMIN
            </button>
          </div>

          <div className=' w-full mt-40   h-full flex items-center justify-center relative'>
            <div className=' absolute bottom-1 right-2 flex flex-col items-start animate-pulse'>
              <p className=' font-medium text-white'>Developed By T. Joshwa Anand , <span className=' text-xs '>II MCA</span></p>
              <p className=' font-semibold text-white'>Guided By <span>Dr. O.S. Abdul Qadir ,</span><span className=' text-xs '> Asst. COE</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LandingPage;
