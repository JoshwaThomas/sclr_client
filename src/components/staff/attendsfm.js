import { useEffect, useState } from 'react';
import axios from "axios";

function AttendSfm() {
    const [users, setUsers] = useState([]);
    // const [prevAttendancetot, setPrevattendancetot] = useState('');
    const [currAttendancetot, setCurrattendancetot] = useState('');
    const [classAttendancePer, setClassAttendancePer] = useState({});
    // const [classAttendanceRem, setClassAttendanceRem] = useState({});
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
                const acyear = await axios.get(`${apiUrl}/api/admin/current-acyear`)
                const curacyear = acyear.data.acyear;

                const SFM1 = freshResponse.data.filter(user => user.procategory === 'SFM' && user.action === 0 && user.acyear === curacyear.acyear);
                const SFM2 = renewalResponse.data.filter(user => user.procategory === 'SFM' && user.action === 0 && user.acyear === curacyear.acyear);

                const totalsfm = SFM1.length + SFM2.length;

                const freshAided = freshResponse.data.filter(user => user.procategory === 'SFM' && user.classAttendancePer === 0 && user.action === 0 && user.acyear === curacyear.acyear);
                const renewalAided = renewalResponse.data.filter(user => user.procategory === 'SFM' && user.classAttendancePer === 0 && user.action === 0 && user.acyear === curacyear.acyear);

                const totalfilter = freshAided.length + renewalAided;
                const work = totalsfm - totalfilter;
                setTotalwork(work)
                setTotaldata(totalsfm)

                const combinedUsers = [...freshAided, ...renewalAided];
                setUsers(combinedUsers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [apiUrl]);

    const handleInputChange = (registerNo, type, value) => {
        setUsers(users.map(user =>
            user.registerNo === registerNo ? { ...user, [type]: value } : user
        ));
    };

    useEffect(() => {
        const calculatePercentage = () => {
            const updatedAttendancePer = users.reduce((acc, user) => {
                // const prevAttendance = parseFloat(user.prevAttendance) || 0;
                const currAttendance = parseFloat(user.currAttendance) || 0;
                // const totalPrevAttendance = parseFloat(prevAttendancetot) || 0;
                const totalCurrAttendance = parseFloat(currAttendancetot) || 0;

                if (totalCurrAttendance > 0) {
                    const percentage = (currAttendance /
                        totalCurrAttendance) * 100;
                    acc[user.registerNo] = percentage.toFixed(2);
                } else {
                    acc[user.registerNo] = '0';
                }
                return acc;
            }, {});
            setClassAttendancePer(updatedAttendancePer);
        };

        calculatePercentage();
    }, [users, currAttendancetot]);

    const updateAttendance = async (e) => {
        e.preventDefault();

        const updates = {};
        const remarks = {};

        users.forEach(user => {
            updates[user.registerNo] = {
                prevAttendance: user.prevAttendance,
                classAttendancePer: classAttendancePer[user.registerNo],
                // classAttendanceRem: user.classAttendanceRem
            };
            remarks[user.registerNo] = user.classAttendanceRem;
        });

        try {
            const response = await axios.put(`${apiUrl}/freshattSfmUpdate`, { updates, remarks });
            if (response.data.success) {
                window.alert("Updates Submitted Successfully");
            } else {
                alert('Something went wrong');
            }
        } catch (err) {
            console.error('Error ', err);
            window.alert("Something Went Wrong with the server");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 text-white">SFM Attendance</h3>
            <div className="flex flex-wrap font-bold text-xl ">
                <div className="w-full lg:w-auto">Total No of Applicants: {totaldata}</div>
                <div className="w-full lg:w-auto lg:ml-10">Completed: {totalwork}</div>
                <div className="w-full lg:w-auto lg:ml-10">Pending: {users.length}</div>
            </div>
            <div className="flex flex-wrap  mt-10">
                {/* <div className="w-full lg:w-auto">
                <label className="text-lg font-bold">Previous Semester Working Days</label>
                <input
                    type="text"
                    name="prevAttendancetot"
                    className="w-16 ml-4 border rounded-md text-slate-950"
                    value={prevAttendancetot}
                    onChange={(e) => setPrevattendancetot(e.target.value)}
                />
            </div> */}
                <div className="w-full lg:w-auto lg:ml-5">
                    <label className="text-lg font-bold">Current Semester Working Days</label>
                    <input
                        type="text"
                        name="currAttendancetot"
                        className="w-16 ml-4 border border-black rounded-md text-slate-950"
                        value={currAttendancetot}
                        onChange={(e) => setCurrattendancetot(e.target.value)}
                    />
                </div>
                <div className="w-full text-right font-bold text-xl lg:ml-28 mt-4 lg:mt-0">No of Students: {users.length}</div>
            </div>

            <div className="hidden md:grid grid-cols-10 text-white w-full mt-7 bg-emerald-500 sticky top-0">
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-1">Register No.</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-3">Name</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-1">Department</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-1">Previous Semester (%)</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-1">Current Semester</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-1">Percentage</div>
                <div className="font-bold flex items-center justify-center border border-black text-center py-3 col-span-2">Remark</div>
            </div>
            <div className='overflow-y-auto max-h-[500px] scrollbar-hide'>
                {users.map((user, index) => (
                    <div key={`${user._id}-${index}`} className={`hidden md:grid grid-cols-10 ${index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                        <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.registerNo}</div>
                        <div className="font-bold border border-black text-center uppercase py-3 col-span-3">{user.name}</div>
                        <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.dept}</div>
                        <div className="font-bold border border-black text-center py-3 col-span-1">
                            <input
                                type="text"
                                name="prevAttendance"
                                className="w-14 border border-black rounded-md"
                                value={user.prevAttendance || ''}
                                onChange={(e) => handleInputChange(user.registerNo, 'prevAttendance', e.target.value)}
                            />
                        </div>
                        <div className="font-bold border border-black text-center py-3 col-span-1">
                            <input
                                type="text"
                                name="currAttendance"
                                className="w-14 border border-black rounded-md"
                                value={user.currAttendance || ''}
                                onChange={(e) => handleInputChange(user.registerNo, 'currAttendance', e.target.value)}
                            />
                        </div>
                        <div className="font-bold border border-black text-center  py-3 col-span-1">
                            {classAttendancePer[user.registerNo] || ''}
                        </div>
                        <div className="font-bold border border-black text-center col-span-2">
                            <input
                                type="textarea"
                                name="classAttendanceRem"
                                className="w-full h-full border  rounded-md"
                                value={user.classAttendanceRem || ''}
                                onChange={(e) => handleInputChange(user.registerNo, 'classAttendanceRem', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='text-right font-bold'>
                <button onClick={updateAttendance} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Submit</button>
            </div>

            {/* Display message on mobile view */}
            <div className="md:hidden bg-red-500 text-white p-4 text-center font-bold mt-5">
                Open desktop view only
            </div>
        </div>
    );
}

export default AttendSfm;