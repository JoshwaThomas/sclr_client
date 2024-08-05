import React, { useState, useEffect } from 'react';
import axios from "axios";

function Setting({ staffId })  {

    const [password, setPassword] = useState({ pass: '', conpass: '' })
    const [isConpassTyped, setIsConpassTyped] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


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
          await axios.put(`http://localhost:3001/api/staffseting/${staffId}`, { password: password.pass });
          setMessage('Password updated successfully');
        } catch (err) {
          setError('Failed to update password');
        }
      };
    

      

    return (
        <div>
            <div>
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
                <label className="block mb-1 mt-3">Re-Password:<span className=' text-red-500 text-lg'><sup>*</sup></span></label>
                <input
                    type='password'
                    name='conpass'
                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                    value={password.conpass}
                    onChange={handleChange}
                />
            </div>
            {isConpassTyped && error && <div style={{ color: 'red' }}>{error}</div>}
            {message && <div style={{ color: 'green' }}>{message}</div>}
 <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-500">Update</button>
        </div>
    )
}

export default Setting