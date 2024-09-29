import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
// import Jmc from '../../assets/jmc_whitefont.png';
import { TiThMenuOutline, TiClipboard, TiCogOutline, TiPower, } from "react-icons/ti";
import { LuLayoutDashboard } from "react-icons/lu";


function StudentLayout() {
  const navigate = useNavigate();
  const { staffId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
  };

  let menus = [
    {
      icon: < LuLayoutDashboard className="text-white text-2xl 2xl:text-5xl" />,
      name: 'Dashboard',
      path: `/student/${staffId}/status`
    },
    {
      icon: <TiClipboard className="text-white text-2xl 2xl:text-5xl" />,
      name: 'Application',
      path: `/student/${staffId}/application/renewal`
    },
    {
      icon: <TiCogOutline className="text-white text-2xl 2xl:text-5xl " />,
      name: 'GuideLines',
      path: `/student/${staffId}/guidelines`
    },


  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    navigate('/login');
    window.history.pushState(null, null, '/login');
  };


  return (
    <div className="flex flex-row bg-slate-500 h-screen w-screen ">
      <div className={`bg-emerald-700 w-64 p-3  h-screen flex flex-col text-black transition-transform transform lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static fixed z-50`}>
        <div className='flex flex-col mb-10 place-items-center'>
          <img src={Jmclogo} alt="" className="w-36 h-40" />
          <div className='mt-2 text-white'>
            <span className="text-sm font-extrabold text-center">JAMAL MOHAMED COLLEGE<br /></span>
            <span className="text-sm font-bold ml-12 text-center">(Autonomous)<br /></span>
            <span className="text-sm font-bold text-center">TIRUCHIRAPPALLI - 620 020<br /></span>
          </div>
          <div className='mt-4 text-white font-bold'>{staffId} </div>


        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={handleMenuClick}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''}`
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

      {/* mobile view */}
      <div className="lg:hidden p-3 fixed top-0 left-0 z-50">
        <button onClick={toggleMenu} className="text-white text-3xl ">
          <TiThMenuOutline />
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
