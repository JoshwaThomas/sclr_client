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
      <div className=" hidden lg:flex justify-center items-center rounded-lg bg-blue-500 ">

        <div className="lg:w-1/2 -ml-10 2xl:w-2/3">
          <img src={Jmclogo} alt="" className="absolute md1:ml-28 mt-16   h-2/3 w-96 lg1:ml-36 opacity-10 2xl:w-1/2 2xl:-ml-48 2xl:h-4/5 2xl:-mt-10" />
          <img src={Jamal} alt="" className="md1:ml-20 md1:mt-36 lg1:mt-40 opacity-100 lg1:ml-0 " />
          <h1 className="md1:ml-28 text-white text-center font-semibold text-2xl italic -mt-5 mr-10 2xl:-ml-96 2xl:text-5xl">
            Show Us The Right Path </h1>
          <div className="relative z-10">
            <h2 className="md1:mt-10 md1:ml-32 relative z-10 text-amber-300 font-semibold text-center text-3xl font-serif lg1:mt-28 lg1:ml-16 2xl:mt-48 ">
              "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
            </h2>
            <img src={Stud1} alt="" className="absolute md1:-mt-52 lg1:w-52 h-52 -ml-16 -mt-44  " />
          </div>



        </div>
        <div className='mt-36 flex flex-col justify-evenly rounded-lg ml-16'>
          <div className='grid grid-cols-2 gap-14 ml-16 2xl:grid-cols-3'>
            <button
              onClick={() => navigate('/reglog')}
              className="bg-amber-50 text-black font-bold text-2xl shadow-2xl   px-4 py-4 peer-hover: hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg  "
            >
              STUDENT
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl  px-4 py-4 hover:bg-amber-200 hover:shadow-yellow-400 hover:text-slate-500 rounded-lg"
            >
              ADMIN
            </button>
            <button
              onClick={() => navigate('/login')}
              className=" bg-amber-50 text-black font-bold text-2xl shadow-2xl px-4 py-4 hover:bg-amber-200 hover:shadow-yellow-400 hover:text-slate-500 rounded-lg"
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
             ATTENDANCE
            </button>
          </div>

          <div className=' w-full h-full flex items-center justify-center relative md1:mt-20 lg1:mt-40'>
            <div className=' absolute bottom-1 right-20 flex flex-col items-start animate-pulse'>
              <p className=' font-medium text-white 2xl:text-3xl'>Developed By T. Joshwa Anand , <span className=' text-xs '>II MCA</span></p>
              <p className=' font-semibold text-white 2xl:text-3xl'>Guided By <span>Dr. O.S. Abdul Qadir ,</span><span className=' text-xs '> Asst. COE</span></p>
            </div>
          </div>
        </div>
      </div>

{/* Mobile view */}
      <div className=" lg:hidden flex flex-col justify-center items-center space-y-2">
      <img src={Jmclogo} alt="" className="h-44 w-36 -mt-7" />
        <h1 className="text-white text-center font-bold text-3xl">
          My Jamal <br/> My Pride
        </h1>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => navigate('/reglog')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            STUDENT
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            ADMIN
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            DEENIYATH
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            MORAL
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            COE
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-base shadow-xl px-2 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            ATTENDANCE
          </button>
        </div>
        <div className="absolute bottom-4 flex flex-col items-center animate-pulse">
          <p className="font-medium text-white text-center">
            Developed By T. Joshwa Anand , <span className="text-xs">II MCA</span>
          </p>
          <p className="font-semibold text-white text-center">
            Guided By <span>Dr. O.S. Abdul Qadir ,</span><span className="text-xs"> Asst. COE</span>
          </p>
        </div>
      </div>
    </div>

  );
}

export default LandingPage;
