import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Staffmang() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/admin/staffmang`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => console.log(err));
    }, [apiUrl]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        // setNewPassword(user.password);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = () => {
        axios.put(`${apiUrl}/api/admin/staffmang/${selectedUser._id}`, { password: newPassword })
            .then(response => {
                setUsers(users.map(user => user._id === selectedUser._id ? { ...user, password: newPassword } : user));
                setSelectedUser(null);
                setNewPassword('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className=''>
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 text-white">Staffs</h3>
            <div className='grid grid-cols-2 w-96 mt-7 bg-emerald-500  justify-center'>
                <div className="font-bold border border-black text-center py-3">User ID</div>
                <div className="font-bold border border-black text-center py-3">Password</div>
            </div>
            {users.map((user, index) => (
                <div key={index} className="grid grid-cols-2 w-96 bg-emerald-200  justify-center">
                    <div className="font-bold border border-black text-center  py-3">{user.staffId} </div>
                    <div className="font-bold border border-black text-center  py-3">
                        {user.password} <FaEdit className="inline cursor-pointer" onClick={() => handleEditClick(user)} />
                    </div>
                </div>
            ))}
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h4 className="text-lg font-bold mb-4">Edit Password for {selectedUser.staffId}</h4>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={handlePasswordChange} 
                            placeholder="New Password" 
                            className="border rounded px-3 py-2 mb-4 w-full"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-500">Update</button>
                            <button onClick={() => setSelectedUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Staffmang;