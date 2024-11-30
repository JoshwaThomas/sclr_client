import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Setting( )  {

    const [password, setPassword] = useState({ pass: '', conpass: '' })
    const [isConpassTyped, setIsConpassTyped] = useState(false);
    const [error, setError] = useState('');
    // const [message, setMessage] = useState('');
    const { staffId } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;

    

    useEffect(() => {
        if (isConpassTyped && password.pass !== password.conpass) {
          setError('Passwords do not match');
        } else {
          setError('');
        }
      }, [password, isConpassTyped]);

    //   console.log(staffId)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevPassword) => ({
          ...prevPassword,
          [name]: value,
        }));
    
        if (name === 'conpass') {
          setIsConpassTyped(true);
        }

      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.pass !== password.conpass) {
          setError('Passwords do not match');
          return;
        }
        try {
          await axios.put(`${apiUrl}/api/admin/staffsetting/${staffId}`, { password: password.pass });
          window.alert('Password updated successfully');
        } catch (err) {
          window.alert('Failed to update password');
        }
      };
    

      

    return (
        <div>
          <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white"> Password Change </h3>
            <div className='mt-10 '>
                <label className="block mb-1 mt-3">Password:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                    type='password'
                    name='pass'
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    value={password.pass}
                    onChange={handleChange}

                />
            </div>
            <div>
                <label className="block mb-1 mt-3 ">Re-Password:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                    type='password'
                    name='conpass'
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    value={password.conpass}
                    onChange={handleChange}
                />
            </div>
            {isConpassTyped && error && <div style={{ color: 'red' }}>{error}</div>}
            {/* {message && <div style={{ color: 'green' }}>{message}</div>} */}
 <button onClick={handleSubmit} className="bg-blue-500 mt-10 text-white px-4 py-2 rounded hover:bg-black ">Update</button>
        </div>
    )
}

export default Setting