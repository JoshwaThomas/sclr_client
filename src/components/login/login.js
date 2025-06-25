import React, { useState } from 'react';
import jmc from '../login/jmclogo.png';
import Map from '../../assets/victim1-map.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;
  
    return (
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-7 text-lg rounded-lg font-bold bg-white  ${
        type === 'success' ? ' text-green-700' : 'text-red-500'
      }`}>
        {message}
        <button onClick={onClose} className="ml-4 text-red-500 underline">Close</button>
      </div>
    );
  };

function TextBox() {
    const [staffId, setStaffId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
const [notification, setNotification] = useState({ message: '', type: '' });

const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 6000); // Automatically hide after 3 seconds
  };

    const Submit = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log('API URL:', apiUrl);
        console.log("Submitting form with:", { staffId, password });

        axios.post(`${apiUrl}/api/admin/login/`, {
            staffId,
            password,
        })
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
                } else if (res.data.status === 'wrong password') {
                    alert("Wrong Password");
                } else if (res.data.status === 'not exist') {
                    alert("User does not exist");
                }
            })
            .catch(e => {
                alert("An error occurred. Please try again.");
                console.log(e);
            });
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-center items-center py-8">
                <img src={jmc} alt="LOGO" className="w-24 h-24 lg:w-36 lg:h-36" />
                <div className="flex flex-col justify-center items-center lg:ml-8 text-center">
                    <p className="text-xl md:text-2xl lg:text-5xl font-extrabold"> JAMAL MOHAMED COLLEGE</p>
                    <p className="text-lg md:text-xl font-bold">(Autonomous)</p>
                    <p className="text-lg md:text-xl font-bold">TIRUCHIRAPPALLI - 620 020</p>
                    <p className="text-lg md:text-lg lg:text-xl font-bold">College Sponsored Application Form for Poor and Meritorious Students</p>
                </div>
            </div>

            <div className="flex justify-center items-center px-5">
                <div className="bg-orange-500 flex flex-col lg:flex-row rounded-xl lg:w-5/6 p-3">
                    <div className="h-56 lg:w-2/3 md:h-96 ">
                        <img src={Map} alt="World Map" className="px-10 h-32 md:h-72" />
                        <p className="text-lg lg:text-2xl font-bold text-center text-white animate-pulse mt-4 mb-4">
                            Jamalians Around The World
                        </p>
                        <h2 className=" text-center text-sm lg:text-xl font-bold text-white">
                            "Elevating the Next Generation Through Alumni & Well-Wishers"
                        </h2>
                    </div>
                    <div className=''>
                        <div className="text-lg text-center lg:text-2xl font-bold text-white">
                            Show Us The Right Path
                        </div>
                        <div className="lg:w-80 bg-white rounded-lg p-6 flex flex-col justify-center mt-10">
                            <form onSubmit={Submit} className="space-y-4">
                                <h1 className="text-lg lg:text-2xl font-bold text-center">LOGIN</h1>
                                <input
                                    type="text"
                                    value={staffId}
                                    onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                                    className="w-full border px-4 py-2 rounded-md placeholder-gray-500"
                                    placeholder="Username"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border px-4 py-2 rounded-md placeholder-gray-500"
                                    placeholder="Password"
                                />
                                <span className=' cursor-pointer text-sm hover:text-red-500 ' onClick={() => navigate('/forgotPassword')}>Forgot Password?</span>
                                <div className="flex justify-between">
                                    <button type='submit' className="rounded-full px-6 py-2 bg-orange-500 hover:bg-black text-white font-bold" disabled={loading}    > {loading ? 'Loading...' : 'Login'}</button>
                                    <button type='button' className="rounded-full px-6 py-2 bg-orange-500 hover:bg-black text-white font-bold" onClick={() => navigate('/')}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextBox;
