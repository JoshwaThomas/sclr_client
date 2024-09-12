import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
// import Stud from '../../assets/stud.mp4';
import Stud1 from '../../assets/stud1.gif'

function Studentfirst() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDates = async () => { 
      const response = await axios.get(`${apiUrl}/api/admin/dates`);
      const { startDate, endDate } = response.data;
      const today = new Date();
      setIsOpen(today >= new Date(startDate) && today <= new Date(endDate));
    };
    fetchDates();
  }, [apiUrl]);


  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-4 bg-blue-500 overflow-hidden">
    <div className="flex flex-col lg:flex-row justify-center items-center rounded-lg bg-blue-500 space-y-6 lg:space-y-0 lg:space-x-4">
      {/* Left Side with Images and Text */}
      <div className="relative lg:w-1/2 text-center lg:text-left">
        <img src={Jmclogo} alt="" className="absolute inset-0 mt-16 h-48 lg:h-2/3 w-60 lg:w-96 opacity-10 mx-auto lg:ml-36" />
        <img src={Jamal} alt="" className="mt-32 lg:mt-40 opacity-100 mx-auto" />
        <h1 className="text-white font-semibold text-xl lg:text-2xl italic mt-2 lg:-mt-5 lg:mr-10">
          Shows Us The Right Path
        </h1>
        <div className="relative z-10">
          <h2 className="relative z-10 text-amber-300 font-semibold text-2xl lg:text-3xl font-serif mt-8 lg:mt-28">
            "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
          </h2>
          <img src={Stud1} alt="" className="absolute w-32 lg:w-52 h-32 lg:h-52 -ml-12 lg:-ml-16 -mt-28 lg:-mt-44" />
        </div>
      </div>
  
      {/* Right Side with Buttons */}
      <div className="flex flex-col justify-center lg:justify-evenly items-center lg:ml-16 space-y-6 lg:space-y-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {isOpen && (
            <button
              onClick={() => navigate('/freshstudent/application/fresh')}
              className="bg-amber-50 text-black font-bold text-lg lg:text-2xl shadow-2xl px-4 py-3 lg:py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
            >
              Register
            </button>
          )}
          <button
            onClick={() => navigate('/login')}
            className="bg-amber-50 text-black font-bold text-lg lg:text-2xl shadow-2xl px-4 py-3 lg:py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
          >
            Login
          </button>
        </div>
  
        {/* Conditional Message */}
        {!isOpen && (
          <p className="text-lg text-red-600 text-center mt-4 lg:mt-20 lg:-ml-80">
            Fresher application Closed
          </p>
        )}
      </div>
    </div>
  </div>
  );
}

export default Studentfirst