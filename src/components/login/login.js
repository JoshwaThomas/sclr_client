import React, { useState, useRef, useEffect } from 'react';
import jmc from '../login/jmclogo.png';
import Map from '../../assets/victim1-map.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function TextBox() {

    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const loginBtnRef = useRef(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const Submit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${apiUrl}/api/admin/login/`, { staffId, password })
            .then(res => {
                setLoading(false)
                console.log("Response from server:", res.data);
                if (res.data.status === 'exist') {
                    const { role, token } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
                    if (role === 1 || role === 3) {
                        navigate('/admin/dashboard', { state: { id: staffId, role } });
                    } else if (role === 2) {
                        navigate(`/staff/${staffId}/dashboard`, { state: { id: staffId, role } });
                    } else if (staffId === `${role}`) {
                        navigate(`/student/${staffId}/status`, { state: { id: staffId } });
                    }
                }
                else if (res.data.status === 'wrong password') { alert("Wrong Password") }
                else if (res.data.status === 'not exist') { alert("User does not exist") }
            })
            .catch(e => { alert("An error occurred. Please try again.") })
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="w-full flex flex-col lg:flex-row justify-center items-center">
                <img src={jmc} alt="LOGO" className="w-24 h-24 lg:w-32 lg:h-32 mb-4 lg:mb-0" />
                <div className="flex flex-col justify-center items-center lg:ml-8 text-center gap-1">
                    <div>
                        <span className="text-lg md:text-2xl lg:text-4xl font-bold">JAMAL MOHAMED COLLEGE</span>
                        <span className="text-lg md:text-xl lg:text-3xl font-semibold text-gray-700 ml-3">( Autonomous )</span>
                    </div>
                    <p className="text-lg md:text-xl font-semibold text-gray-700">TIRUCHIRAPPALLI - 620 020.</p>
                    <p className="text-base md:text-lg lg:text-xl font-medium text-gray-800">
                        College Sponsored Application Form for Poor and Meritorious Students
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="bg-orange-500 shadow-xl flex flex-col lg:flex-row rounded-xl w-full max-w-6xl p-6 gap-6">
                    <div className="lg:w-2/3 flex flex-col items-center justify-center">
                        <img src={Map} alt="World Map" className="h-32 md:h-72 px-10 object-contain" />
                        <p className="text-lg lg:text-2xl font-bold text-white animate-pulse mt-4">
                            Jamalians Around The World
                        </p>
                        <h2 className="text-sm lg:text-xl font-semibold text-white text-center mt-1">
                            "Elevating the Next Generation Through Alumni & Well-Wishers"
                        </h2>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:w-1/3">
                        <div className="text-lg lg:text-2xl font-bold text-white text-center">
                            Show Us The Right Path
                        </div>
                        <div className="w-full bg-white rounded-2xl shadow-lg p-6">
                            <form onSubmit={Submit} className="space-y-5">
                                <h1 className="text-lg lg:text-2xl font-bold text-center text-orange-600">LOGIN</h1>
                                <input
                                    type="text" ref={usernameRef}
                                    value={staffId}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            passwordRef.current?.focus();
                                        }
                                    }}
                                    onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                                    className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 rounded-md placeholder-gray-500"
                                    placeholder="Username"
                                />
                                <div className="w-full relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        ref={passwordRef}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none px-4 py-2.5 pr-10 rounded-md placeholder-gray-500"
                                        placeholder="Password"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pr-1 text-gray-500 cursor-pointer"
                                        onClick={() => setShowPassword(prev => !prev)}
                                    >
                                        <FontAwesomeIcon className='text-sm' icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                                <span
                                    className="block text-sm text-right text-blue-800 hover:text-blue-500 cursor-pointer"
                                    onClick={() => navigate('/forgotPassword')}
                                >
                                    Forgot Password ?
                                </span>
                                <div className="flex justify-between gap-8">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="w-1/2 rounded-lg px-3 py-2 bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white font-bold"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-1/2 rounded-lg px-3 py-2 bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white font-bold"
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextBox;