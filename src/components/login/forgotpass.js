import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jmc from '../login/jmclogo.png';
import axios from "axios";

function Forgotpass() {

    const [registerNo, setRegisterNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [password, setPassword] = useState({ pass: "", conpass: "" });
    const [isConpassTyped, setIsConpassTyped] = useState(false);
    const [error, setError] = useState("");
    const [notification, setNotification] = useState({ message: '', type: '' });
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => { setNotification({ message: '', type: '' }) }, 6000);
    };

    useEffect(() => {
        if (isConpassTyped && password.pass !== password.conpass) {
            setError("Passwords do not match");
        } else { setError("") }
    }, [password, isConpassTyped]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevPassword) => ({ ...prevPassword, [name]: value }));
        if (name === "conpass") { setIsConpassTyped(true) }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registerNo || !mobileNo || !aadhar || !password.pass || !password.conpass) {
            window.alert("Please fill in all the fields.");
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/forgotpass/`, {
                registerNo, mobileNo, aadhar, password: password.pass,
            })
            if (response.data.success) {
                alert("Password updated successfully!");
                setTimeout(() => navigate('/login'), 2000);
            } else {
                alert(response.data.message || "Failed to update password");
            }
        } catch (error) {
            alert("Error updating password. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-col lg:flex-row justify-center items-center">
                <img src={jmc} alt="LOGO" className="w-24 h-24 lg:w-32 lg:h-32 mb-4 lg:mb-0" />
                <div className="flex flex-col justify-center items-center lg:ml-8 text-center gap-1">
                    <div>
                        <span className="text-lg md:text-2xl lg:text-4xl font-bold">JAMAL MOHAMED COLLEGE</span>
                        <span className="text-lg md:text-xl lg:text-3xl font-semibold text-gray-700 ml-3">(Autonomous)</span>
                    </div>
                    <p className="text-lg md:text-xl font-semibold text-gray-700">TIRUCHIRAPPALLI - 620 020.</p>
                    <p className="text-base md:text-lg lg:text-xl font-medium text-gray-800">
                        College Sponsored Application Form for Poor and Meritorious Students
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                placeholder="Register Number"
                                value={registerNo}
                                onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                maxLength="10"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Aadhar Number"
                                maxLength="12"
                                value={aadhar}
                                onChange={(e) => setAadhar(e.target.value)}
                                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="password"
                                name="pass"
                                placeholder="New Password"
                                value={password.pass}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="password"
                                name="conpass"
                                placeholder="Confirm Password"
                                value={password.conpass}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                            />
                        </div>
                        {isConpassTyped && error && (
                            <div className="col-span-1 md:col-span-2 text-sm text-red-600"> {error} </div>
                        )}
                        <div className="col-span-1 md:col-span-2 flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="w-1/2 rounded-lg px-3 py-2 bg-gray-400 
                                hover:bg-gray-500 transition-colors duration-300 text-white font-bold"
                            > Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 rounded-lg px-3 py-2 bg-orange-500 hover:bg-orange-600 
                                transition-colors duration-300 text-white font-bold"
                            > Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgotpass;