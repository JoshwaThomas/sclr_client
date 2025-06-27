import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faHandHoldingHeart,
  faCogs,
  faFileAlt,
  faIdCard,
  faTools,
  faChartBar,
  faSignOutAlt,
  faMapSigns,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import Jmclogo from '../../assets/jmclogo.png';

function StudentLayout() {
  const navigate = useNavigate();
  const [activeAcYear, setActiveAcYear] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const role = Number(localStorage.getItem('role'));

  const menus = [
    { icon: faTachometerAlt, name: 'Dashboard', path: 'dashboard', show: role !== 3 },
    { icon: faHandHoldingHeart, name: 'Donor', path: '/admin/donormenu', show: role !== 3 },
    { icon: faCheckCircle, name: 'Application', path: '/admin/application', show: role !== 3 },
    { icon: faIdCard, name: 'Status', path: '/admin/status', show: role === 1 || role === 3 },
    { icon: faTools, name: 'Settings', path: '/admin/action', show: role === 1 || role === 3 },
    { icon: faFileAlt, name: 'Distribution Statement', path: '/admin/distribution_statement', show: role !== 3 },
    { icon: faChartBar, name: 'Reports', path: '/admin/report', show: role !== 3 },
    { icon: faMapSigns, name: 'Guidelines', path: '/admin/guidelines', show: role !== 3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    navigate('/login');
    window.history.pushState(null, null, '/login');
  };

  useEffect(() => {
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
  }, [apiUrl]);

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="bg-emerald-700 w-64 p-4 flex flex-col text-white">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img src={Jmclogo} alt="JMC Logo" className="w-36 h-40" />
          <div className="text-center mt-2 text-sm font-bold leading-5">
            <div>JAMAL MOHAMED COLLEGE</div>
            <div>(Autonomous)</div>
            <div>TIRUCHIRAPPALLI - 620 020</div>
          </div>
          <div className="bg-emerald-600 rounded-md py-1 px-2 mt-4 text-xl font-bold">
            {activeAcYear}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 space-y-2">
          {menus.filter(menu => menu.show).map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-300 hover:bg-black hover:bg-opacity-30 ${isActive ? 'bg-black bg-opacity-30' : ''}`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-2 rounded-md mt-4 hover:bg-black hover:bg-opacity-30 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-auto bg-zinc-50">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentLayout;
