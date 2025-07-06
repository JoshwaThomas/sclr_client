import { useEffect, useState } from 'react';
import axios from "axios";

function COE() {

    const [users, setUsers] = useState([]);
    const [semPercentage, setsemPercentage] = useState({});
    const [totalwork, setTotalwork] = useState(0);
    const [totaldata, setTotaldata] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setTotaldata(response.data.totalApplicants)
            })
            .catch(err => console.log('Error fetching data:', err));
    }, [apiUrl]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [freshResponse, renewalResponse] = await Promise.all([
                    axios.get(`${apiUrl}/fresh`),
                    axios.get(`${apiUrl}/renewal`)
                ]);
                const acyear = await axios.get(`${apiUrl}/api/admin/current-acyear`);
                const curacyear = acyear.data.acyear;
                const freshAided = freshResponse.data.filter(user =>
                    user.semPercentage === 0 &&
                    user.action === 0 &&
                    user.semester !== 'I' &&
                    user.acyear === curacyear.acyear
                )
                const renewalAided = renewalResponse.data.filter(user =>
                    user.semPercentage === 0 &&
                    user.action === 0 &&
                    user.semester !== 'I'
                )
                const totalfilter = freshAided.length + renewalAided.length;
                const work = totaldata - totalfilter;
                setTotalwork(work);
                const combinedUsers = [...freshAided, ...renewalAided];
                setUsers(combinedUsers);
            } catch (error) { console.log(error) }
        }
        fetchUsers();
    }, [totaldata, apiUrl]);

    const handleInputChange = (registerNo, type, value) => {
        setUsers(users.map(user =>
            user.registerNo === registerNo ? { ...user, [type]: value } : user
        ))
    }

    useEffect(() => {
        const calculatePercentage = () => {
            const updatedAttendancePer = users.reduce((acc, user) => {
                const markSecure = parseFloat(user.markSecure) || 0;
                const maxMark = parseFloat(user.maxMark) || 0;
                if (markSecure + maxMark > 0) {
                    const percentage = (markSecure / maxMark) * 100;
                    acc[user.registerNo] = percentage.toFixed(2);
                } else { acc[user.registerNo] = '0'; }
                return acc;
            }, {});
            setsemPercentage(updatedAttendancePer);
        }
        calculatePercentage();
    }, [users]);

    const updateAttendance = async (e) => {
        e.preventDefault();
        const updates = {};
        const remarks = {};
        const arrears = {};
        users.forEach(user => {
            updates[user.registerNo] = semPercentage[user.registerNo];
            remarks[user.registerNo] = user.semRem;
            arrears[user.registerNo] = user.semarrear;
        });
        try {
            const response = await axios.put(`${apiUrl}/freshsemUpdate`, { updates, remarks, arrears });
            if (response.data.success) { window.alert("Updates Submitted Successfully") }
            else { alert('Something went wrong') }
        } catch (err) {
            console.error('Error : ', err);
            window.alert("Something Went Wrong with the server");
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                Semester Mark Entry
            </h1>
            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-lg font-semibold">
                <div className="bg-white border-l-4 border-blue-600 p-4 rounded shadow-md">
                    Total Applicants : <span className="float-right">{totaldata}</span>
                </div>
                <div className="bg-white border-l-4 border-green-600 p-4 rounded shadow-md">
                    Completed : <span className="float-right">{totalwork}</span>
                </div>
                <div className="bg-white border-l-4 border-red-600 p-4 rounded shadow-md">
                    Pending : <span className="float-right">{users.length}</span>
                </div>
            </div>
            <div className="text-right font-semibold mb-4 text-lg">
                No of Students : {users.length}
            </div>
            <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full table-fixed border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-emerald-700 sticky top-0 z-10">
                        <tr>
                            {['Reg No', 'Name', 'Department', 'Mark Secured', 'Max Mark', 'Percentage', 'Arrears', 'Remarks'].map((heading, i) => (
                                <th
                                    key={i}
                                    className="px-4 py-3 text-center text-md font-semibold text-white border-r border-gray-300"
                                    style={{ width: i < 3 ? '12%' : i === 7 ? '20%' : '10%' }} // Adjust width per column
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500 font-semibold">
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={`${user._id}-${index}`} className="hover:bg-gray-50 transition-colors h-[80px] border-t border-gray-300">
                                    <td className="px-4 py-3 text-center text-md font-semibold text-gray-700 uppercase border-r">{user.registerNo}</td>
                                    <td className="px-4 py-3 text-center text-md font-semibold text-gray-700 uppercase border-r">{user.name}</td>
                                    <td className="px-4 py-3 text-center text-md font-semibold text-gray-700 uppercase border-r">{user.dept}</td>
                                    <td className="p-3 text-center border-r">
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 p-3 rounded text-center"
                                            value={user.markSecure || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'markSecure', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-3 text-center border-r">
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 p-3 rounded text-center"
                                            value={user.maxMark || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'maxMark', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-3 text-center border-r">
                                        <div className="w-full h-full">
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 p-3 rounded text-center"
                                                value={semPercentage[user.registerNo] || '0.00'}
                                                readOnly
                                            />
                                        </div>
                                    </td>
                                    <td className="p-3 text-center border-r">
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 p-3 rounded text-center"
                                            value={user.semarrear || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'semarrear', e.target.value)}
                                        />
                                    </td>
                                    <td className="p-3 border-r">
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 p-3 rounded"
                                            value={user.semRem || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'semRem', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Button */}
            <div className="text-right mt-6">
                <button
                    onClick={updateAttendance}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default COE;