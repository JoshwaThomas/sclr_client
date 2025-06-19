import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jmc from '../login/jmclogo.png';
import axios from "axios";

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

function Forgotpass() {
    const [registerNo, setRegisterNo] = useState();
    const [mobileNo, setMobileNo] = useState();
    const [aadhar, setAadhar] = useState();
    const [password, setPassword] = useState({ pass: "", conpass: "" });
    const [isConpassTyped, setIsConpassTyped] = useState(false);
    const [error, setError] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 6000); // Automatically hide after 3 seconds
  };


    useEffect(() => {
        if (isConpassTyped && password.pass !== password.conpass) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [password, isConpassTyped]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevPassword) => ({
          ...prevPassword,
          [name]: value,
        }));
    
        if (name === "conpass") {
          setIsConpassTyped(true);
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!registerNo || !mobileNo || !aadhar || !password.pass || !password.conpass) {
            window.alert("Please fill in all the fields.");
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/forgotpass/`, {
                registerNo,
                mobileNo,
                aadhar,
                password: password.pass,
            });
            if (response.data.success) {
                 window.alert("Password updated successfully!");
                //  showNotification("Password updated successfully!", "success");
                 navigate('/login')
               } else if (response.data.message === "Aadhar number mismatched") {
                console.log(response.data.message)
                //  window.alert("Register No. Already Existing");
                 showNotification("Aadhar number mismatched", "error");
               } else if (response.data.message ===  "Mobile number mismatched"){
                //  window.alert("Mobile number mismatched");
                showNotification("Mobile number mismatched", "error");
                 console.log(response.data.message)
               }else{
                // window.alert("Data Not Found")
                showNotification("Data Not Found", "error");
                console.log(response.data.message)
               }
            
        } catch (error) {
            window.alert("Error updating password. Please try again.");
        }
    };


    return (
        <div>
             <div className="flex flex-col lg:flex-row justify-center items-center">
                <img src={jmc} alt="LOGO" className="w-24 h-24 lg:w-36 lg:h-36" />
                <div className="flex flex-col justify-center items-center lg:ml-8 text-center">
                    <p className="text-2xl lg:text-5xl font-extrabold">JAMAL MOHAMED COLLEGE</p>
                    <p className="text-xl font-bold">(Autonomous)</p>
                    <p className="text-xl font-bold">TIRUCHIRAPPALLI - 620 020</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center h-2/3'>
            <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
                <div className='p-10 bg-slate-200 shadow-xl rounded-md'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                        <input
                            type='text'
                            name='regno'
                            placeholder='Register No'
                            value={registerNo}
                            onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                            className='w-60 p-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type='text'
                            name='mobileno'
                            placeholder='Mobile No'
                            maxLength="10"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            className='w-60 p-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type='text'
                            name='aadharno'
                            placeholder='Aadhar No'
                            maxLength="12"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            className='w-60 p-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type='password'
                            name='pass'
                            placeholder='Password '
                            value={password.pass}
                            onChange={handleChange}
                            className='w-60 p-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type='password'
                            name='conpass'
                            placeholder='Confirm Password'
                            value={password.conpass}
                            onChange={handleChange}
                            className='w-60 p-2 border border-gray-300 rounded-md'
                        />
                        {isConpassTyped && error && (
                            <div style={{ color: "red" }}>{error}</div>
                        )}
                        <div className='flex justify-between'>
                            <button type="submit" className='bg-orange-500 text-white px-4 py-2 rounded-lg'>
                                Submit
                            </button>
                            <button type="button" className='bg-gray-400 text-white px-4 py-2 rounded-lg'>
                                Cancel
                            </button>
                        </div>
                    </form>
            
                </div>
            </div>
        </div>

    )
}

export default Forgotpass