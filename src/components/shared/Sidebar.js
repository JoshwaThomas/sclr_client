import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  let menus = [
    {
      icon: 'menu',
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: 'add-circle',
      name: 'Application',
      path: '/student/application',
    },
    {
      icon: 'people',
      name: 'GuideLines',
      path: '/student/guidelines',
    },
  ];

  return (
    <div className="bg-yellow-300 w-60 p-3 flex flex-col text-black">
      <div>
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
    </div>
  );
}

export default Sidebar;
