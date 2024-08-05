import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
// import Jmc from '../../assets/jmc_whitefont.png';
import axios from 'axios';

function StudentLayout() {
  const navigate = useNavigate();
  const [acyear, setAcYear] = useState('');

  const [activeAcYear, setActiveAcYear] = useState('');
  // const [alertMessage, setAlertMessage] = useState('');

  const menus = [
    {
      icon: 'menu',
      name: 'Dashboard',
      path: 'dashboard'
    },
    {
      icon: 'add-circle',
      name: 'Donor',
      path: '/admin/donormenu'
    },
    {
      icon: 'add-circle',
      name: 'Application',
      path: '/admin/application'
    },
    {
      icon: 'people',
      name: 'Status',
      path: '/admin/status'
    },
    {
      icon: 'add-circle',
      name: 'Action',
      path: '/admin/action'
    },
    {
      icon: 'add-circle',
      name: 'Distribution Statement',
      path: '/admin/distribution_statement'
    },
    {
      icon: 'add-circle',
      name: 'Reports',
      path: '/admin/report'
    },
    {
      icon: 'add-circle',
      name: 'GuideLines',
      path: '/admin/guidelines'
    },
  ];

  const handleLogout = () => {
    // Clear authentication state (e.g., localStorage, cookies)
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login', { replace: true });
    // Prevent back navigation to authenticated pages
    window.history.pushState(null, null, '/login');
    window.addEventListener('popstate', function (event) {
      navigate('/login', { replace: true });
    });
  };

  useEffect(() => {
    // Fetch current active academic year on component mount
    fetchActiveAcademicYear();
  }, []);

  const fetchActiveAcademicYear = () => {
    axios.get("http://localhost:3001/api/admin/current-acyear")
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

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/admin/acyear", { acyear })
      .then(result => {
        alert('Academic year set to active successfully.');
        fetchActiveAcademicYear(); // Update active academic year after setting
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        alert('Something Went Wrong');
      });
  };

  return (
    <div className="flex flex-row bg-slate-500 h-screen w-screen ">
      <div className="bg-emerald-700 w-64 p-3 flex flex-col text-black">
        <div className='flex flex-col mb-10 place-items-center'>
          <img src={Jmclogo} alt="" className="w-36 h-40" />
          {/* <img src={Jmc} alt="" className="w-60" /> */}
          <div className='mt-2 text-white'>
            <span className="text-sm font-extrabold text-center">JAMAL MOHAMED COLLEGE<br /></span>
            <span className="text-sm font-bold ml-12 text-center">(Autonomous)<br /></span>
            <span className="text-sm font-bold text-center">TIRUCHIRAPPALLI - 620 020<br /></span>
          </div>
          <div>
            <form onSubmit={Submit}>
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

            </form>
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
            <ion-icon name={item.icon}></ion-icon>
            <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
              {item.name}
            </label>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50"
        >
          <ion-icon name="log-out"></ion-icon>
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
