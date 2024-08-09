import { useEffect, useState } from 'react';
import axios from "axios";

function AttendDeeniyath() {
    const [users, setUsers] = useState([]);
    const [prevAttendancetot, setPrevattendancetot] = useState('');
    const [currAttendancetot, setCurrattendancetot] = useState('');
    const [deeniyathPer, setdeeniyathPer] = useState({});
    // const [classAttendanceRem, setClassAttendanceRem] = useState({});
    const [totalwork, setTotalwork] = useState(0);
    const [totaldata, setTotaldata] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [freshResponse, renewalResponse] = await Promise.all([
                    axios.get('http://localhost:3001/fresh'),
                    axios.get('http://localhost:3001/renewal')
                ]);

                const SFM1 = freshResponse.data.filter(user => user.deeniyath === 'Yes' && user.procategory !== 'SFW' );
                const SFM2 = renewalResponse.data.filter(user => user.deeniyath === 'Yes' && user.procategory !== 'SFW');

                const totalsfm = SFM1.length + SFM2.length;

                const freshAided = freshResponse.data.filter(user => user.deeniyath === 'Yes' && user.deeniyathPer === 0 && user.procategory !== 'SFW' );
                const renewalAided = renewalResponse.data.filter(user => user.deeniyath === 'Yes' && user.deeniyathPer === 0 && user.procategory !== 'SFW');
 
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
    }, []);

    const handleInputChange = (registerNo, type, value) => {
        setUsers(users.map(user =>
            user.registerNo === registerNo ? { ...user, [type]: value } : user
        ));
    };

    useEffect(() => {
        const calculatePercentage = () => {
            const updatedAttendancePer = users.reduce((acc, user) => {
                const prevAttendance = parseFloat(user.prevAttendance) || 0;
                const currAttendance = parseFloat(user.currAttendance) || 0;
                const totalPrevAttendance = parseFloat(prevAttendancetot) || 0;
                const totalCurrAttendance = parseFloat(currAttendancetot) || 0;

                if (totalPrevAttendance + totalCurrAttendance > 0) {
                    const percentage = ((prevAttendance + currAttendance) /
                        (totalPrevAttendance + totalCurrAttendance)) * 100;
                    acc[user.registerNo] = percentage.toFixed(2);
                } else {
                    acc[user.registerNo] = '0';
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
            const response = await axios.put("http://localhost:3001/freshdeeniyathUpdate", { updates, remarks });
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
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Deeniyath Attendance</h3>
            <div className='flex inline-flex font-bold text-xl text-white '>
                <div> Total No of Applicants: {totaldata}</div>
                <div className='ml-10 text-green-900'>Completed: {totalwork}</div>
                <div className='ml-10 text-yellow-900'>Pending:  {users.length}</div>
            </div>
            <div className='flex inline-flex text-white mt-10'>
                <div className="w-auto ">
                <label className='text-lg font-bold'>Previous Semester Working Days</label>
                    <input
                        type='text'
                        name='prevAttendancetot'
                        className="w-16 ml-4 border rounded-md text-right text-slate-950"
                        value={prevAttendancetot}
                        onChange={(e) => setPrevattendancetot(e.target.value)}
                    />
                </div>
                <div className="w-auto  ml-5">
                <label className='text-lg font-bold'>Current Semester Working Days</label>
                    <input
                        type='text'
                        name='currAttendancetot'
                        className="w-16 ml-4 border rounded-md text-right text-slate-950"
                        value={currAttendancetot}
                        onChange={(e) => setCurrattendancetot(e.target.value)}
                    />
                </div>
                <div className="text-right font-bold text-xl ml-28 text-white">No of Students:  {users.length}</div>
            </div>
            <div className="grid grid-cols-7 w-auto mt-7 bg-amber-200">
                <div className="font-bold border border-white text-center py-3">Register No.</div>
                <div className="font-bold border border-white text-center py-3">Name</div>
                <div className="font-bold border border-white text-center py-3">Department</div>
                <div className="font-bold border border-white text-center w-28 py-3">Previous Sem</div>
                <div className="font-bold border border-white text-center w-28 -ml-10 py-3">Current Sem</div>
                <div className="font-bold border border-white text-center w-30 -ml-20 py-3">Sem Percentage</div>
                <div className="font-bold border border-white text-center w-66 -ml-28 py-3">Remark</div>
            </div>
            {users.map((user, index) => (
                <div key={`${user._id}-${index}`} className="grid grid-cols-7 w-auto bg-amber-100">
                    <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                    <div className="font-bold border border-white text-center uppercase w-28 py-3">
                        <input
                            type='text'
                            name='prevAttendance'
                            className="w-14 text-right border rounded-md"
                            value={user.prevAttendance || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'prevAttendance', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-white text-center w-28 -ml-10 py-3">
                        <input
                            type='text'
                            name='currAttendance'
                            className="w-14 text-right border rounded-md"
                            value={user.currAttendance || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'currAttendance', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-white text-center w-30 -ml-20 py-3">
                        {deeniyathPer[user.registerNo] || ''}
                    </div>
                    <div className="font-bold border border-white w-66 -ml-28">
                        <input
                            type='text'
                            name='deeniyathRem'
                            className="w-66 h-full  border rounded-md"
                            value={user.deeniyathRem || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'deeniyathRem', e.target.value)}
                        />
                    </div>
                </div>
            ))}
            <button onClick={updateAttendance} className='bg-blue-500 text-white py-2 px-4 rounded-md mt-4'>Submit</button>
        </div>
    );
}

export default AttendDeeniyath;