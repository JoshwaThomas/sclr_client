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
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, [apiUrl]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setNewPassword('');
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = () => {
        axios.put(`${apiUrl}/api/admin/staffmang/${selectedUser._id}`, { password: newPassword })
            .then(() => {
                setUsers(users.map(user =>
                    user._id === selectedUser._id ? { ...user, password: newPassword } : user
                ));
                setSelectedUser(null);
                setNewPassword('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="p-6">
            <h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Staff Password Management
            </h3>
            <div className="overflow-x-auto max-w-md mx-auto shadow ring-1 ring-black ring-opacity-10 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-emerald-600">
                        <tr className=''>
                            <th className="px-6 py-3 text-center text-md font-bold text-white border-r">User ID</th>
                            <th className="px-6 py-3 text-center text-md font-bold text-white">Password</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-center">
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-emerald-50 transition-colors">
                                <td className="px-6 py-3 font-medium text-gray-700 border-r">{user.staffId}</td>
                                <td className="px-6 py-3 text-gray-800 flex justify-center items-center gap-4">
                                    <span className='w-36'>{user.password}</span>
                                    <FaEdit
                                        className="text-blue-600 cursor-pointer text-lg hover:text-blue-800 transition"
                                        onClick={() => handleEditClick(user)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <h4 className="text-lg font-bold mb-6 text-gray-800 text-center">
                            Edit Password for <span className="text-emerald-600">{selectedUser.staffId}</span>
                        </h4>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <div className="flex justify-end space-x-6">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="bg-gray-500 hover:bg-red-500 text-white px-4 py-2 rounded transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Staffmang;