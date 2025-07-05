import { useEffect, useState } from 'react';
import axios from "axios";

function AttendSfw() {

    const [users, setUsers] = useState([]);
    const [currAttendancetot, setCurrattendancetot] = useState('');
    const [classAttendancePer, setClassAttendancePer] = useState({});
    const [totalwork, setTotalwork] = useState(0);
    const [totaldata, setTotaldata] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [freshResponse, renewalResponse] = await Promise.all([
                    axios.get(`${apiUrl}/fresh`),
                    axios.get(`${apiUrl}/renewal`)
                ]);
                const acyear = await axios.get(`${apiUrl}/api/admin/current-acyear`);
                const curacyear = acyear.data.acyear;
                const SFW1 = freshResponse.data.filter(user =>
                    user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear
                );
                const SFW2 = renewalResponse.data.filter(user =>
                    user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear
                );
                const totalsfw = SFW1.length + SFW2.length;

                const freshSFW = freshResponse.data.filter(user =>
                    user.procategory === 'SFW' && user.classAttendancePer === 0 && user.action === 0 && user.acyear === curacyear.acyear
                );
                const renewalSFW = renewalResponse.data.filter(user =>
                    user.procategory === 'SFW' && user.classAttendancePer === 0 && user.action === 0 && user.acyear === curacyear.acyear
                );
                const totalfilter = freshSFW.length + renewalSFW.length;
                const work = totalsfw - totalfilter;
                setTotalwork(work);
                setTotaldata(totalsfw);
                const combinedUsers = [...freshSFW, ...renewalSFW];
                setUsers(combinedUsers);
            } catch (error) { console.error(error) }
        }
        fetchUsers();
    }, [apiUrl]);

    const handleInputChange = (registerNo, type, value) => {
        if ((type === 'currAttendance' || type === 'prevAttendance') && !/^\d*\.?\d*$/.test(value)) return;
        setUsers(users.map(user =>
            user.registerNo === registerNo ? { ...user, [type]: value } : user
        ));
    };

    useEffect(() => {
        const calculatePercentage = () => {
            const updated = users.reduce((acc, user) => {
                const curr = parseFloat(user.currAttendance) || 0;
                const total = parseFloat(currAttendancetot) || 0;
                acc[user.registerNo] = total > 0 ? ((curr / total) * 100).toFixed(2) : '0';
                return acc;
            }, {});
            setClassAttendancePer(updated);
        }
        calculatePercentage();
    }, [users, currAttendancetot]);

    const updateAttendance = async (e) => {
        e.preventDefault();
        const updates = {};
        const remarks = {};
        users.forEach(user => {
            updates[user.registerNo] = {
                prevAttendance: user.prevAttendance,
                classAttendancePer: classAttendancePer[user.registerNo]
            };
            remarks[user.registerNo] = user.classAttendanceRem;
        });
        try {
            const response = await axios.put(`${apiUrl}/freshattSfmUpdate`, { updates, remarks });
            if (response.data.success) { window.alert("Updates Submitted Successfully") }
            else { alert("Something went wrong") }
        } catch (err) {
            console.error("Error:", err);
            window.alert("Something went wrong with the server");
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                SFW Attendance
            </h1>
            {/* Status Cards */}
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
            {/* Working Days Input */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <label className="font-semibold text-lg">Current Semester Working Days :</label>
                    <input
                        type="text"
                        className="w-20 border border-black px-2 py-1.5 rounded text-right"
                        value={currAttendancetot}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) setCurrattendancetot(val);
                        }}
                    />
                </div>
                <div className="font-semibold text-lg">
                    No of Students : {users.length}
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-emerald-700 sticky top-0 z-10">
                        <tr>
                            {['Reg No', 'Name', 'Department', 'Prev Sem (%)', 'Curr Sem', 'Percentage', 'Remarks'].map((heading, i) => (
                                <th key={i} className="px-4 py-3 text-center text-md font-semibold text-white border-r border-gray-300">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500 font-semibold">
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            users.sort((a, b) => a.registerNo.localeCompare(b.registerNo)).map((user, index) => (
                                <tr key={`${user._id}-${index}`} className="hover:bg-gray-50 transition-colors h-[80px] border-t border-gray-300">
                                    <td className="px-4 py-3 text-center font-semibold text-gray-700 uppercase border-r">{user.registerNo}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-gray-700 uppercase border-r">{user.name}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-gray-700 uppercase border-r">{user.dept}</td>
                                    <td className="px-4 py-3 text-center border-r">
                                        <input
                                            type="text"
                                            className="w-20 border p-2 rounded text-right"
                                            value={user.prevAttendance || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'prevAttendance', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-center border-r">
                                        <input
                                            type="text"
                                            className="w-20 border p-2 rounded text-right"
                                            value={user.currAttendance || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'currAttendance', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-center border-r font-semibold text-sm text-gray-800">
                                        {classAttendancePer[user.registerNo] || '0.00'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            value={user.classAttendanceRem || ''}
                                            onChange={(e) => handleInputChange(user.registerNo, 'classAttendanceRem', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Submit Button */}
            <div className="text-right mt-6">
                <button
                    onClick={updateAttendance}
                    disabled={!currAttendancetot || users.length === 0}
                    className={`px-6 py-2 rounded-md font-semibold text-white 
                        ${!currAttendancetot || users.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default AttendSfw;
