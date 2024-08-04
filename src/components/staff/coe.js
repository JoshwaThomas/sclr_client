import { useEffect, useState } from 'react';
import axios from "axios";

function Coe() {

    const [users, setUsers] = useState([]);
    const [semPercentage, setsemPercentage] = useState({});
    const [totalwork, setTotalwork] = useState(0);
    const [totaldata, setTotaldata] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard/counts')
            .then(response => {
                setTotaldata(response.data.totalApplicants)
            })
            .catch(err => console.log('Error fetching data:', err));
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [freshResponse, renewalResponse] = await Promise.all([
                    axios.get('http://localhost:3001/fresh'),
                    axios.get('http://localhost:3001/renewal')
                ]);

                const freshAided = freshResponse.data.filter(user => user.semPercentage === 0);
                const renewalAided = renewalResponse.data.filter(user => user.semPercentage === 0);
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
    }, [totaldata]);

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
            const response = await axios.put("http://localhost:3001/freshsemUpdate", { updates, remarks, arrears });
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
            <div className='flex inline-flex font-bold text-xl text-white '>
                <div>Total No of Applicants: {totaldata}</div>
                <div className='ml-2'>Completed: {totalwork}</div>
                <div className='ml-2'>Pending:  {users.length}</div>
            </div>
            <div className="text-right font-bold text-xl ml-28 text-white">No of Students:  {users.length}</div>

            <div className="grid grid-cols-8 w-auto mt-7 bg-amber-300">
                <div className="font-bold border border-white text-center py-3">Register No.</div>
                <div className="font-bold border border-white text-center py-3">Name</div>
                <div className="font-bold border border-white text-center py-3">Department</div>
                <div className="font-bold border border-white text-center py-3">Mark Secured</div>
                <div className="font-bold border border-white text-center py-3">Maximum Mark</div>
                <div className="font-bold border border-white text-center py-3">Percentage</div>
                <div className="font-bold border border-white text-center py-3">No of Arrear</div>
                <div className="font-bold border border-white text-center py-3">Remark</div>
            </div>
            {users.map((user, index) => (
                <div key={`${user._id}-${index}`} className="grid grid-cols-8 w-auto bg-amber-200">
                    <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                    <div className="font-bold border border-white text-center uppercase py-3">
                        <input
                            type='text'
                            name='markSecure'
                            className="w-14 border rounded-md"
                            value={user.markSecure || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'markSecure', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-white text-center py-3">
                        <input
                            type='text'
                            name='maxMark'
                            className="w-14 border rounded-md"
                            value={user.maxMark || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'maxMark', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-white text-center py-3">
                        {semPercentage[user.registerNo] || ''}
                    </div>
                    <div className="font-bold border border-white text-center py-3">
                        <input
                            type='text'
                            name='semarrear'
                            className="w-14 border rounded-md"
                            value={user.semarrear || ''}
                            onChange={(e) => handleInputChange(user.registerNo, 'semarrear', e.target.value)}
                        />
                    </div>
                    <div className="font-bold border border-white text-center">
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
            <button onClick={updateAttendance} className='bg-blue-500 text-white py-2 px-4 rounded-md mt-4'>Submit</button>
        </div>
    );
}

export default Coe;