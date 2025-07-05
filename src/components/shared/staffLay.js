import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Jmclogo from '../../assets/jmclogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBars, faChalkboard, faTools, faSignOutAlt, faBuilding,
	faBook, faClipboardList, faMapSigns
} from '@fortawesome/free-solid-svg-icons';

function StaffLayout() {

	const navigate = useNavigate();
	const { staffId, role } = useParams();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const handleMenuClick = () => window.innerWidth < 1024 && setIsMenuOpen(false);

	const handleLogout = () => {
		localStorage.removeItem('token'); navigate('/login');
	};

	const menus = [
		{ icon: faChalkboard, name: 'Dashboard', path: `/staff/${staffId}/dashboard`, show: ['JMCRAS', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDM', 'JMCRAA', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faClipboardList, name: 'Attendance Aided', path: `/staff/${staffId}/attendance`, show: !['JMCRAS', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDM', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faClipboardList, name: 'Attendance SFM', path: `/staff/${staffId}/attendance/sfm`, show: !['JMCRAA', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDM', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faClipboardList, name: 'Attendance SFW', path: `/staff/${staffId}/attendance/sfw`, show: !['JMCRAA', 'JMCRAS', 'JMCDM', 'JMCMM', 'JMCCOE', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faBook, name: 'Deeniyath Men', path: `/staff/${staffId}/deeniyath`, show: !['JMCRAA', 'JMCRAS', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faBook, name: 'Deeniyath Women', path: `/staff/${staffId}/deeniyathsfw`, show: !['JMCRAA', 'JMCRAS', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDM', 'JMCMW'].includes(staffId) },
		{ icon: faBook, name: 'Moral Men', path: `/staff/${staffId}/moral`, show: !['JMCRAA', 'JMCRAS', 'JMCRAW', 'JMCDM', 'JMCCOE', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faBook, name: 'Moral Women', path: `/staff/${staffId}/moralsfw`, show: !['JMCRAA', 'JMCRAS', 'JMCRAW', 'JMCDM', 'JMCCOE', 'JMCDW', 'JMCMM'].includes(staffId) },
		{ icon: faBuilding, name: 'COE', path: `/staff/${staffId}/coe`, show: !['JMCRAA', 'JMCRAS', 'JMCRAW', 'JMCDM', 'JMCMM', 'JMCDW', 'JMCMW'].includes(staffId) },
		{ icon: faTools, name: 'Settings', path: `/staff/${staffId}/settingstaff`, show: ['JMCRAS', 'JMCRAW', 'JMCMM', 'JMCCOE', 'JMCDM', 'JMCRAA', 'JMCDW', 'JMCMW'].includes(staffId) },
	]

	return (
		<div className="flex w-screen h-screen overflow-hidden bg-white">
			{/* Sidebar */}
			<aside className={`bg-emerald-700 w-72 flex flex-col text-white p-4 gap-3 transition-transform duration-300 lg:translate-x-0 ${isMenuOpen ? 'translate-x-0 fixed z-50' : '-translate-x-full lg:static'}`}>
				<div className="flex flex-col items-center mb-4">
					<img src={Jmclogo} alt="JMC Logo" className="w-32 h-32" />
					<div className="text-center mt-2 mb-5 text-sm font-semibold leading-5">
						<p>JAMAL MOHAMED COLLEGE</p>
						<p>(Autonomous)</p>
						<p>TIRUCHIRAPPALLI - 620 020</p>
					</div>
					<div className="bg-emerald-600 text-white rounded-md py-1 px-2 text-sm font-bold"> {staffId} </div>
					<div className="text-xs mt-1 text-white/80 font-medium"> {role} </div>
				</div>
				{/* Menus */}
				<nav className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
					{menus.filter(menu => menu.show !== false).map((item, idx) => (
						<NavLink
							key={idx}
							to={item.path}
							onClick={handleMenuClick}
							className={
								({ isActive }) =>
									`flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all 
									duration-300 hover:bg-black hover:bg-opacity-30 ${isActive ? 'bg-black bg-opacity-30' : ''
								}`
							}
						>
							<FontAwesomeIcon icon={item.icon} className="text-base w-4" />
							<span className="text-md">{item.name}</span>
						</NavLink>
					))}
					<button
						onClick={handleLogout}
						className="w-full flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30"
					>
						<FontAwesomeIcon icon={faSignOutAlt} className="text-base w-4" />
						<span>Logout</span>
					</button>
				</nav>
			</aside>
			{/* Main Content */}
			<main className="flex-1 w-full overflow-y-auto"> <Outlet /> </main>
		</div>
	);
}

export default StaffLayout;
