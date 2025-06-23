import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
// import Stud from '../../assets/stud.mp4';
import Loading from '../../assets/Pulse.svg'
import Stud1 from '../../assets/stud1.gif'

function Studentfirst() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDates = async () => {
      const response = await axios.get(`${apiUrl}/api/admin/dates`);
      setData(response.data);
      const { startDate, endDate } = response.data;
      const today = new Date();
      setIsOpen(today >= new Date(startDate) && today <= new Date(endDate));
    };
    fetchDates();
  }, [apiUrl]);

   if (!data) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;

  return (
    <div className="w-screen h-screen flex flex-col  justify-center items-center p-4 bg-blue-500 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-center items-center rounded-lg p-5 bg-blue-500">
        {/* Left Side with Images and Text */}
        <div className=" w-full  lg:w-2/3 h-full 2xl:relative flex flex-col justify-center items-center">

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
          <div className="relative z-10 h-30 w-full  flex flex-col justify-end">
            <img
              src={Stud1}
              alt=""
              className=" absolute -top-30 md:-top-28  w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-60"
            />
            <h2 className="  text-amber-300 font-bold text-center text-lg md:text-2xl lg:text-3xl  mx-20 font-serif ">
              "Jamal &#8211; Empowering your FUTURE with Education and Scholarship."
            </h2>

          </div>
        </div>

        {/* Right Side with Buttons */}
        <div className="flex flex-col justify-center w-full justify-items-center lg:w-1/3 h-full items-center">
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
            <p className="text-2xl text-red-600 font-bold text-center mt-4 lg:mt-10 animate-bounce">
              Fresher Application are Closed
            </p>
          )}
          {isOpen && (
            <p className="text-[14px] text-white font-bold text-center mt-4 lg:mt-10 ">
              To renew your scholarship, login using your ID (registration number), then select the 'Application' option.
              If your password doesn't match, please contact the Scholarship Section.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Studentfirst