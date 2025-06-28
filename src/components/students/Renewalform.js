import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleCheck, faCircleExclamation, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
	success: faCircleCheck,
	error: faCircleExclamation,
	info: faCircleInfo,
};

const colorMap = {
	success: 'bg-green-50 text-green-800 border-green-200',
	error: 'bg-red-50 text-red-800 border-red-200',
	info: 'bg-blue-50 text-blue-800 border-blue-200',
};

const Notification = ({ message, type = 'info', onClose, duration = 4000, }) => {
	
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (message) {
			setVisible(true);
			const timer = setTimeout(() => {
				setVisible(false);
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [message, duration, onClose]);

	if (!message || !visible) return null;

	const Icon = iconMap[type] || faCircleInfo;
	const colorClasses = colorMap[type] || colorMap.info;

	return (
		<div
			role="alert"
			aria-live="polite"
			className={`fixed top-5 left-1/2 z-50 w-[300px] shadow-lg border-l-4 px-5 py-4 rounded-lg transition-all duration-300 ease-in-out flex items-start gap-4 ${colorClasses} animate-fade-in`}
		>
			<FontAwesomeIcon icon={Icon} className="text-xl mt-0.5" />
			<div className="flex-1 font-semibold">{message}</div>
			<button
				onClick={() => {
					setVisible(false);
					onClose();
				}}
				className="text-gray-400 hover:text-black text-sm"
				aria-label="Close notification"
			>
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</div>
	)
}

const ScholarshipForm = () => {

	const { staffId } = useParams();
	const [student, setStudent] = useState(null);
	const [deeniyath, setDeeniyath] = useState();
	const [ugOrPg, setUgOrPg] = useState('')
	const [semester, setSemester] = useState('')
	const [name, setName] = useState('')
	const [registerNo, setRegisterNo] = useState('')
	const [dept, setDept] = useState('')
	const [section, setSection] = useState('')
	const [religion, setReligion] = useState('')
	const [procategory, setProcategory] = useState('')
	const [address, setAddress] = useState('')
	const [state, setState] = useState('')
	const [district, setDistrict] = useState('')
	const [pin, setPin] = useState('')
	const [specialCategory, setSpecialCategory] = useState('')
	const [hostel, setHostel] = useState('')
	const [mobileNo, setMobileNo] = useState('')
	const [aadhar, setAadhar] = useState()
	const [fatherName, setFatherName] = useState('')
	const [fatherNo, setFatherNo] = useState('')
	const [fatherOccupation, setFatherOccupation] = useState('')
	const [annualIncome, setAnnualIncome] = useState('')
	const [lastCreditedAmt, setLastCreditedAmt] = useState('')
	const [siblings, setSiblings] = useState('')
	const [siblingsNo, setSiblingsNo] = useState()
	const [siblingsOccupation, setSiblingsOccupation] = useState()
	const [siblingsIncome, setSiblingsIncome] = useState()
	const [showPopup, setShowPopup] = useState(true);
	const [jamath, setJamath] = useState("");
	const apiUrl = process.env.REACT_APP_API_URL;

	const [notification, setNotification] = useState({ message: '', type: '' });
	const showNotification = (message, type) => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification({ message: '', type: '' });
		}, 6000)
	}

	const closePopup = () => { setShowPopup(false) };

	useEffect(() => {
		const fetchData = async () => {
			if (!staffId) return;
			try {
				const result = await axios.get(`${apiUrl}/api/admin/students`, {
					params: { registerNo: staffId.toUpperCase() }
				})
				setStudent(result.data);
				setRegisterNo(result.data.registerNo);
				setMobileNo(result.data.mobileNo);
				setName(result.data.name);
				setDept(result.data.dept);
				setSection(result.data.section);
				setReligion(result.data.religion);
				setAadhar(result.data.aadhar);
				setFatherName(result.data.fatherName);
				setFatherNo(result.data.fatherNo);
				setFatherOccupation(result.data.fatherOccupation);
				setAnnualIncome(result.data.annualIncome);
				setAddress(result.data.address);
				setState(result.data.state);
				setDistrict(result.data.district);
				setPin(result.data.pin);
				setSiblings(result.data.siblings);
				setSiblingsNo(result.data.siblingsNo);
				setSiblingsOccupation(result.data.siblingsOccupation);
				setSiblingsIncome(result.data.siblingsIncome);
				setDeeniyath(result.data.deeniyath);
				setLastCreditedAmt(result.data.scholamt);
			} catch (err) {
				console.error('Error fetching student data:', err.response ? err.response.data : err);
				setStudent(null);
				alert('Student not found');
				showNotification("Student not found", "error");
			}
		};
		fetchData();
	}, [staffId, apiUrl]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.get(`${apiUrl}/api/admin/current-acyear`)
			.then(response => {
				if (response.data.success) {
					const acyear = response.data.acyear.acyear;
					const formData = new FormData();
					formData.append("deeniyath", deeniyath);
					formData.append("ugOrPg", ugOrPg);
					formData.append("semester", semester);
					formData.append("name", name);
					formData.append("registerNo", registerNo);
					formData.append("dept", dept);
					formData.append("section", section);
					formData.append("religion", religion);
					formData.append("procategory", procategory);
					formData.append("address", address);
					formData.append("district", district);
					formData.append("state", state);
					formData.append("pin", pin);
					formData.append("specialCategory", specialCategory);
					formData.append("aadhar", aadhar);
					formData.append("hostel", hostel);
					formData.append("mobileNo", mobileNo);
					formData.append("fatherName", fatherName);
					formData.append("fatherNo", fatherNo);
					formData.append("fatherOccupation", fatherOccupation);
					formData.append("annualIncome", annualIncome);
					formData.append("siblings", siblings);
					formData.append("siblingsNo", siblingsNo);
					formData.append("siblingsOccupation", siblingsOccupation);
					formData.append("siblingsIncome", siblingsIncome);
					formData.append("acyear", acyear);
					formData.append("lastCreditedAmt", lastCreditedAmt)
					formData.append("jamath", jamath);

					axios
						.post(`${apiUrl}/renewal`, formData, {
							headers: { "Content-Type": "multipart/form-data" },
						})
						.then(result => {
							if (result.data.success) {
								showNotification("Your Application Submitted Successfully", "success");
								console.log(result);
								setTimeout(() => {
									window.location.reload();
								}, 6000);
							} else if (result.data.message === 'Register No. Already Existing') {
								showNotification("Register No. Already Existing", "error");
							} else if (result.data.message === 'Already You Applied Fresher Application') {
								alert("Already You Applied");
								showNotification("Already You Applied Fresher Application in this year", "error");
							}
							else if (result.data.message === 'Already You Applied Renewal Application') {
								alert("Already You Applied");
								showNotification("Already You Applied Renewal Application", "error");
							}
							else { console.error('Backend error:', result.data.error) }
						})
						.catch(err => {
							console.error('Error posting data:', err);
						});
				} else {
					console.error('Failed to fetch current academic year');
				}
			})
			.catch(error => {
				console.error('Error fetching current academic year:', error);
			});
	};

	return (
		<div className="container">
			<Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
			<form className="space-y-8 font-semibold">
				<div>
					<h3 className="text-xl mb-6 font-semibold bg-gray-600 text-white p-3 rounded">
						Renewal Application
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
						<div>
							<label className="block mb-2 font-semibold text-slate-700">
								Special Category : <span className="text-red-500 text-lg">*</span>
							</label>
							<select
								name="specialCategory"
								value={specialCategory}
								onChange={(e) => setSpecialCategory(e.target.value)}
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
				</div>
				<h3 className="text-xl mb-2 font-semibold bg-gray-600 p-3 mt-7 rounded text-white">
					Academic Details
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50">
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							UG or PG : <span className="text-red-500">*</span>
						</label>
						<div className="flex gap-8">
							<label className="flex items-center gap-2 text-lg">
								<input
									type="radio"
									name="ugOrPg"
									value="UG"
									checked={ugOrPg === "UG"}
									onChange={(e) => setUgOrPg(e.target.value)}
									className="scale-125"
									required
								/>
								UG
							</label>
							<label className="flex items-center gap-2 text-lg">
								<input
									type="radio"
									name="ugOrPg"
									value="PG"
									checked={ugOrPg === "PG"}
									onChange={(e) => setUgOrPg(e.target.value)}
									className="scale-125"
									required
								/>
								PG
							</label>
						</div>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Programme Stream : <span className="text-red-500">*</span>
						</label>
						<div className="flex flex-wrap gap-8">
							{["Aided", "SFM", "SFW"].map((type) => (
								<label key={type} className="flex items-center gap-2 text-lg">
									<input
										type="radio"
										name="procategory"
										value={type}
										checked={procategory === type}
										onChange={(e) => setProcategory(e.target.value)}
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
							Semester : <span className="text-red-500">*</span>
						</label>
						<div className="flex flex-wrap gap-6">
							{["I", "II", "III", "IV"].map((sem) => (
								<label key={sem} className="flex items-center gap-2 text-lg">
									<input
										type="radio"
										name="semester"
										value={sem}
										checked={semester === sem}
										onChange={(e) => setSemester(e.target.value)}
										className="scale-125"
										required
									/>
									{sem}
								</label>
							))}
							{ugOrPg !== "PG" && (
								<>
									<label className="flex items-center gap-2 text-lg">
										<input
											type="radio"
											name="semester"
											value="V"
											checked={semester === "V"}
											onChange={(e) => setSemester(e.target.value)}
											className="scale-125"
											required
										/>
										V
									</label>
									<label className="flex items-center gap-2 text-lg">
										<input
											type="radio"
											name="semester"
											value="VI"
											checked={semester === "VI"}
											onChange={(e) => setSemester(e.target.value)}
											className="scale-125"
											required
										/>
										VI
									</label>
								</>
							)}
						</div>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Hostel : <span className="text-red-500">*</span>
						</label>
						<div className="flex gap-8">
							<label className="flex items-center gap-2 text-lg">
								<input
									type="radio"
									name="hostel"
									value="YES"
									checked={hostel === "YES"}
									onChange={(e) => setHostel(e.target.value)}
									className="scale-125"
									required
								/>
								Yes
							</label>
							<label className="flex items-center gap-2 text-lg">
								<input
									type="radio"
									name="hostel"
									value="NO"
									checked={hostel === "NO"}
									onChange={(e) => setHostel(e.target.value)}
									className="scale-125"
									required
								/>
								No
							</label>
						</div>
					</div>
				</div>
				<h3 className="text-xl mb-6 font-semibold bg-gray-600 text-white p-3 rounded">
					Student Details
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-black p-6 rounded-lg bg-gray-50 shadow-md">
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Register No. : <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="registerNo"
							name="registerNo"
							value={registerNo}
							onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
							className="w-full p-2 border border-black rounded-md text-slate-950"
							required
						/>
					</div>
					<div>
						<label className="block mb-2 font-semibold text-slate-700">
							Mobile No. : <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							maxLength="10"
							id="mobileNo"
							name="mobileNo"
							value={mobileNo}
							onChange={(e) => setMobileNo(e.target.value)}
							className="w-full p-2 border border-black rounded-md text-slate-950"
							required
						/>
					</div>
				</div>
				{student && (
					<div>
						<div className="grid grid-rows-1 md:grid-cols-3 gap-6 border border-gray-600 bg-white shadow-sm p-6 rounded-lg">
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Name : </label>
								<input
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full p-2.5 uppercase border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
									readOnly
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Department :</label>
								<select
									name="dept"
									value={dept}
									onChange={(e) => setDept(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
									readOnly
								>
									<option value="">Select</option>
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
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Section :</label>
								<select
									name="section"
									value={section}
									onChange={(e) => setSection(e.target.value)}
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
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7 border border-gray-600 bg-white shadow-sm p-6 rounded-lg">
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Religion :</label>
								<select
									name="religion"
									value={religion}
									onChange={(e) => setReligion(e.target.value)}
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
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Last Time Credited Amount :</label>
								<input
									type="text"
									name="lastCreditedAmount"
									value={lastCreditedAmt}
									onChange={(e) => setLastCreditedAmt(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
									readOnly
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Aadhar No. :</label>
								<input
									type="text"
									name="aadhar"
									maxLength="12"
									value={aadhar}
									onChange={(e) => setAadhar(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
						</div>
						<div className="grid grid-rows-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 border border-gray-600 bg-white shadow-sm p-6 mt-7 rounded-lg">
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Parent / Guardian Name :</label>
								<input
									type="text"
									name="fatherName"
									value={fatherName}
									onChange={(e) => setFatherName(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Parent / Guardian No. :</label>
								<input
									type="text"
									name="fatherNo"
									value={fatherNo}
									onChange={(e) => setFatherNo(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Occupation : </label>
								<input
									type="text"
									name="fatherOccupation"
									value={fatherOccupation}
									onChange={(e) => setFatherOccupation(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Annual Income : </label>
								<input
									type="text"
									name="annualIncome"
									value={annualIncome}
									onChange={(e) => setAnnualIncome(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Permanent Address : </label>
								<input
									type="text"
									name="address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									placeholder="Door No & Street"
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">State : </label>
								<select
									name="state"
									value={state}
									onChange={(e) => setState(e.target.value)}
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
							<div>
								<label className="block mb-2 font-semibold text-gray-700">District : </label>
								<select
									name="district"
									value={district}
									onChange={(e) => setDistrict(e.target.value)}
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
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Pincode : </label>
								<input
									type="text"
									name="pin"
									value={pin}
									maxLength="6"
									onChange={(e) => setPin(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									placeholder="Pincode"
									required
								/>
							</div>
							<div>
								<label className="block mb-2 font-semibold text-gray-700">Siblings : </label>
								<input
									type="text"
									name="siblings"
									value={siblings}
									onChange={(e) => setSiblings(e.target.value)}
									className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
									required
								/>
							</div>
							{siblings === 'Yess' && (
								<>
									<div>
										<label className="block mb-2 font-semibold text-gray-700">Siblings No : </label>
										<input
											type="text"
											value={siblingsNo}
											onChange={(e) => setSiblingsNo(e.target.value)}
											className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
											required
										/>
									</div>
									<div>
										<label className="block mb-2 font-semibold text-gray-700">Siblings Occupation : </label>
										<input
											type="text"
											value={siblingsOccupation}
											onChange={(e) => setSiblingsOccupation(e.target.value)}
											className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
											required
										/>
									</div>
									<div>
										<label className="block mb-2 font-semibold text-gray-700">Siblings Income : </label>
										<input
											type="text"
											value={siblingsIncome}
											onChange={(e) => setSiblingsIncome(e.target.value)}
											className="w-full p-2.5 border border-gray-600 rounded-lg text-gray-900"
											required
										/>
									</div>
								</>
							)}
							<div>
								<label className="block mb-3 font-semibold text-sm text-gray-700">Jamath / Self Declaration Letter : </label>
								<input
									type="file"
									name="jamath"
									onChange={(e) => setJamath(e.target.files[0])}
									className="w-full p-2 border border-gray-600 rounded-lg text-gray-900 bg-white"
								/>
							</div>
						</div>
					</div>
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
			{showPopup && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100 backdrop-blur-sm transition-all duration-300">
					<div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white w-[90%] max-w-3xl rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-gray-700 relative p-10 animate-fadeIn">
						<button
							onClick={closePopup}
							className="absolute top-7 right-7 text-gray-400 hover:text-red-500 text-xl transition-transform hover:scale-110"
							aria-label="Close"
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
						<h2 className="text-3xl mt-5 font-extrabold text-center mb-6 text-teal-300 tracking-wide drop-shadow-md">
							Application Instructions
						</h2>
						<div className="space-y-5 text-gray-300 text-[15px] md:text-base leading-relaxed px-2">
							<p>
								<span className="font-semibold text-white">1. Username : </span> Use your <span className="text-teal-400">Register Number</span> as the login ID.
							</p>
							<p>
								<span className="font-semibold text-white">2. Password : </span> Choose a strong password and keep it safe. It’s required for all future logins.
							</p>
							<p>
								<span className="font-semibold text-white">3. Required Fields : </span> All fields marked with <span className="text-red-400 font-bold">*</span> must be filled.
							</p>
							<p>
								<span className="font-semibold text-white">4. Status Check : </span> You can monitor your application status anytime by logging in.
							</p>
						</div>
						<div className="mt-7 flex justify-end">
							<button
								onClick={closePopup}
								className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
							>
								I Understand
							</button>
						</div>
					</div>
				</div>
			)}
		</div >
	)
}

export default ScholarshipForm;
