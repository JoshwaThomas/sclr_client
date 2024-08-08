import React from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
// import Jmc from '../../assets/jmc_logo.png';





function StaffLayout() {

  const navigate = useNavigate();
  const { staffId } = useParams();
  const { role } = useParams();

  let menus = [
    {
      icon: 'menu',
      name: 'Dashboard',
      path: `/staff/${staffId}/dashboard`,
      show: staffId === 'RAOSFM' || staffId === 'RAOSFW' || staffId === 'MORAL' || staffId === 'COE' || staffId === 'DEENIYATH' || staffId === 'RAO'
    },
    {
      icon: 'add-circle',
      name: 'Attendance',
      path: `/staff/${staffId}/attendance`,
      show: staffId !== 'RAOSFM' && staffId !== 'RAOSFW' && staffId !== 'MORAL' && staffId !== 'COE' && staffId !== 'DEENIYATH'
    },
    {
      icon: 'add-circle',
      name: 'Attendance SFM',
      path: `/staff/${staffId}/attendance/sfm`,
      show: staffId !== 'RAO' && staffId !== 'RAOSFW' && staffId !== 'MORAL' && staffId !== 'COE' && staffId !== 'DEENIYATH'
    },
    {
      icon: 'add-circle',
      name: 'Attendance SFW',
      path: `/staff/${staffId}/attendance/sfw`,
      show: staffId !== 'RAO' && staffId !== 'RAOSFM' && staffId !== 'DEENIYATH' && staffId !== 'MORAL' && staffId !== 'COE'
    },
    {
      icon: 'add-circle',
      name: 'Deeniyath',
      path: `/staff/${staffId}/deeniyath`,
      show: staffId !== 'RAO' && staffId !== 'RAOSFM' && staffId !== 'RAOSFW' && staffId !== 'MORAL' && staffId !== 'COE'
    },
    {
      icon: 'add-circle',
      name: 'Moral',
      path: `/staff/${staffId}/moral`,
      show: staffId !== 'RAO' && staffId !== 'RAOSFM' && staffId !== 'RAOSFW' && staffId !== 'DEENIYATH' && staffId !== 'COE'
    },
    {
      icon: 'add-circle',
      name: 'COE',
      path: `/staff/${staffId}/coe`,
      show: staffId !== 'RAO' && staffId !== 'RAOSFM' && staffId !== 'RAOSFW' && staffId !== 'DEENIYATH' && staffId !== 'MORAL'
    },
    {
      icon: 'menu',
      name: 'Setting',
      path: `/staff/${staffId}/settingstaff`,
      show: staffId === 'RAOSFM' || staffId === 'RAOSFW' || staffId === 'MORAL' || staffId === 'COE' || staffId === 'DEENIYATH' || staffId === 'RAO'
  },
    {
      icon: 'add-circle',
      name: 'GuideLines',
      path: `/staff/${staffId}/guidelines`
    },

  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
    window.history.pushState(null, null, '/login');
    window.addEventListener('popstate', function (event) {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex flex-row bg-slate-500 h-screen w-screen ">
      <div className="bg-emerald-700 w-64 p-3 flex flex-col text-black">
        <div className='flex flex-col mb-10 place-items-center'>
          <img src={Jmclogo} alt="" className="w-36 h-40" />
          <div className='mt-2 text-white'>
            <span className="text-sm font-extrabold text-center">JAMAL MOHAMED COLLEGE<br /></span>
            <span className="text-sm font-bold ml-12 text-center">(Autonomous)<br /></span>
            <span className="text-sm font-bold text-center">TIRUCHIRAPPALLI - 620 020<br /></span>
          </div>
          <div className='mt-4 text-white font-bold'>{staffId} </div>
          <div> {role}</div>

        </div>
        {menus.filter(menu => menu.show).map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''}`
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

export default StaffLayout;
