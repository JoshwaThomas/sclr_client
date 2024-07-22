import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Status() {
    const [registerNo, setRegisterNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [scholamt, setScholamt] = useState('');
    const [scholdonar, setScholdonar] = useState('');
    const [donars, setDonars] = useState([]);
    const [scholtypes, setScholtypes] = useState([]);
    const [scholtype, setScholType] = useState('');
    const [submittedData, setSubmittedData] = useState([]);

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.get(`http://localhost:3001/api/admin/status/${registerNo}`);
            setStudent(result.data);
            setShowModal(true); // Show modal when student data is fetched
        } catch (err) {
            setStudent(null);
            alert('Student not found');
            setShowModal(false); // Hide modal if there's an error
        }
    };

    const handleAccept = () => {
        setShowModal(false);
        setShowAcceptModal(true);
    };

    const fetchDonars = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/donar');
            setDonars(response.data);
        } catch (err) {
            console.error('Error fetching donors:', err);
        }
    };

    const fetchScholtypes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/scholtypes');
            setScholtypes(response.data);
        } catch (err) {
            console.error('Error fetching scholarship types:', err);
        }
    };

    useEffect(() => {
        if (showAcceptModal) {
            fetchDonars();
            fetchScholtypes();
        }
    }, [showAcceptModal]);

    const ScholSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/api/admin/current-acyear');
            if (response.data.success) {
                const acyear = response.data.acyear.acyear;

                // Check the donor details and balance amount before saving to freshamt
                const result = await axios.put(`http://localhost:3001/api/admin/donar/${scholdonar}`, { amount: scholamt });
                const updatedBalance = result.data.updatedBalance;
                window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

                await axios.post('http://localhost:3001/api/admin/freshamt', {
                    fresherOrRenewal: student.fresherOrRenewal,
                    registerNo: student.registerNo,
                    name: student.name,
                    dept: student.dept,
                    scholtype,
                    scholdonar,
                    scholamt,
                    acyear
                });

                const newSubmission = { scholtype, scholdonar, scholamt };
                setSubmittedData([...submittedData, newSubmission]);
                refreshInputs();
            } else {
                console.error('Failed to fetch current academic year');
                window.alert('Failed to fetch current academic year');
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400) {
                if (err.response.data.message === 'Insufficient balance') {
                    window.alert(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`);
                } else {
                    window.alert("Server Not Response!");
                }
            } else {
                window.alert("I am Dull Try Later");
            }
        }
    };

    const refreshInputs = () => {
        setScholamt('');
        setScholdonar('');
        setScholType('');
    };

    const SubmitAccept = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/admin/action', { registerNo: student.registerNo });
            window.location.reload();
        } catch (err) {
            console.log(err);
            // Handle error appropriately
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeAcceptModal = () => {
        setShowAcceptModal(false);
    };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={Submit} className="space-y-4">
                    <div className='text-white'>
                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Register No.:</label>
                                <input
                                    type="text"
                                    id="registerNo"
                                    name="registerNo"
                                    value={registerNo}
                                    onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                                    className="w-72 p-2 uppercase border rounded-md text-slate-950"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        >
                            Check Status
                        </button>
                    </div>
                </form>
                {showModal && student && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-red-300 w-3/4 h-96 rounded-lg overflow-auto p-6">
                            <div className='grid grid-cols-3 w-auto p-4 text-amber-950 text-xl'>
                                {student.registerNo && (
                                    <div className='uppercase'>
                                        <label className="block mb-1">Register No.: {student.registerNo}</label>
                                    </div>
                                )}
                                {student.name && (
                                    <div className='uppercase'>
                                        <label className="block mb-1">Name: {student.name}</label>
                                    </div>
                                )}
                                {student.fresherOrRenewal && (
                                    <div className='uppercase'>
                                        <label className="block mb-1">Application: {student.fresherOrRenewal}</label>
                                    </div>
                                )}
                                {student.ugOrPg && (
                                    <div className='uppercase mt-3'>
                                        <div>{student.ugOrPg}</div>
                                        <div>{student.dept}</div>
                                        <div>{student.section}</div>
                                        <div>{student.procategory}</div>
                                        <div>{student.semester}</div>
                                        <div>{student.mobileNo}</div>
                                        <div><label className="block mb-1">Hostel: {student.hostel}</label></div>
                                    </div>
                                )}
                                {student.fatherName && (
                                    <div className='uppercase mt-3'>
                                        <div><label className="block mb-1">S/O,D/O: {student.fatherName}</label></div>
                                        <div>{student.fatherNo}</div>
                                        <div>{student.fatherOccupation}</div>
                                        <div>{student.annualIncome}</div>
                                        <div><label className="">Siblings: </label>{student.siblings}</div>
                                    </div>
                                )}
                                {student.specialCategory && (
                                    <div className='uppercase mt-3'>
                                        <div>{student.specialCategory}</div>
                                        <div>{student.religion}</div>
                                        <div>{student.address}</div>
                                        <div>{student.district}</div>
                                        <div>{student.state}</div>
                                        <div>{student.pin}</div>
                                    </div>
                                )}
                                {student.schoolName && (
                                    <div className='uppercase mt-3'>
                                        <div>{student.schoolName}</div>
                                        <div>{student.percentageOfMarkSchool}</div>
                                        <div>{student.preSemester}</div>
                                        <div>{student.semPercentage}</div>
                                        <div><label className="">Class Attendance Percentage: {student.classAttendancePer}</label></div>
                                        <div><label className="">Deeniyath Percentage: {student.deeniyathPer}</label></div>
                                        <div><label className="">No. Of Arrear: {student.arrear}</label></div>
                                        <div className='grid grid-cols-3 -ml-60'>
                                            <div></div>
                                            <div></div>
                                            <div className='flex inline-flex'>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                                    onClick={handleAccept}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-slate-600 text-white py-1 px-4 ml-4 rounded-lg hover:bg-red-500"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {student.scholamt && (
                                    <div className='uppercase mt-3'>
                                        <label className="block mb-1">Amount: {student.totalScholamt}</label>
                                    </div>
                                )}
                                {student.scholtype && (
                                    <div className='uppercase mt-3'>
                                        <label className="block mb-1">Scholar Type: {student.scholtype}</label>
                                        <div className='grid grid-cols-3 ml-28'>
                                            <div></div>
                                            <div></div>
                                            <div className='flex inline-flex mt-40'>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                                    onClick={handleAccept}
                                                >
                                                    Release
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-slate-600 text-white py-1 px-4 ml-4 rounded-lg hover:bg-red-500"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {student.reason && (
                                    <div className='uppercase mt-3 '>
                                        <label className="block mb-1">Rejected Reason: {student.reason}</label>
                                        <div className='grid grid-cols-3 ml-28'>
                                            <div></div>
                                            <div></div>
                                            <div className='flex inline-flex ml-96'>
                                                <button
                                                    type="button"
                                                    className="bg-green-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                                    onClick={handleAccept}
                                                >
                                                    Release
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-slate-600 text-white py-1 px-4 ml-4 rounded-lg hover:bg-red-500"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>

                        </div>
                    </div>
                )}
                {showAcceptModal && student && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-red-300 w-3/4 h-72 text-white rounded-lg overflow-auto p-6">
                            <form onSubmit={SubmitAccept}>
                                <div className='grid grid-cols-3 w-auto p-4'>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Register No.:</label>{student.registerNo}
                                    </div>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Name:</label>{student.name}
                                    </div>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Department:</label>{student.dept}
                                    </div>
                                    {/* <div className='uppercase mt-3'>
                                        <label className="block mb-1">Amount: {student.totalScholamt}</label>
                                    </div> */}
                                    <div>
                                        <label className="block mb-1">Scholarship Type</label>
                                        <select
                                            name="ScholarshipCategory"
                                            value={scholtype}
                                            onChange={(e) => setScholType(e.target.value)}
                                            className="w-48 p-2 border rounded-md text-slate-950 lg:w-48"
                                        >
                                            <option value="">Select</option>
                                            {scholtypes.map((type, index) => (
                                                <option key={index} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-1">Donar</label>
                                        <select
                                            name="ScholarshipCategory"
                                            value={scholdonar}
                                            onChange={(e) => setScholdonar(e.target.value)}
                                            className=" w-48 p-2 border rounded-md text-slate-950 lg:w-48"
                                        >
                                            <option value="">Select Donor</option>
                                            {Array.isArray(donars) && donars.map((donar) => (
                                                <option key={donar._id} value={donar._id}>
                                                    {donar.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block uppercase">Scholarship Amount:</label>
                                        <input
                                            type="text" name="amount"
                                            className="border p-2 rounded w-48 text-black"
                                            value={scholamt}
                                            onChange={(e) => setScholamt(e.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            onClick={ScholSubmit}
                                            className="bg-sky-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                                {submittedData.length > 0 && (
                                    <div>
                                        {submittedData.map((submission, index) => (
                                            <div key={index} className='grid grid-cols-4'>
                                                <div className=''>{index + 1}:</div>
                                                <div className='w-auto'>{submission.scholtype}</div>
                                                <div className='w-auto'>{submission.scholamt}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-600 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                        onClick={closeAcceptModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Status;