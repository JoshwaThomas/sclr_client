import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTachometerAlt, faHandHoldingHeart, faFileAlt, faIdCard, faTools,
	faChartBar, faSignOutAlt, faMapSigns, faClipboard
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
		{ icon: faClipboard, name: 'Application', path: '/admin/application', show: role !== 3 },
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
		<div className="flex w-screen h-screen overflow-hidden bg-white">
			<aside className="bg-emerald-700 w-72 flex flex-col text-white p-4 gap-3">
				<div className="flex flex-col items-center mb-4">
					<img src={Jmclogo} alt="JMC Logo" className="w-32 h-32" />
					<div className="text-center mt-2 mb-5 text-sm font-semibold leading-5">
						<p>JAMAL MOHAMED COLLEGE</p>
						<p>(Autonomous)</p>
						<p>TIRUCHIRAPPALLI - 620 020</p>
					</div>
					<div className="bg-emerald-600 text-white rounded-md py-1 px-2 text-sm font-bold">
						{activeAcYear}
					</div>
				</div>
				<nav className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
					{menus.filter(menu => menu.show).map((item, idx) => (
						<NavLink
							key={idx}
							to={item.path}
							className={({ isActive }) =>
								`flex items-center space-x-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-300 hover:bg-black hover:bg-opacity-30 ${isActive ? 'bg-black bg-opacity-30' : ''}`
							}
						>
							<FontAwesomeIcon icon={item.icon} className="text-base w-4" />
							<span className='text-md'>{item.name}</span>
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
			<main className="flex-1 w-full overflow-y-auto bg-zinc-50">
				<Outlet />
			</main>
		</div>
	)
}

export default StudentLayout;