import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
// import Jmc from '../../assets/jmc_whitefont.png';
import axios from 'axios';
import { RiDashboardHorizontalLine } from "react-icons/ri";
// import { FaHandsHelping } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaStackOverflow } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa6";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { GoDiscussionClosed } from "react-icons/go";
import { GoReport } from "react-icons/go";
import { FaMapSigns } from "react-icons/fa";
import { TiPower } from "react-icons/ti";

function StudentLayout() {
  const navigate = useNavigate();
  // const [acyear, setAcYear] = useState('');
  const [activeAcYear, setActiveAcYear] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const menus = [
    {
      icon: <RiDashboardHorizontalLine className="text-white text-2xl" />,
      name: 'Dashboard',
      path: 'dashboard'
    },
    {
      icon: <FaHandHoldingHeart className="text-white text-2xl" />,
      name: 'Donor',
      path: '/admin/donormenu'
    },
    {
      icon: <FaStackOverflow className="text-white text-2xl" />,
      name: 'Application',
      path: '/admin/application'
    },
    {
      icon: <FaIdCard className="text-white text-2xl" />,
      name: 'Status',
      path: '/admin/status'
    },
    {
      icon: <FaScrewdriverWrench className="text-white text-2xl" />,
      name: 'Settings',
      path: '/admin/action'
    },
    {
      icon: <GoDiscussionClosed className="text-white text-2xl" />,
      name: 'Distribution Statement',
      path: '/admin/distribution_statement'
    },
    {
      icon: <GoReport className="text-white text-2xl" />,
      name: 'Reports',
      path: '/admin/report'
    },
    {
      icon: <FaMapSigns className="text-white text-2xl" />,
      name: 'Guidelines',
      path: '/admin/guidelines'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    navigate('/login');
    window.history.pushState(null, null, '/login');
  };

  useEffect(() => {
    const fetchActiveAcademicYear = () => {
      axios.get(`${apiUrl}/api/admin/current-acyear`)
        .then(response => {
          if (response.data.success) {
            setActiveAcYear(response.data.acyear.acyear);
          } else {
            setActiveAcYear('');
          }
        })
        .catch(error => {
          console.error('Error fetching current academic year:', error);
        });
    };
  
    // Fetch current active academic year on component mount
    fetchActiveAcademicYear();
  }, [apiUrl]);
  
  // useEffect(() => {
  //   // Fetch current active academic year on component mount
  //   fetchActiveAcademicYear();
  // }, [apiUrl, fetchActiveAcademicYear]);

  // const fetchActiveAcademicYear = () => {
  //   axios.get(`${apiUrl}/api/admin/current-acyear`)
  //     .then(response => {
  //       if (response.data.success) {
  //         setActiveAcYear(response.data.acyear.acyear);
  //       } else {
  //         setActiveAcYear('');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching current academic year:', error);
  //     });
  // };

  // const Submit = (e) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:3001/api/admin/acyear", { acyear })
  //     .then(result => {
  //       alert('Academic year set to active successfully.');
  //       fetchActiveAcademicYear(); // Update active academic year after setting
  //       window.location.reload();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       alert('Something Went Wrong');
  //     });
  // };

  return (
    <div className="flex flex-row bg-zinc-50 h-screen w-screen ">
      <div className="bg-emerald-700 w-64 p-3 flex flex-col text-black">
        <div className='flex flex-col mb-10 place-items-center'>
          <img src={Jmclogo} alt="" className="w-36 h-40" />
          {/* <img src={Jmc} alt="" className="w-60" /> */}
          <div className='mt-2 text-white'>
            <span className="text-sm font-extrabold text-center">JAMAL MOHAMED COLLEGE<br /></span>
            <span className="text-sm font-bold ml-12 text-center">(Autonomous)<br /></span>
            <span className="text-sm font-bold text-center">TIRUCHIRAPPALLI - 620 020<br /></span>
          </div>
          <div className='bg-emerald-600  rounded-md py-1 mt-5 -mb-4 w-64'>
          <label className="block mb-1 font-extrabold text-center text-2xl text-white">{activeAcYear}</label>
            {/* <form onSubmit={Submit}>
              <label className="block mb-1 flex inline-flex text-white ml-10">Academic: {activeAcYear}</label>


              <select
                name="acyear"
                value={acyear}
                onChange={(e) => setAcYear(e.target.value)}
                className="w-28 p-1 border rounded-md text-slate-950 ml-8"
                required
              >
                <option value="">Select</option>
                <option value="2022-2023">2022-2023</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
                <option value="2027-2028">2027-2028</option>
                <option value="2028-2029">2028-2029</option>
                <option value="2029-2030">2029-2030</option>
                <option value="2030-2031">2030-2031</option>
                <option value="2031-2032">2031-2032</option>
                <option value="2032-2033">2032-2033</option>
              </select>
              <button type='submit' className="p-1 border px-3 ml-3 rounded-md bg-orange-500">Set</button>

            </form> */}
          </div>
        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''
              }`
            }
          >
             {item.icon}
            <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
              {item.name}
            </label>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50"
        >
          <TiPower className="text-white text-2xl " />
          <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
            Logout
          </label>
        </button>
      </div>
      <div className="p-4 flex-1 overflow-auto overflow-scroll">
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;
