import React from 'react';
import Jamal from '../../assets/myjamalmypride.png'
import Jmclogo from '../../assets/jmclogo.png';
import { useNavigate } from 'react-router-dom';
import Stud1 from '../../assets/stud1.gif'

function LandingPage() {

	const navigate = useNavigate();

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
			<div className="w-[35%] flex flex-col justify-items-center items-center rounded-lg h-full">
				<div className="grid grid-cols-2 py-16 place-items-center w-full h-[80%]">
					<button
						onClick={() => navigate('/reglog')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						STUDENT
					</button>
					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						ADMIN
					</button>
					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						DEENIYATH
					</button>
					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						MORAL
					</button>
					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						COE
					</button>
					<button
						onClick={() => navigate('/login')}
						className="bg-amber-50 text-black font-bold text-xl shadow-2xl w-40 h-14 md:w-40 md:h-14 lg:w-48 lg:h-16 px-4 py-4 hover:shadow-yellow-400 hover:bg-amber-200 rounded-lg"
					>
						ATTENDANCE
					</button>
				</div>
				<div className="h-[20%] flex flex-col justify-center text-center animate-pulse">
					<p className="font-semibold text-white text-xs md:text-lg lg:text-xl 2xl:text-2xl">
						Developed By T. Joshwa Anand, <span className="text-xs">II MCA</span>
					</p>
					<p className="font-bold text-white text-xs md:text-lg lg:text-xl 2xl:text-2xl">
						Guided By Dr. O.S. Abdul Qadir, <span className="text-xs">Asst. COE</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default LandingPage;