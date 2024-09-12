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
            <img src={Stud1} alt="" className="absolute  w-52 h-52 -ml-16 -mt-44" />
          </div>



        </div>
        <div className='flex flex-col justify-evenly rounded-lg ml-16'>
          <div className='grid grid-cols-2 gap-14 ml-16'>
          {isOpen ? (
              <button
                onClick={() => navigate('/freshstudent/application/fresh')}
                className="bg-amber-50 text-black font-bold text-2xl shadow-2xl px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
              >
                Register
              </button>
            ) : null}
          
          {/* <button
            onClick={() => navigate('/freshstudent/application/fresh')}
            className="bg-amber-50 text-black font-bold text-2xl shadow-2xl   px-4 py-4 peer-hover:  hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg  "
          >
            Register
          </button> */}
           
           <div>
           <button
              onClick={() => navigate('/login')}
              className="bg-amber-50 text-black font-bold text-2xl shadow-2xl px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 hover:text-slate-500 rounded-lg"
            >
              Login
            </button>
           </div>
           
            <div >
            {!isOpen && (
              <p className="text-lg text-red-600 text-center mt-20 -ml-80 "> Fresher application Closed</p>
            )}
            </div>
           

        </div>
      </div>
    </div>
    </div >

  );
}

export default Studentfirst