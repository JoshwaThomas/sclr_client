import { useEffect, useState } from 'react';
import axios from "axios";

function AttendMoral() {
    const [users, setUsers] = useState([]);
    const [prevAttendancetot, setPrevattendancetot] = useState('');
    const [currAttendancetot, setCurrattendancetot] = useState('');
    const [deeniyathPer, setdeeniyathPer] = useState({});
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
                const SFM1 = freshResponse.data.filter(user => user.deeniyath === 'No' && user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear);
                const SFM2 = renewalResponse.data.filter(user => user.deeniyath === 'No' && user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear);

                const totalsfm = SFM1.length + SFM2.length;

                const freshAided = freshResponse.data.filter(user => user.deeniyath === 'No' && user.deeniyathPer === 0 && user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear);
                const renewalAided = renewalResponse.data.filter(user => user.deeniyath === 'No' && user.deeniyathPer === 0 && user.procategory === 'SFW' && user.action === 0 && user.acyear === curacyear.acyear);

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
                const prevAttendance = parseFloat(user.prevAttendancedee) || 0;
                const currAttendance = parseFloat(user.currAttendancedee) || 0;
                const totalPrevAttendance = parseFloat(prevAttendancetot) || 0;
                const totalCurrAttendance = parseFloat(currAttendancetot) || 0;
        
                if (user.semester === "I" || user.semester === "II") {
                    // Only consider current attendance for first-year students
                    if (totalCurrAttendance > 0) {
                        const percentage = (currAttendance / totalCurrAttendance) * 100;
                        acc[user.registerNo] = percentage.toFixed(2);
                    } else {
                        acc[user.registerNo] = '0';
                    }
                } else {
                    // Consider both previous and current attendance for others
                    if (totalPrevAttendance + totalCurrAttendance > 0) {
                        const percentage = ((prevAttendance + currAttendance) /
                            (totalPrevAttendance + totalCurrAttendance)) * 100;
                        acc[user.registerNo] = percentage.toFixed(2);
                    } else {
                        acc[user.registerNo] = '0';
                    }
                }
        
                return acc;
            }, {});
        
            setdeeniyathPer(updatedAttendancePer);
        };
        calculatePercentage();
    }, [users, prevAttendancetot, currAttendancetot]);

    const updateAttendance = async (e) => {
        e.preventDefault();

        const updates = {};
        const remarks = {};

        users.forEach(user => {
            updates[user.registerNo] = deeniyathPer[user.registerNo];
            remarks[user.registerNo] = user.deeniyathRem;
        });

        try {
            const response = await axios.put(`${apiUrl}/freshdeeniyathUpdate`, { updates, remarks });
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
        <div>
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Moral Attendance</h3>
            <div className='flex inline-flex font-bold text-xl '>
                <div> Total No of Applicants: {totaldata}</div>
                <div className='ml-10'>Completed: {totalwork}</div>
                <div className='ml-10 '>Pending:  {users.length}</div>
            </div>
            <div className='flex inline-flex mt-10'>
                <div className="w-auto ">
                    <label className='text-lg font-bold'>Previous Year Working Days</label>
                    <input
                        type='text'
                        name='prevAttendancetot'
                        className="w-16 ml-4 border font-bold border-black rounded-md  text-slate-950"
                        value={prevAttendancetot}
                        onChange={(e) => setPrevattendancetot(e.target.value)}
                    />
                </div>
                <div className="w-auto  ml-5">
                    <label className='text-lg font-bold'>Current Year Working Days</label>
                    <input
                        type='text'
                        name='currAttendancetot'
                        className="w-16 ml-4 border font-bold border-black rounded-md  text-slate-950"
                        value={currAttendancetot}
                        onChange={(e) => setCurrattendancetot(e.target.value)}
                    />
                </div>
                <div className="text-right font-bold text-xl ml-28 ">No of Students:  {users.length}</div>
            </div>
            <div className="grid grid-cols-10 text-white w-auto mt-7 bg-emerald-500 sticky top-0">
                <div className="font-bold border border-black text-center py-3 col-span-1">Register No.</div>
                <div className="font-bold border border-black text-center py-3 col-span-3">Name</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Department</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Previous Year</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Current Year</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Percentage</div>
                <div className="font-bold border border-black text-center py-3 col-span-2">Remark</div>
            </div>
            <div className='overflow-y-auto max-h-[500px] scrollbar-hide'>
            {users.map((user, index) => (
                <div key={`${user._id}-${index}`} className={`hidden md:grid grid-cols-10 ${index%2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.registerNo}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-3">{user.name}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.dept}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">
                        <input
                            type='text'
                            name='prevAttendance'
                            className="w-14 text-right border border-black rounded-md"
                            // value={user.prevAttendancedee || ''}
                            disabled = {user.semester === 'I' || user.semester === 'II'}
                            onChange={(e) => handleInputChange(user.registerNo, 'prevAttendancedee', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-black text-center py-3 col-span-1">
                        <input
                            type='text'
                            name='currAttendance'
                            className="w-14 text-right font-bold border border-black rounded-md"
                            // value={user.currAttendancedee || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'currAttendancedee', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-black text-center py-3 col-span-1">
                        {deeniyathPer[user.registerNo] || ''}
                    </div>
                    <div className="font-bold border border-black text-center col-span-2">
                        <input
                            type='text'
                            name='deeniyathRem'
                            className="w-full h-full  border rounded-md"
                            value={user.deeniyathRem || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'deeniyathRem', e.target.value)}
                        />
                    </div>
                </div>
            ))}
            </div>
            <div className='text-right font-bold'>
                <button onClick={updateAttendance} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Submit</button>
            </div>        
            </div>
    );
}

export default AttendMoral;