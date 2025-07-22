import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faMapSigns, faSignOutAlt, faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { TiThMenuOutline } from "react-icons/ti";

function Renewal() {

	const navigate = useNavigate();
	const { staffId } = useParams();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleMenuClick = () => {
		if (window.innerWidth < 1024) setIsMenuOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('token');
		navigate('/login', { replace: true });
	};

	const menus = [
		{
			icon: faChalkboard,
			name: 'Dashboard',
			path: `/student/${staffId}/status`
		},
		{
			icon: faClipboard,
			name: 'Application',
			path: `/student/${staffId}/application/renewal`
		},
		{
			icon: faMapSigns,
			name: 'Guidelines',
			path: `/student/${staffId}/guidelines`
		}
	];

	return (
		<div className="flex w-screen h-screen overflow-hidden bg-white">
			<aside className={`bg-emerald-700 w-72 flex flex-col text-white p-4 gap-3 transition-transform duration-300 transform lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:static fixed z-50`}>
				<div className="flex flex-col items-center mb-4">
					<img src={Jmclogo} alt="JMC Logo" className="w-32 h-32" />
					<div className="text-center mt-2 text-sm font-semibold leading-5">
						<p>JAMAL MOHAMED COLLEGE</p>
						<p>(Autonomous)</p>
						<p>TIRUCHIRAPPALLI - 620 020</p>
					</div>
					<div className="bg-emerald-600 text-white rounded-md py-1 px-2 mt-6 text-sm font-bold">
						{staffId}
					</div>
				</div>
				<nav className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
					{menus.map((item, index) => (
						<NavLink
							key={index}
							to={item.path}
							onClick={handleMenuClick}
							className={({ isActive }) => `flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30 ${isActive ? 'bg-black bg-opacity-30' : ''}`}
						>
							<FontAwesomeIcon icon={item.icon} className="text-base w-4" />
							<span className='text-md'>{item.name}</span>
						</NavLink>
					))}
					<button
						onClick={handleLogout}
						className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30"
					>
						<FontAwesomeIcon icon={faSignOutAlt} className="text-base w-4" />
						<span className='text-md'>Logout</span>
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
	);
}

export default Renewal;
