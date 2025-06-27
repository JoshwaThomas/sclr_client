import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import { TiClipboard, TiThMenuOutline } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faUndo } from '@fortawesome/free-solid-svg-icons';

function StudentLayout() {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }

    const handleMenuClick = () => {
        if (window.innerWidth < 1024) { setIsMenuOpen(false) }
    }

    let menus = [
        {
            icon: faClipboard,
            name: 'Application',
            path: '/freshstudent/application/fresh'
        },
    ]

    const handleLogout = () => {
        navigate('/reglog', { replace: true });
    };

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-white">
            <aside className="bg-emerald-700 w-72 flex flex-col text-white p-4 gap-3">
                <div className="flex flex-col items-center mb-4">
                    <img src={Jmclogo} alt="JMC Logo" className="w-32 h-32" />
                    <div className="text-center mt-2 text-sm font-semibold leading-5">
                        <p>JAMAL MOHAMED COLLEGE</p>
                        <p>(Autonomous)</p>
                        <p>TIRUCHIRAPPALLI - 620 020</p>
                    </div>
                </div>
                <nav className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
                    {menus.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            onClick={handleMenuClick}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30 ${isActive ? 'bg-black bg-opacity-30' : ''}`
                            }
                        >
                            <FontAwesomeIcon icon={item.icon} className="text-base" />
                            <span className='text-md'>{item.name}</span>
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30"
                    >
                        <FontAwesomeIcon icon={faUndo} className="text-base" />
                        <span className='text-md'>Back</span>
                    </button>
                </nav>
            </aside>
            <div className="lg:hidden p-3 fixed top-0 left-0 z-50">
                <button onClick={toggleMenu} className="text-emerald-700 text-3xl">
                    <TiThMenuOutline />
                </button>
            </div>
            <div className="flex-1 p-6 2xl:p-10 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default StudentLayout;
