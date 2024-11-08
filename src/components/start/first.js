import React from 'react';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
import Stud1 from '../../assets/stud1.gif'


function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-5 lg:p-5 bg-blue-500 overflow-hidden">
      <div className=" flex flex-col lg:flex-row justify-center items-center bg-blue-500 w-full h-full">

        {/* Left Section with Images and Text */}
        <div className=" w-full lg:w-2/3 h-full 2xl:w-2/3 relative flex flex-col justify-center items-center">

          <div className='flex  flex-col justify-center w-full h-4/5 items-center'>
            <img
              src={Jmclogo}
              alt=""
              className="absolute ml-0  mt-10 h-40 md:h-60 lg:h-96 md:w-60 lg:w-96 opacity-10 2xl:w-1/2 2xl:h-4/5"
            />
            <img
              src={Jamal}
              alt=""
              className="z-10 mt-20  w-44 h-36 md:w-48 md:h-48 lg:w-3/4 lg:h-64"
            />
            <h1 className="z-10 text-white text-center font-semibold text-lg md:text-2xl lg:text-3xl pb-10 italic ">
              Show Us The Right Path
            </h1>
          </div>
          <div className="relative z-10 h-30 w-full  flex flex-col justify-end ">
            <img
              src={Stud1}
              alt=""
              className="absolute -top-30 md:-top-28  w-24 h-24 md:w-36 md:h-36 lg:w-52 lg:h-60 "
            />
            <h2 className="text-amber-300 font-bold text-center text-lg md:text-2xl lg:text-3xl  mx-20 font-serif ">
              &nbsp;&nbsp; "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
            </h2>

          </div>
        </div>

        {/* Right Section with Buttons */}
        <div className="  flex flex-col justify-items-center items-center rounded-lg w-full lg:w-1/3 h-full  ">
          <div>
            <div className="grid grid-cols-2 gap-6  lg:gap-6 w-full mt-36 lg:mb-20 mx-auto 2xl:grid-cols-3 2xl:mt-96">
              {/* Buttons */}
              <button
                onClick={() => navigate('/reglog')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                STUDENT
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                ADMIN
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                DEENIYATH
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                MORAL
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                COE
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                ATTENDANCE
              </button>
            </div>
          </div>
          
          {/* Footer Section */}
          {/* <div className="w-full flex items-center border border-red-950 justify-center relative"> */}
          <div>
            <div className="flex flex-col  text-center animate-pulse">
              <p className="font-semibold text-white text-xs md:text-lg lg:text-xl 2xl:text-2xl">
                Developed By T. Joshwa Anand, <span className="text-xs">II MCA</span>
              </p>
              <p className="font-bold text-white text-xs md:text-lg lg:text-xl 2xl:text-2xl">
                Guided By Dr. O.S. Abdul Qadir, <span className="text-xs">Asst. COE</span>
              </p>
              {/* </div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
