import { useEffect, useState } from 'react';
import axios from "axios";

function Coe() {

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
                const acyear = await axios.get(`${apiUrl}/api/admin/current-acyear`)
                const curacyear = acyear.data.acyear;

                const freshAided = freshResponse.data.filter(user => user.semPercentage === 0 && user.action === 0 && user.semester !== 'I' && user.acyear === curacyear.acyear);
                const renewalAided = renewalResponse.data.filter(user => user.semPercentage === 0 && user.action === 0 && user.semester !== 'I');
                const totalfilter = freshAided.length + renewalAided.length;
                const work = totaldata - totalfilter;
                setTotalwork(work);

                const combinedUsers = [...freshAided, ...renewalAided];
                setUsers(combinedUsers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, [totaldata, apiUrl]);

    const handleInputChange = (registerNo, type, value) => {
        setUsers(users.map(user =>
            user.registerNo === registerNo ? { ...user, [type]: value } : user
        ));
    };

    useEffect(() => {
        const calculatePercentage = () => {
            const updatedAttendancePer = users.reduce((acc, user) => {
                const markSecure = parseFloat(user.markSecure) || 0;
                const maxMark = parseFloat(user.maxMark) || 0;

                if (markSecure + maxMark > 0) {
                    const percentage = markSecure / maxMark * 100;
                    acc[user.registerNo] = percentage.toFixed(2);
                } else {
                    acc[user.registerNo] = '0';
                }
                return acc;
            }, {});
            setsemPercentage(updatedAttendancePer);
        };

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
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Semester Mark</h3>
            <div className='flex inline-flex font-bold text-xl  '>
                <div>Total No of Applicants: {totaldata}</div>
                <div className='ml-10'>Completed: {totalwork}</div>
                <div className='ml-10'>Pending:  {users.length}</div>
            </div>
            <div className="text-right font-bold text-xl ml-28 ">No of Students:  {users.length}</div>

            <div className="grid grid-cols-10 w-full text-white mt-7 bg-emerald-500">
                <div className="font-bold border border-black text-center py-3 col-span-1">Register No.</div>
                <div className="font-bold border border-black text-center py-3 col-span-2">Name</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Department</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Mark Secured</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Maximum Mark</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">Percentage</div>
                <div className="font-bold border border-black text-center py-3 col-span-1">No of Arrear</div>
                <div className="font-bold border border-black text-center py-3 col-span-2">Remark</div>
            </div>
            {users.map((user, index) => (
                <div key={`${user._id}-${index}`} className={`hidden md:grid grid-cols-10 ${index%2 === 0 ? "bg-emerald-200" : "bg-emerald-200"}`}>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.registerNo}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-2">{user.name}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">{user.dept}</div>
                    <div className="font-bold border border-black text-center uppercase py-3 col-span-1">
                        <input
                            type='text'
                            name='markSecure'
                            className="w-14 border border-black rounded-md"
                            value={user.markSecure || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'markSecure', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-black text-center py-3 col-span-1">
                        <input
                            type='text'
                            name='maxMark'
                            className="w-14 border border-black rounded-md"
                            value={user.maxMark || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'maxMark', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-black text-center py-3 col-span-1">
                        {semPercentage[user.registerNo] || ''}
                    </div>
                    <div className="font-bold border border-black text-center py-3 col-span-1">
                        <input
                            type='text'
                            name='semarrear'
                            className="w-14 border border-black rounded-md"
                            value={user.semarrear || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'semarrear', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-black text-center col-span-2">
                        <input
                            type='textarea'
                            name='semRem'
                            className="w-full h-full border rounded-md"
                            value={user.semRem || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'semRem', e.target.value)}
                        />
                    </div>
                </div>
            ))}
            <div className='text-right font-bold'>
                <button onClick={updateAttendance} className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Submit</button>
            </div>
        </div>
    );
}

export default Coe;