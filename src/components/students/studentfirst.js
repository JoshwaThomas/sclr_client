import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
import Loading from '../../assets/Pulse.svg'
import Stud1 from '../../assets/stud1.gif'

function StudentFirst() {

	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState();
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const fetchDates = async () => {
			const response = await axios.get(`${apiUrl}/api/admin/dates`);
			setData(response.data);
			const { startDate, endDate } = response.data;
			const today = new Date();
			setIsOpen(today >= new Date(startDate) && today <= new Date(endDate));
		};
		fetchDates();
	}, [apiUrl]);

	if (!data) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;

	return (
		<div className="w-screen h-screen flex flex-col lg:flex-row items-center bg-blue-500 p-6 overflow-hidden 2xl:p-24">
			<div className="w-[65%] h-full relative flex flex-col justify-between items-center">
				<div className='flex flex-col justify-center w-full h-[80%] items-center'>
					<img
						src={Jmclogo}
						alt=""
						className="absolute h-40 md:h-60 lg:h-96 md:w-60 lg:w-80 opacity-10 2xl:w-1/2 2xl:h-3/5"
					/>
					<img
						src={Jamal}
						alt=""
						className="z-10 mt-20 w-44 h-36 md:w-44 md:h-48 lg:w-3/4 lg:h-64"
					/>
					<h1 className="z-10 text-white text-center font-semibold text-lg md:text-2xl lg:text-3xl pb-10 italic ">
						Show Us The Right Path
					</h1>
				</div>
				<div className="w-full flex h-[20%] items-center justify-center">
					<img
						src={Stud1}
						alt=""
						className="w-24 h-24 md:w-40 md:h-full"
					/>
					<div className='pr-20'>
						<p className="text-amber-300 font-bold text-lg md:text-2xl lg:text-2xl font-serif">"Jamal &#8211; Empowering your FUTURE with</p>
						<p className="text-amber-300 font-bold text-center text-lg md:text-2xl lg:text-2xl font-serif">Education and Scholarship."</p>
					</div>
					<h2 >
						&nbsp;&nbsp;
					</h2>
				</div>
			</div>
			<div className="w-[35%] flex flex-col justify-center items-center rounded-lg h-full">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center w-full max-w-2xl">
					{isOpen && (
						<button
							onClick={() => navigate('/freshstudent/application/fresh')}
							className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
						>
							Register
						</button>
					)}

					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						Login
					</button>
				</div>
				{/* Message for Closed Registration */}
				{!isOpen && (
					<p className="text-xl lg:text-2xl text-red-600 font-bold text-center mt-6 animate-bounce">
						Fresher Applications are Closed
					</p>
				)}
				{/* Message for Open Registration */}
				{isOpen && (
					<p className="text-sm lg:text-base text-white font-semibold text-center mt-6 px-4 py-3 rounded-md max-w-3xl">
						To renew your scholarship, login using your ID ( register number ) , then select the 'Application' option.
						<br />
						If your password doesn't match, please contact the Scholarship Section.
					</p>
				)}
			</div>
		</div>
	)

}

export default StudentFirst;