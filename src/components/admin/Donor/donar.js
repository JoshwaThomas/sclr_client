import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PrintHeader from '../../../assets/printHeader.jpg';
import dayjs from 'dayjs';

const Donar = () => {

	const [formData, setFormData] = useState({
		name: '', mobileNo: '', did: '', pan: '', emailId: '', address: '', state: '', district: '',
		pin: '', scholtype: '', amount: '', balance: '', receipt: '', scholdate: '', donordept: '',
		donorbatch: '', zakkath: false, zakkathamt: '', zakkathbal: ''
	});

	const printRef = useRef();
	const apiUrl = process.env.REACT_APP_API_URL;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = () => {
		setFormData((prev) => ({
			...prev,
			zakkath: !prev.zakkath,
			zakkathamt: !prev.zakkath ? prev.amount : '',
			amount: !prev.zakkath ? '' : prev.zakkathamt
		}));
	};

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			balance: prev.amount,
			zakkathbal: prev.zakkathamt
		}));
	}, [formData.amount, formData.zakkathamt]);

	useEffect(() => {
		const fetchLastDonorId = async () => {
			try {
				const { data } = await axios.get(`${apiUrl}/api/admin/last-donor-id`);
				const newDid = (data?.lastDid || 0) + 1;
				setFormData((prev) => ({ ...prev, did: newDid.toString() }));
			} catch (err) {
				alert("Failed to fetch last donor ID");
			}
		};
		fetchLastDonorId();
	}, [apiUrl]);

	const handlePrint = () => {
		const printWindow = window.open('', '', 'height=600,width=800');
		const content = printRef.current.innerHTML;
		printWindow.document.write(`
		<html>
			<head>
			<title>Print</title>
			<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
			</head>
			<body>${content}</body>
		</html>
		`);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
	};

	// Submit Buttion for Adding Donar
	const Submit = async (e) => {
		e.preventDefault();
		try {
			const { data: yearRes } = await axios.get(`${apiUrl}/api/admin/current-acyear`);
			if (!yearRes?.success) return alert("Failed to fetch academic year");
			const acyear = yearRes.acyear?.acyear;
			const payload = { ...formData, acyear };
			const { data: donorRes } = await axios.post(`${apiUrl}/api/admin/donardata`, payload);
			if (donorRes?.success) {
				alert("New Donar Added Successfully")
				window.location.reload();
			}
			else if (donorRes.message === 'Donor Already Existing') { alert("Donor ID Already Exists") }
			else { alert("Something went wrong. Please try again.") }
		} catch (err) { alert("Submission Failed!") }
	}

	const formatDate = (dateString) => dayjs(dateString).format("DD-MM-YYYY");

	return (
		<div className='p-6'>
			<h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white"> New Donor </h1>
			<form className="space-y-8 font-semibold" onSubmit={Submit}>
				{/* Basic Info */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-black p-6 rounded-lg bg-gray-50">
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Donor ID :
						</label>
						<input
							type="text"
							name="did"
							value={formData.did}
							readOnly
							className="w-full p-2 border border-black rounded-md bg-gray-100"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Scholarship Type : <span className="text-red-500">*</span>
						</label>
						<select
							name="scholtype"
							value={formData.scholtype}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
							required
						>
							<option value="">Select</option>
							<option value="Alumni">Alumni</option>
							<option value="Well Wishers">Well Wishers</option>
						</select>
					</div>
					{/* Alumni Fields */}
					{formData.scholtype === "Alumni" && (
						<>
							<div>
								<label className="block mb-2 font-semibold text-slate-700">
									Programme :
								</label>
								<input
									type="text"
									name="donordept"
									value={formData.donordept}
									onChange={handleChange}
									className="w-full p-2 border border-black rounded-md"
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-slate-700">
									Studied Year :
								</label>
								<input
									type="text"
									name="donorbatch"
									value={formData.donorbatch}
									onChange={handleChange}
									className="w-full p-2 border border-black rounded-md"
								/>
							</div>
						</>
					)}
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Name : <span className="text-red-500">*</span></label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))}
							className="w-full p-2 border border-black rounded-md"
							required
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Mobile No. : </label>
						<input
							type="text"
							name="mobileNo"
							value={formData.mobileNo}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">PAN / Aadhar No :</label>
						<input
							type="text"
							name="pan"
							value={formData.pan}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, pan: e.target.value.toUpperCase() }))
							}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Email ID :</label>
						<input
							type="email"
							name="emailId"
							value={formData.emailId}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Permanent Address : </label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value.toUpperCase() }))}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">State :</label>
						<select
							name="state"
							value={formData.state}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						>
							<option value="">Select State</option>
							{/* Populate dynamically */}
						</select>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">District :</label>
						<select
							name="district"
							value={formData.district}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						>
							<option value="">Select District</option>
							{/* Populate dynamically */}
						</select>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Pincode :</label>
						<input
							type="text"
							name="pin"
							maxLength={6}
							value={formData.pin}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
				</div>
				{/* Payment Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Date of Payment :</label>
						<input
							type="date"
							name="scholdate"
							value={formData.scholdate}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Scholarship Type :</label>
						<div className='flex flex-col justify-center'>
							<div className="flex gap-4 items-center mt-2">
								<label className="flex items-center gap-2 text-md">
									<input
										type="radio"
										name="zakkath"
										value="true"
										className='scale-125'
										checked={formData.zakkath === true}
										onChange={() => setFormData(prev => ({ ...prev, zakkath: true }))}
									/> Zakkath
								</label>
								<label className="flex items-center gap-2 text-md">
									<input
										type="radio"
										name="zakkath"
										value="false"
										className='scale-125'
										checked={formData.zakkath === false}
										onChange={() => setFormData(prev => ({ ...prev, zakkath: false }))}
									/> General
								</label>
							</div>
						</div>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Cheque / Receipt No : </label>
						<input
							type="text"
							name="receipt"
							value={formData.receipt}
							onChange={handleChange}
							className="w-full p-2 border border-black rounded-md"
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">Amount : <span className="text-red-500">*</span></label>
						<input
							type="text"
							name={formData.zakkath ? "zakkathamt" : "amount"}
							value={formData.zakkath ? formData.zakkathamt : formData.amount}
							onChange={(e) =>
								formData.zakkath
									? setFormData((prev) => ({ ...prev, zakkathamt: e.target.value }))
									: setFormData((prev) => ({ ...prev, amount: e.target.value }))
							}
							className="w-full p-2 border border-black rounded-md"
							required
						/>
					</div>
				</div>
				<div className="flex justify-end gap-4">
					<button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
						Submit
					</button>
					{/* <button type="button" onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">
						Print
					</button> */}
				</div>
			</form>
			{/* Hidden Print Section */}
			<div ref={printRef} className="hidden">
				<img src={PrintHeader} alt="Print Header" />
				<div className='h-3/4 w-11/12 mx-7 border border-black'>
					<div className='font-bold text-right text-lg mt-10 px-8'>Date: {formatDate(formData.scholdate)}</div>
					<h3 className='font-bold text-lg mt-10 px-8'>{formData.name}</h3>
					<p className='text-justify text-lg mt-5 px-10'>
						<span className='ml-5'>We want to express</span> our heartfelt thanks for your generous scholarship donation to support financially disadvantaged students at Jamal Mohamed College.
						Your kindness has provided these students with invaluable opportunities, allowing them to pursue their education without the weight of financial stress.
						Your commitment to helping those in need has not only transformed their academic journey but also inspired hope and motivation in their lives.<br /><br />
						<span className='ml-5'>We</span> are incredibly grateful for your continued support and the positive impact you've made on our community. Wishing you and your loved ones a joyful and blessed Thanksgiving.<br /><br />
						With deepest appreciation, <br /> <br /> <br />
					</p>
					<div className='font-bold text-right text-lg px-8'>Principal</div>
				</div>
			</div>
		</div>
	)
}

export default Donar;