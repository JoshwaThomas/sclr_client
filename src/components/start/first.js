import React, { useState, useEffect} from "react";
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
// import Stud from '../../assets/stud.mp4';
import Stud1 from '../../assets/stud1.gif';
import Fire from '../../assets/fire.gif'



function LandingPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

 const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); 
    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-blue-500">
      {showPopup ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-blue-500 w-screen h-screen  p-4">
          <img src={Jamal} alt="" className="absolute mt-36 h-3/6 w-1/3 ml-12 opacity-80" />
            <h2 className="text-5xl font-bold mb-4 text-center text-white">JMC Alumini Scholarship</h2>   
            <div className="text-center">
              <button
                onClick={closePopup}
                className=  "bg-amber-50 text-black font-bold text-4xl shadow-2xl  px-12 py-12 hover:bg-green-400 hover:shadow-green-400 hover:text-white rounded-lg mt-52 "
              >
                LAUNCH
              </button>
            </div>
            <img src={Jmclogo} alt="" className="absolute h-2/3 w-96 -mt-72 right-12 " />
            <h2 className="text-2xl font-bold mb-4 text-center mt-32 text-white">"Empowering Future Leaders Through Generosity"</h2>
            <h2 className="text-2xl font-bold mb-4 text-center text-white">"Eleventing the Next Generation Through the Support of Our Esteemed Alumni Community"</h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-x-2 justify-center items-center p-10">
          <div className="flex justify-center items-center rounded-lg bg-blue-500">
          {isVisible &&  <img src={Fire} alt="" className="w-screen h-screen absolute -mt-12 opacity-20" /> }


        <div className="w-1/2 -ml-10">
          <img src={Jmclogo} alt="" className="absolute mt-16   h-2/3 w-96 ml-36 opacity-10 " />
          <img src={Jamal} alt="" className="mt-40  opacity-100" />
          <h1 className="text-white text-center font-semibold text-2xl italic -mt-5 mr-10">
            Shows Us The Right Path </h1>
          <div className="relative z-10">
            <h2 className="relative z-10 text-amber-300 font-semibold text-center text-3xl font-serif mt-28 ml-16">
              "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
            </h2>
            <img src={Stud1} alt="" className="absolute  w-52 h-52 -ml-16 -mt-44 " />
          </div>
        </div>
        <div className='mt-36 flex flex-col justify-evenly rounded-lg ml-16'>
          <div className='grid grid-cols-2 gap-14 ml-16'>
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

          <div className=' w-full mt-40   h-full flex items-center justify-center relative'>
            <div className=' absolute bottom-1 right-20 flex flex-col items-start animate-pulse'>
              <p className=' font-medium text-white'>Developed By T. Joshwa Anand , <span className=' text-xs '>II MCA</span></p>
              <p className=' font-semibold txet-lg text-white'>Guided By <span>Dr. O.S. Abdul Qadir ,</span><span className=' text-xs '> Asst. COE</span></p>
            </div>
          </div>
        </div>
            </div>
          </div>
        )}
      </div>

  );
}

export default LandingPage;
