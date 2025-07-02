import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ScholarshipForm = () => {

	const { staffId } = useParams();
	const apiUrl = process.env.REACT_APP_API_URL;
	const [formData, setFormData] = useState({
		deeniyath: '', ugOrPg: '', semester: '', name: '', registerNo: '', dept: '', section: '', religion: '',
		procategory: '', address: '', state: '', district: '', pin: '', specialCategory: '', hostel: '', mobileNo: '',
		aadhar: '', fatherName: '', fatherNo: '', fatherOccupation: '', annualIncome: '', lastCreditedAmt: '',
		siblings: '', siblingsNo: '', siblingsOccupation: '', siblingsIncome: '', jamath: null
	});

	useEffect(() => {
		const fetchData = async () => {
			if (!staffId) return;
			try {
				const result = await axios.get(`${apiUrl}/api/admin/students`, {
					params: { registerNo: staffId.toUpperCase() }
				});
				const data = result.data;
				setFormData({
					deeniyath: data.deeniyath || '', ugOrPg: data.ugOrPg || '', semester: data.semester || '', name: data.name || '',
					registerNo: data.registerNo || '', dept: data.dept || '', section: data.section || '', religion: data.religion || '',
					procategory: data.procategory || '', address: data.address || '', state: data.state || '', district: data.district || '',
					pin: data.pin || '', specialCategory: data.specialCategory || '', hostel: data.hostel || '', mobileNo: data.mobileNo || '',
					aadhar: data.aadhar || '', fatherName: data.fatherName || '', fatherNo: data.fatherNo || '', fatherOccupation: data.fatherOccupation || '',
					annualIncome: data.annualIncome || '', lastCreditedAmt: data.scholamt || '', siblings: data.siblings || '',
					siblingsNo: data.siblingsNo || '', siblingsOccupation: data.siblingsOccupation || '', siblingsIncome: data.siblingsIncome || '', jamath: data.jamath || ''
				})
			} catch (err) {
				console.error('Error fetching student data:', err.response ? err.response.data : err);
				alert('Student not found');
			}
		}
		fetchData();
	}, [staffId, apiUrl]);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		const val = type === 'radio' || type === 'select-one' ? value : value;
		setFormData((prev) => ({ ...prev, [name]: val, }));
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
			const fileSizeInKB = file.size / 1024;
			if (!validTypes.includes(file.type)) {
				alert("Only JPEG, JPG, or PNG images are allowed.");
				e.target.value = ""; return;
			}
			if (fileSizeInKB < 30 || fileSizeInKB > 200) {
				alert("File size must be between 30KB and 200KB.");
				e.target.value = ""; return;
			}
			setFormData((prev) => ({ ...prev, jamath: file }));
			setFileName(file.name);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const acyearRes = await axios.get(`${apiUrl}/api/admin/current-acyear`);
			if (!acyearRes.data.success) {
				alert("Failed to fetch current academic year"); return;
			}
			const acyear = acyearRes.data.acyear.acyear;
			const submission = new FormData();

			Object.entries(formData).forEach(([key, value]) => {
				submission.append(key, value);
			});
			submission.append("acyear", acyear);

			const res = await axios.post(`${apiUrl}/renewal`, submission, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (res.data.success) {
				alert("Your Application Submitted Successfully");
				setTimeout(() => window.location.reload(), 3000);
			}
		} catch (err) {
			if (err.response) {
				const { status, data } = err.response;
				if (status === 409) {
					if (data.code === 'FRESHER_EXISTS') {
						alert("Already you applied Fresher Application this Year.");
					} else if (data.code === 'RENEWAL_EXISTS') {
						alert("Already you applied for Renewal Application.");
					} else { alert(data.message || "Conflict occurred.") }
				} else {
					alert("Submission Failed : " + (data?.message || "Unexpected error."));
				}
				console.error("Submission Error : ", err);
			} else {
				alert("Network or Server Error. Please try again.");
				console.error("Unexpected submission error:", err);
			}
		}
	}

	return (
		<div className="container">
			<form className="space-y-8 font-semibold" onSubmit={handleSubmit}>
				<div>
					<h3 className="text-xl mb-6 font-semibold bg-gray-600 text-white p-3 rounded"> Renewal Application</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Special Category : <span className="text-red-500 text-lg">*</span>
							</label>
							<select
								name="specialCategory"
								value={formData.specialCategory}
								onChange={handleChange}
								className="w-full p-2 border border-black rounded-md text-slate-950"
								required
							>
								<option value="">Select</option>
								<option value="General">General</option>
								<option value="Muaddin">Mu-addin</option>
								<option value="Hazrath">Hazrath</option>
								<option value="FatherMotherSeparated">Father & Mother Separated</option>
								<option value="FatherExpired">Father Expired</option>
								<option value="Singleparent">Single Parent</option>
								<option value="Orphan">Orphan</option>
							</select>
						</div>
					</div>
					<h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 mt-7 rounded text-white">
						Academic Details
					</h3>
					<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								UG or PG : <span className="text-red-500">*</span>
							</label>
							<div className="flex gap-8">
								{["UG", "PG"].map(type => (
									<label key={type} className="flex items-center gap-2 text-lg">
										<input
											type="radio"
											name="ugOrPg"
											value={type}
											checked={formData.ugOrPg === type}
											onChange={handleChange}
											className="scale-125"
											required
										/>
										{type}
									</label>
								))}
							</div>
						</div>
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Programme Stream : <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-wrap gap-8">
								{["Aided", "SFM", "SFW"].map(type => (
									<label key={type} className="flex items-center gap-2 text-lg">
										<input
											type="radio" name="procategory" value={type}
											checked={formData.procategory === type}
											onChange={handleChange}
											className="scale-125" required
										/>
										{type}
									</label>
								))}
							</div>
						</div>
						{/* Semester */}
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Semester : <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-wrap gap-6">
								{["I", "II", "III", "IV"].map((sem) => (
									<label key={sem} className="flex items-center gap-2 text-lg">
										<input
											type="radio"
											name="semester"
											value={sem}
											checked={formData.semester === sem}
											onChange={handleChange}
											className="scale-125"
											required
										/>
										{sem}
									</label>
								))}
								{formData.ugOrPg !== "PG" && (
									<>
										<label className="flex items-center gap-2 text-lg">
											<input
												type="radio" name="semester"
												value="V" checked={formData.semester === "V"}
												onChange={handleChange}
												className="scale-125" required
											/>
											V
										</label>
										<label className="flex items-center gap-2 text-lg">
											<input
												type="radio" name="semester"
												value="VI" checked={formData.semester === "VI"}
												onChange={handleChange}
												className="scale-125" required
											/>
											VI
										</label>
									</>
								)}
							</div>
						</div>
						{/* Hostel */}
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Hostel : <span className="text-red-500">*</span>
							</label>
							<div className="flex gap-8">
								{["YES", "NO"].map(value => (
									<label key={value} className="flex items-center gap-2 text-lg">
										<input
											type="radio"
											name="hostel"
											value={value}
											checked={formData.hostel === value}
											onChange={handleChange}
											className="scale-125"
											required
										/>
										{value === "YES" ? "Yes" : "No"}
									</label>
								))}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50 shadow-md">
						{/* Register No. */}
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Register No. : <span className="text-red-500">*</span>
							</label>
							<input
								type="text" id="registerNo" name="registerNo" value={formData.registerNo}
								onChange={(e) => setFormData(prev => ({ ...prev, registerNo: e.target.value.toUpperCase() }))}
								className="w-full p-2 border border-black rounded-md text-slate-950"
								required readOnly
							/>
						</div>
						{/* Name */}
						<div>
							<label className="block mb-2 font-semibold text-gray-700">Name :</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								className="w-full p-2.5 uppercase border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
								readOnly
							/>
						</div>
						{/* Department */}
						<div>
							<label className="block mb-2 font-semibold text-gray-700">Department :</label>
							<select
								name="dept"
								value={formData.dept}
								className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								readOnly
							>
								<option value="">Select</option>
								<option value="UAI">UAI</option>
								<option value="UAM">UAM</option>
								<option value="UAR">UAR</option>
								<option value="UBA">UBA</option>
								<option value="UBO">UBO</option>
								<option value="UBT">UBT</option>
								<option value="UCC">UCC</option>
								<option value="UCO">UCO</option>
								<option value="UCH">UCH</option>
								<option value="UCA">UCA</option>
								<option value="UCS">UCS</option>
								<option value="UEC">UEC</option>
								<option value="UEN">UEN</option>
								<option value="UFT">UFT</option>
								<option value="UHS">UHS</option>
								<option value="UHM">UHM</option>
								<option value="UIT">UIT</option>
								<option value="UIC">UIC</option>
								<option value="UIF">UIF</option>
								<option value="UMA">UMA</option>
								<option value="UMB">UMB</option>
								<option value="UND">UND</option>
								<option value="UPH">UPH</option>
								<option value="UTA">UTA</option>
								<option value="UVC">UVC</option>
								<option value="UZO">UZO</option>
								<option value="PAR">PAR</option>
								<option value="PBO">PBO</option>
								<option value="PBT">PBT</option>
								<option value="PCO">PCO</option>
								<option value="PCH">PCH</option>
								<option value="PCS">PCS</option>
								<option value="PEC">PEC</option>
								<option value="PEN">PEN</option>
								<option value="PFT">PFT</option>
								<option value="PHS">PHS</option>
								<option value="PIT">PIT</option>
								<option value="PMA">PMA</option>
								<option value="PMB">PMB</option>
								<option value="PND">PND</option>
								<option value="PPH">PPH</option>
								<option value="PSW">PSW</option>
								<option value="PTA">PTA</option>
								<option value="PZO">PZO</option>
								<option value="MBA">MBA</option>
								<option value="MCA">MCA</option>
							</select>
						</div>
						{/* Section*/}
						<div>
							<label className="block mb-2 font-semibold text-gray-700">Section :</label>
							<select
								name="section"
								value={formData.section}
								className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
								readOnly
							>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="D">D</option>
								<option value="E">E</option>
								<option value="F">F</option>
								<option value="G">G</option>
								<option value="H">H</option>
								<option value="I">I</option>
							</select>
						</div>
					</div>
				</div>
				<h3 className="text-xl mb-6 font-semibold bg-gray-600 text-white p-3 rounded">
					Student Details
				</h3>
				{formData.name && (
					<>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-7 border border-gray-600 bg-white shadow-sm p-6 rounded-lg">
							<div>
								<label className="block mb-2 font-semibold text-slate-700">
									Mobile No. : <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									maxLength="10"
									id="mobileNo"
									name="mobileNo"
									value={formData.mobileNo}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, '');
										setFormData((prev) => ({ ...prev, mobileNo: value }));
									}}
									className="w-full p-2 border border-black rounded-md text-slate-950"
									required
									readOnly
								/>
							</div>
							{/* Religion (2nd) */}
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Religion :</label>
								<select
									name="religion"
									value={formData.religion}
									onChange={handleChange}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								>
									<option value="">Select</option>
									<option value="ISLAM">Islam</option>
									<option value="HINDU">Hindu</option>
									<option value="CHRISTIAN">Christian</option>
									<option value="OTHERS">Others</option>
								</select>
							</div>
							{/* Aadhar (3rd) */}
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Aadhar No. :</label>
								<input
									type="text"
									name="aadhar"
									maxLength="12"
									value={formData.aadhar}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, '');
										setFormData((prev) => ({ ...prev, aadhar: value }));
									}}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							{/* Last Credited Amount (4th) */}
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Last Time Credited Amount :</label>
								<input
									type="text"
									name="lastCreditedAmt"
									value={formData.lastCreditedAmt}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
									readOnly
								/>
							</div>
						</div>
						<div className="border border-black p-6 rounded-lg bg-gray-50 shadow-md space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Parent Name (5th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Parent / Guardian Name :</label>
									<input
										type="text"
										name="fatherName"
										value={formData.fatherName}
										onChange={handleChange}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
								{/* Parent Phone No (6th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Parent / Guardian No. :</label>
									<input
										type="text"
										name="fatherNo"
										maxLength="10"
										value={formData.fatherNo}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, '');
											setFormData((prev) => ({ ...prev, fatherNo: value }));
										}}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* Parent Occupation (7th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Occupation :</label>
									<input
										type="text"
										name="fatherOccupation"
										value={formData.fatherOccupation}
										onChange={handleChange}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
								{/* Annual Income (8th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Annual Income :</label>
									<input
										type="text"
										name="annualIncome"
										maxLength="6"
										value={formData.annualIncome}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, '');
											setFormData((prev) => ({ ...prev, annualIncome: value }));
										}}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
								{/* Sibling Detail */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Siblings :</label>
									<div className="flex gap-6 py-2">
										<label className="flex items-center gap-2 text-lg">
											<input
												type="radio"
												name="siblings"
												value="Yes"
												checked={formData.siblings === 'Yes'}
												onChange={handleChange}
												className="scale-125"
											/>
											<span>Yes</span>
										</label>
										<label className="flex items-center gap-2 text-lg">
											<input
												type="radio"
												name="siblings"
												value="No"
												checked={formData.siblings === 'No'}
												onChange={handleChange}
												className="scale-125"
											/>
											<span>No</span>
										</label>
									</div>
								</div>
								{formData.siblings === 'Yes' && (
									<>
										<div>
											<label className="block mb-2 font-semibold text-gray-700">Siblings No :</label>
											<input
												type="text"
												name="siblingsNo"
												value={formData.siblingsNo}
												onChange={handleChange}
												className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
												required
											/>
										</div>
										<div>
											<label className="block mb-2 font-semibold text-gray-700">Siblings Occupation :</label>
											<input
												type="text"
												name="siblingsOccupation"
												value={formData.siblingsOccupation}
												onChange={handleChange}
												className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
												required
											/>
										</div>
										<div>
											<label className="block mb-2 font-semibold text-gray-700">Siblings Income :</label>
											<input
												type="text"
												name="siblingsIncome"
												maxLength="6"
												value={formData.siblingsIncome}
												onChange={(e) => {
													const value = e.target.value.replace(/\D/g, '');
													setFormData((prev) => ({ ...prev, siblingsIncome: value }));
												}}
												className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
												required
											/>
										</div>
									</>
								)}
							</div>
						</div>
						<div className="border border-black p-6 rounded-lg bg-gray-50 shadow-md space-y-6">
							<div className="grid grid-cols-1">
								{/* Address (9th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Permanent Address :</label>
									<input
										type="text"
										name="address"
										value={formData.address}
										onChange={handleChange}
										placeholder="Door No & Street"
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-6">
								{/* State (10th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">State :</label>
									<select
										name="state"
										value={formData.state}
										onChange={handleChange}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									>
										<option value="Andhra Pradesh">Andhra Pradesh</option>
										<option value="Arunachal Pradesh">Arunachal Pradesh</option>
										<option value="Assam">Assam</option>
										<option value="Bihar">Bihar</option>
										<option value="Chhattisgarh">Chhattisgarh</option>
										<option value="Goa">Goa</option>
										<option value="Gujarat">Gujarat</option>
										<option value="Haryana">Haryana</option>
										<option value="Himachal Pradesh">Himachal Pradesh</option>
										<option value="Jharkhand">Jharkhand</option>
										<option value="Karnataka">Karnataka</option>
										<option value="Kerala">Kerala</option>
										<option value="Madhya Pradesh">Madhya Pradesh</option>
										<option value="Maharashtra">Maharashtra</option>
										<option value="Manipur">Manipur</option>
										<option value="Meghalaya">Meghalaya</option>
										<option value="Mizoram">Mizoram</option>
										<option value="Nagaland">Nagaland</option>
										<option value="Odisha">Odisha</option>
										<option value="Punjab">Punjab</option>
										<option value="Rajasthan">Rajasthan</option>
										<option value="Sikkim">Sikkim</option>
										<option value="Tamil Nadu">Tamil Nadu</option>
										<option value="Telangana">Telangana</option>
										<option value="Tripura">Tripura</option>
										<option value="Uttar Pradesh">Uttar Pradesh</option>
										<option value="Uttarakhand">Uttarakhand</option>
										<option value="West Bengal">West Bengal</option>
										<option value="Andaman and Nicobar Islands">
											Andaman and Nicobar Islands
										</option>
										<option value="Chandigarh">Chandigarh</option>
										<option value="Dadra and Nagar Haveli and Daman and Diu">
											Dadra and Nagar Haveli and Daman and Diu
										</option>
										<option value="Delhi">Delhi</option>
										<option value="Jammu and Kashmir">Jammu and Kashmir</option>
										<option value="Ladakh">Ladakh</option>
										<option value="Lakshadweep">Lakshadweep</option>
										<option value="Puducherry">Puducherry</option>
										<option value="Other">Other</option>
									</select>
								</div>
								{/* District (11th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">District :</label>
									<select
										name="district"
										value={formData.district}
										onChange={handleChange}
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									>
										<option value="Ariyalur">Ariyalur</option>
										<option value="Chengalpattu">Chengalpattu</option>
										<option value="Chennai">Chennai</option>
										<option value="Coimbatore">Coimbatore</option>
										<option value="Cuddalore">Cuddalore</option>
										<option value="Dharmapuri">Dharmapuri</option>
										<option value="Dindigul">Dindigul</option>
										<option value="Erode">Erode</option>
										<option value="Kallakurichi">Kallakurichi</option>
										<option value="Kanchipuram">Kanchipuram</option>
										<option value="Kanyakumari">Kanyakumari</option>
										<option value="Karur">Karur</option>
										<option value="Krishnagiri">Krishnagiri</option>
										<option value="Madurai">Madurai</option>
										<option value="Nagapattinam">Nagapattinam</option>
										<option value="Namakkal">Namakkal</option>
										<option value="Nilgiris">Nilgiris</option>
										<option value="Perambalur">Perambalur</option>
										<option value="Pudukkottai">Pudukkottai</option>
										<option value="Ramanathapuram">Ramanathapuram</option>
										<option value="Ranipet">Ranipet</option>
										<option value="Salem">Salem</option>
										<option value="Sivaganga">Sivaganga</option>
										<option value="Tenkasi">Tenkasi</option>
										<option value="Thanjavur">Thanjavur</option>
										<option value="Theni">Theni</option>
										<option value="Thoothukudi">Thoothukudi</option>
										<option value="Tiruchirappalli">Tiruchirappalli</option>
										<option value="Tirunelveli">Tirunelveli</option>
										<option value="Tirupathur">Tirupathur</option>
										<option value="Tiruppur">Tiruppur</option>
										<option value="Tiruvallur">Tiruvallur</option>
										<option value="Tiruvannamalai">Tiruvannamalai</option>
										<option value="Tiruvarur">Tiruvarur</option>
										<option value="Vellore">Vellore</option>
										<option value="Viluppuram">Viluppuram</option>
										<option value="Virudhunagar">Virudhunagar</option>
										<option value="Other">Other</option>
									</select>
								</div>
								{/* Pincode (12th) */}
								<div>
									<label className="block mb-2 font-semibold text-gray-700">Pincode :</label>
									<input
										type="text"
										name="pin"
										maxLength="6"
										value={formData.pin}
										onChange={(e) => {
											const value = e.target.value.replace(/\D/g, '');
											setFormData((prev) => ({ ...prev, pin: value }));
										}}
										placeholder="Pincode"
										className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
										required
									/>
								</div>
								<div>
									<label className="block mb-3 font-semibold text-sm text-gray-700">Jamath / Self Declaration Letter :</label>
									<input
										type="file"
										name="jamath"
										onChange={handleFileChange}
										className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 bg-white"
									/>
								</div>
							</div>
						</div>
					</>
				)}
				<div className="flex justify-end">
					<button
						type="submit"
						className="px-6 py-2.5 bg-blue-600 text-white text-md font-semibold rounded-lg shadow-lg border-2 border-blue-700 hover:bg-blue-700 hover:border-blue-800 transition duration-300"
					>
						Submit
					</button>
				</div>
			</form>
		</div >
	)
}

export default ScholarshipForm;