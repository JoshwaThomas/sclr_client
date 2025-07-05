import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Setting() {

	const [password, setPassword] = useState({ pass: '', conpass: '' });
	const [isConpassTyped, setIsConpassTyped] = useState(false);
	const [error, setError] = useState('');
	const { staffId } = useParams();
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		if (isConpassTyped && password.pass !== password.conpass) {
			setError('Passwords do not match');
		} else { setError('') }
	}, [password, isConpassTyped]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPassword(prev => ({ ...prev, [name]: value }));
		if (name === 'conpass') { setIsConpassTyped(true); }
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password.pass !== password.conpass) {
			setError('Passwords do not match');
			return;
		}
		try {
			await axios.put(`${apiUrl}/api/admin/staffsetting/${staffId}`, { password: password.pass });
			window.alert('Password Updated Successfully');
		} catch (err) {
			window.alert('Failed to update Password');
		}
	};

	return (
		<div className="p-6">
			<h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
				Change Password
			</h3>
			<div className="bg-white border border-gray-300 rounded-lg shadow p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="">
					<label className="block mb-2 font-semibold text-gray-700">
						Password : <span className="text-red-500 text-lg">*</span>
					</label>
					<input
						type="password"
						name="pass"
						value={password.pass}
						onChange={handleChange}
						className="w-full border border-gray-400 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
						required
					/>
				</div>
				<div className="">
					<label className="block mb-2 font-semibold text-gray-700">
						Re-enter Password : <span className="text-red-500 text-lg">*</span>
					</label>
					<input
						type="password"
						name="conpass"
						value={password.conpass}
						onChange={handleChange}
						className="w-full border border-gray-400 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
						required
					/>
				</div>
				{isConpassTyped && error && (
					<p className="text-red-600 font-semibold text-sm">{error}</p>
				)}
			</div>
			<div className="mt-6 flex justify-end">
				<button
					type="button"
					onClick={handleSubmit}
					className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md transition"
				>
					Update
				</button>
			</div>
		</div>
	);
}

export default Setting;