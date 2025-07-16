import { useEffect, useState } from 'react';
import axios from "axios";

function StudentData() {
	const [users, setUsers] = useState([]);
	const [filData, setFilData] = useState([]);
	const [select, setSelect] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [academicYear, setAcademicYear] = useState('');
	const [filterOption, setFilterOption] = useState('all');
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		axios.get(`${apiUrl}/api/admin/studentdata`)
			.then(response => {
				setUsers(response.data.students);
				setFilData(response.data.students);
				if (response.data.academic) {
					setAcademicYear(response.data.academic.acyear);
				}
			})
			.catch(err => console.log(err));
	}, [apiUrl]);

	const handleSearch = (e) => {
		const searchText = e.target.value.toLowerCase();
		const filteredUsers = users.filter((user) => {
			const matchesSearch =
				(user.dept && user.dept.toLowerCase().includes(searchText)) ||
				(user.registerNo && user.registerNo.toLowerCase().includes(searchText)) ||
				(user.name && user.name.toLowerCase().includes(searchText)) ||
				(user.fresherOrRenewal && user.fresherOrRenewal.toLowerCase().includes(searchText));
			const matchesAcademicYear =
				filterOption === 'all' || (user.acyear && user.acyear === academicYear);
			return matchesSearch && matchesAcademicYear;
		})
		setFilData(filteredUsers);
	}

	return (
		<div className="p-6">
			<h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
				Student Data
			</h1>
			<input
				type="text"
				placeholder="Search ..."
				className="px-3 w-60 py-2 mb-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
				onChange={handleSearch}
			/>
			<div className="flex justify-between gap-4 items-center mb-4">
				<div className="flex items-center gap-4">
					<label className="flex items-center gap-1.5">
						<input
							type="radio"
							name="filter"
							value="all"
							checked={filterOption === 'all'}
							className="w-5 h-5 text-blue-600 focus:ring-blue-500"
							onChange={(e) => {
								setFilterOption(e.target.value);
								setFilData(users);
							}}
						/>
						<span className="text-md">All</span>
					</label>
					<label className="flex items-center gap-1.5">
						<input
							type="radio"
							name="filter"
							value="current"
							checked={filterOption === 'current'}
							className="w-5 h-5 text-blue-600 focus:ring-blue-500"
							onChange={(e) => {
								setFilterOption(e.target.value);
								const filtered = users.filter((user) => user.acyear === academicYear);
								setFilData(filtered);
							}}
						/>
						<span className="text-md">Current Academic</span>
					</label>
				</div>
				<div className="text-right text-lg font-semibold mb-2">
					Total Students : <span className="">{filData.length}</span>
				</div>
			</div>

			{/* Table Header */}
			<div className="grid grid-cols-[65px_120px_1fr_120px_140px_140px_120px] bg-emerald-700 text-white font-semibold text-md h-12 rounded-t-md">
				<div className="border border-white flex justify-center items-center">S. No</div>
				<div className="border border-white flex justify-center items-center">Reg. No</div>
				<div className="border border-white flex justify-center items-center">Name</div>
				<div className="border border-white flex justify-center items-center">Dept</div>
				<div className="border border-white flex justify-center items-center">Mobile</div>
				<div className="border border-white flex justify-center items-center">Aadhar</div>
				<div className="border border-white flex justify-center items-center">Password</div>
			</div>

			{/* Table Data */}
			<div className="max-h-[500px] overflow-y-auto scrollbar-hide">
				{filData.sort((a, b) => a.registerNo.localeCompare(b.registerNo)).map((user, index) => (
					<div key={index} className={`grid grid-cols-[65px_120px_1fr_120px_140px_140px_120px] h-12 text-md ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-blue-50`}>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{index + 1}</div>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{user.registerNo}</div>
						<div
							className=" flex justify-center items-center border px-2 py-2 text-center text-blue-600 cursor-pointer hover:underline"
							onClick={() => { setShowModal(true); setSelect(user); }}
						>
							{user.name}
						</div>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{user.dept}</div>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{user.mobileNo}</div>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{user.aadhar}</div>
						<div className=" flex justify-center items-center border px-2 py-2 text-center">{user.password}</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{showModal && select && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center z-50 items-center overflow-y-auto">
					<div className="bg-white w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative">

						{/* Close Button */}
						<button
							className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-red-600 transition"
							onClick={() => setShowModal(false)}
							aria-label="Close Modal"
						>
							&times;
						</button>

						{/* Title */}
						<h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 border-b pb-2">
							🎓 Student Details
						</h2>

						{/* Student Details */}
						<div className="grid grid-cols-1 sm:grid-cols-2 px-10 gap-4 text-[15px] leading-relaxed text-gray-700">
							<div className="flex"><span className="font-semibold text-gray-600 w-32">Register No</span> <span className='mr-5'>:</span>{select.registerNo || '-'}</div>
							<div className="flex"><span className="font-semibold text-gray-600 w-32">Name</span><span className='mr-5'>:</span> {select.name || '-'}</div>
							<div className="flex"><span className="font-semibold text-gray-600 w-32">Department</span><span className='mr-5'>:</span> {select.dept || '-'}</div>
							<div className="flex"><span className="font-semibold text-gray-600 w-32">Aadhar</span> <span className='mr-5'>:</span>{select.aadhar || '-'}</div>
							<div className="flex"><span className="font-semibold text-gray-600 w-32">Mobile</span><span className='mr-5'>:</span>{select.mobileNo || '-'}</div>
							<div className="flex"><span className="font-semibold text-gray-600 w-32">District</span><span className='mr-5'>:</span>{select.district || '-'}</div>
						</div>
						<div className="flex px-10 mt-4 text-[15px] text-gray-700"><span className="font-semibold w-32 text-gray-600">Address</span><span className='mr-5'>:</span> {select.address || '-'}</div>

						{/* Father Info */}
						<div className="my-6 pt-4 px-10 border-t">
							<h3 className="text-lg font-bold text-gray-800 mb-5">👨‍👧 Father Details</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] text-gray-700">
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Name</span><span className='mr-5'>:</span> {select.fatherName || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Mobile</span><span className='mr-5'>:</span> {select.fatherNo || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Occupation</span> <span className='mr-5'>:</span>{select.fatherOccupation || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Annual Income</span><span className='mr-5'>:</span> {select.annualIncome || '-'}</div>
							</div>
						</div>

						{/* Sibling Info */}
						<div className="mt-6 pt-4 px-10 border-t">
							<h3 className="text-lg font-bold text-gray-800 mb-5">👨‍👧‍👦 Sibling Details</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] text-gray-700">
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Has Siblings</span> <span className='mr-5'>:</span> {select.siblings || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Siblings Count</span><span className='mr-5'>:</span>  {select.siblingsNo || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Siblings Income</span><span className='mr-5'>:</span> {select.siblingsIncome || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Occupation</span><span className='mr-5'>:</span>  {select.siblingsOccupation || '-'}</div>
								<div className="flex"><span className="font-semibold text-gray-600 w-32">Mobile</span><span className='mr-5'>:</span>  {select.smobileNo || '-'}</div>
							</div>
						</div>

						{/* Close Button */}
						<div className="mt-8 text-right">
							<button
								className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition"
								onClick={() => setShowModal(false)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

		</div>
	)
}

export default StudentData;