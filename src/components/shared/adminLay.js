import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png'; 
import Jmc from '../../assets/jmc_logo.png';


function StudentLayout() {
  let menus = [
    { icon: 'menu', 
    name: 'Dashboard', 
    path: 'dashboard' 
   },
    { icon: 'add-circle', 
    name: 'Application', 
    path: '/admin/application'
   },
    { icon: 'people', 
    name: 'Status', 
    path: 'guidelines' },
  
  { icon: 'add-circle', 
    name: 'Donor', 
    path: '/admin/donor'
   },
   { icon: 'add-circle', 
   name: 'Action', 
   path: '/admin/action'
  },
   { icon: 'add-circle', 
    name: 'Reports', 
    path: '/admin/report'
   },
   { icon: 'add-circle', 
    name: 'GuideLines', 
    path: 'guidelines'
   },
   { icon: 'add-circle', 
    name: 'Logout', 
    path: '/'
   },
  ];

  return (
    <div className="flex flex-row bg-slate-500 h-screen w-screen ">
      <div className="bg-emerald-700 w-64 p-3 flex flex-col text-black">
        <div className=' flex flex-col mb-10 place-items-center'>
        <img src={Jmclogo} alt="" className=" w-36 h-40  " />
        <img src={Jmc} alt="" className=" w-60 " />
        </div>
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${
                isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''
              }`
            }
          >
            <ion-icon name={item.icon}></ion-icon>
            <label className="text-center cursor-pointer font-medium text-base text-white relative z-10">
              {item.name}
            </label>
          </NavLink>
        ))}
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
