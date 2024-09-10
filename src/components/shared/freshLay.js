import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
// import Jmc from '../../assets/jmc_whitefont.png';
import { TiClipboard, TiThMenuOutline } from "react-icons/ti";

function StudentLayout() {
    const navigate = useNavigate();
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
            icon: <TiClipboard className="text-white text-2xl 2xl:text-5xl" />,
            name: 'Application',
            path: '/freshstudent/application/fresh'
        },


    ];
    const handleLogout = () => {
        navigate('/reglog', { replace: true });

    };

    return (
        <div className="flex flex-row bg-slate-400 h-screen w-screen ">
            <div className={`bg-emerald-700 w-64 p-3  h-screen flex flex-col text-black transition-transform transform lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:static fixed z-50 2xl:w-1/4 p-6 `}>
                <div className=' flex flex-col mb-10 place-items-center'>
                    <img src={Jmclogo} alt="" className=" w-36 h-40  " />
                    {/* <img src={Jmc} alt="" className=" w-60 " /> */}
                    <div className='mt-2 text-white'>
                        <span className="text-sm font-extrabold text-center 2xl:text-4xl">JAMAL MOHAMED COLLEGE<br /></span>
                        <span className="text-sm font-bold ml-12 text-center 2xl:text-4xl 2xl:ml-28">(Autonomous)<br /></span>
                        <span className="text-sm font-bold text-center 2xl:text-4xl">TIRUCHIRAPPALLI - 620 020<br /></span>
                    </div>
                </div>
                {menus.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        onClick={handleMenuClick}
                        className={({ isActive }) =>
                            `space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50 ${isActive ? 'bg-black rounded-[5px] bg-opacity-50' : ''}
                             2xl:space-x-10 2xl:pl-[10px] 2xl:h-[60px] 2xl:duration-1000 2xl:hover:rounded-lg 2xl:my-3`
                          }
                    >
                        {item.icon}
                        <label className="text-center cursor-pointer font-medium text-base text-white relative z-10 2xl:text-4xl">
                            {item.name}
                        </label>
                    </NavLink>
                ))}

                <button
                    onClick={handleLogout}
                    className="space-x-4 text-xl pl-[5px] flex items-center h-[45px] transition-all duration-800 hover:bg-black hover:rounded-[5px] hover:bg-opacity-50"
                >
                    <ion-icon name="log-out"></ion-icon>
                    <label className="space-x-4 text-center cursor-pointer font-medium text-base text-white relative z-10 2xl:text-4xl">
                        Back
                    </label>
                </button>

            </div>

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
