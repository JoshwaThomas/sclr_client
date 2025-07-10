import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModifyModal from './modifymodal';

function Status() {

    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        registerNo: '', name: '', fresherOrRenewal: '', scholarship: '', ugOrPg: '', semester: '', pin: '',
        dept: '', section: '', religion: '', procategory: '', specialCategory: '', hostel: '', mobileNo: '',
        aadhar: '', fatherName: '', fatherNo: '', fatherOccupation: '', annualIncome: '', siblings: '',
        siblingsNo: '', siblingsOccupation: '', siblingsIncome: '', schoolName: '', yearOfPassing: '',
        percentageOfMarkSchool: '', deeniyathPer: '', classAttendancePer: '', classAttendanceRem: '', jamath: '',
        deeniyathRem: '', semRem: '', preSemester: '', semPercentage: '', address: '', state: '', district: ''
    });

    const [student, setStudent] = useState(null);
    const [deleteCon, setDeleteCon] = useState(false);
    const [scholamt, setScholamt] = useState('');
    const [scholdonar, setScholdonar] = useState('');
    const [donars, setDonars] = useState([]);
    const [scholtypes, setScholtypes] = useState([]);
    const [scholtype, setScholType] = useState('');
    const [submittedData, setSubmittedData] = useState([]);
    const [filteredDonars, setFilteredDonars] = useState([]);
    const [zakkath, setZakkath] = useState(false);
    const [password, setPassword] = useState('');


    const apiUrl = process.env.REACT_APP_API_URL;

    const [notification, setNotification] = useState({ message: '', type: '' });

    const [showModal, setShowModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [fileName, setFileName] = useState('');


    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 6000); // Automatically hide after 3 seconds
    };

    useEffect(() => {
        if (showAcceptModal) {
            const fetchDonars = () => {
                return axios.get(`${apiUrl}/api/admin/donar`)
                    .then(response => response.data)
                    .catch(err => {
                        console.error('Error fetching donors:', err);
                        return [];
                    });
            };

            const fetchScholtypes = () => {
                return axios.get(`${apiUrl}/api/admin/scholtypes`)
                    .then(response => {
                        console.log('Fetched Scholarship Types:', response.data); // Debugging log
                        return response.data;
                    })
                    .catch(err => {
                        console.error('Error fetching scholarship types:', err);
                        return [];
                    });
            };

            fetchDonars()
                .then(data => {
                    console.log('Fetched Donors:', data); // Debugging log
                    setDonars(data);
                })
                .catch(error => {
                    console.error('Error fetching donors:', error);
                });

            fetchScholtypes()
                .then(data => {
                    setScholtypes(data);
                })
                .catch(error => {
                    console.error('Error fetching scholarship types:', error);
                });
        }
    }, [showAcceptModal, apiUrl]);


    // const fetchDonars = () => {
    //     return axios.get(`${apiUrl}/api/admin/donar`)
    //         .then(response => response.data)
    //         .catch(err => {
    //             console.error('Error fetching donors:', err);
    //             return [];
    //         });
    // };

    // const fetchScholtypes = () => {
    //     return axios.get(`${apiUrl}/api/admin/scholtypes`)
    //         .then(response => {
    //             console.log('Fetched Scholarship Types:', response.data); // Debugging log
    //             return response.data;
    //         })
    //         .catch(err => {
    //             console.error('Error fetching scholarship types:', err);
    //             return [];
    //         });
    // };

    // useEffect(() => {
    //     if (showAcceptModal) {
    //         fetchDonars()
    //             .then(data => {
    //                 console.log('Fetched Donors:', data); // Debugging log
    //                 setDonars(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching donors:', error);
    //             });

    //         fetchScholtypes()
    //             .then(data => {
    //                 setScholtypes(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching scholarship types:', error);
    //             });
    //     }
    // }, [showAcceptModal]);

    useEffect(() => {
        let filtered = Array.isArray(donars) ? donars : [];
        if (zakkath) {
            filtered = filtered.filter(donar => donar.zakkathamt && donar.scholtype === scholtype);
            console.log('Zakkath list:', filtered);
        }
        if (scholtype) {
            filtered = filtered.filter(donar => donar.scholtype === scholtype);
        }

        setFilteredDonars(filtered);
    }, [scholtype, zakkath, donars]);


    const Submit = async (e) => {

        e.preventDefault();
        // if (!registerNo) { alert('Register No should not be empty'); return }

        try {
            // const result = await axios.get(`${apiUrl}/api/admin/status/${registerNo}`);
            // if (result.data.status === 'not exist') {
            //     showNotification('Student Not Found', 'error');
            //     setStudent(null);
            // } 
            // else {
            // setStudent(result.data);
            // setName(result.data.name);
            // setFresherOrRenewal(result.data.fresherOrRenewal);
            // setProcategory(result.data.procategory);
            // setUgOrPg(result.data.ugOrPg);
            // setSection(result.data.section);
            // setSemester(result.data.semester);
            // setDept(result.data.dept);
            // setHostel(result.data.hostel);
            // setMobileNo(result.data.mobileNo);
            // setFatherName(result.data.fatherName);
            // setFatherNo(result.data.fatherNo);
            // setSpecialCategory(result.data.specialCategory);
            // setReligion(result.data.religion);
            // setFatherOccupation(result.data.fatherOccupation);
            // setAnnualIncome(result.data.annualIncome);
            // setSiblings(result.data.siblings);
            // setPreSemester(result.data.preSemester);
            // setSemPercentage(result.data.semPercentage);
            // setDeeniyathPer(result.data.deeniyathPer);
            // setClassAttendancePer(result.data.classAttendancePer);
            // setClassAttendanceRem(result.data.classAttendanceRem);
            // setDeeniyathRem(result.data.deeniyathRem);
            // setSemRem(result.data.semRem);
            // setAddress(result.data.address)
            // setState(result.data.state)
            // setDistrict(result.data.district)
            // setPin(result.data.pin)

            // setShowModal(true);
            // }
        } catch (err) {
            alert('An error occurred while fetching the student data');
            setStudent(null);
        }
    };






    const handleAccept = () => {
        setShowModal(false);
        setShowAcceptModal(true);
    }

    // const ScholSubmit = (e) => {
    //     e.preventDefault();
    //     axios.get(`${apiUrl}/api/admin/current-acyear`)
    //         .then(response => {
    //             if (response.data.success) {
    //                 const acyear = response.data.acyear.acyear;

    //                 const balanceField = zakkath ? 'zakkathbal' : 'balance';

    //                 // Check the donor details and balance amount before saving to freshamt
    //                 axios.put(`${apiUrl}/api/admin/donar/${scholdonar}`, {
    //                     amount: scholamt,
    //                     balanceField: balanceField
    //                 })
    //                     .then(result => {
    //                         console.log(result);
    //                         const updatedBalance = result.data.updatedBalance;
    //                         window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

    //                         return axios.post(`${apiUrl}/api/admin/freshamt`, {
    //                             fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt, acyear
    //                         });
    //                     })
    //                     .then(result => {
    //                         const newSubmission = { scholtype, scholdonar, scholamt };
    //                         setSubmittedData(prevData => [...prevData, newSubmission]);
    //                         refreshInputs();

    //                         console.log(result);

    //                     })

    //                     .catch(err => {
    //                         console.log(err);
    //                         if (err.response && err.response.status === 400) {
    //                             if (err.response.data.message === 'Insufficient balance') {
    //                                 window.alert(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`);
    //                             } else {
    //                                 window.alert("Server Not Response!");
    //                             }
    //                         } else {
    //                             window.alert("I am Dull Try Later");
    //                         }

    //                     });
    //             }
    //             else {
    //                 console.error('Failed to fetch current academic year');
    //                 window.alert('Failed to fetch current academic year');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching current academic year:', error);
    //             window.alert('Error fetching current academic year');
    //         });
    // };

    const refreshInputs = () => {
        setScholamt('');
        setScholdonar('');
        setScholType('');
    };

    // const SubmitAccept = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`${apiUrl}/api/admin/action`, { registerNo: student.registerNo });
    //         window.location.reload();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeAcceptModal = () => {
        setShowAcceptModal(false);
    };
    


    // Function for Modify Button Click
    const handleModifyClick = async (e) => {
        e.preventDefault();
        if (!studentData.registerNo) { alert('Register number should not be empty'); return; }
        try {
            const registerNo = studentData.registerNo
            const result = await axios.get(`${apiUrl}/api/admin/status/${registerNo}`);
            if (result.data.status === 'Not Exist') { alert('Student Not Found'); setStudent(null) }
            else {
                setStudentData(prev => ({ ...prev, ...result.data }));
                setPassword(result.data.password); setShowModifyModal(true);
            }
        } catch (err) {
            console.log("Error in Fetching Students while Modify : ", err)
            alert('An error occurred while fetching the student data'); setStudent(null);
        }
    }

    // Close Modify Modal
    const closeModifyModal = () => { setShowModifyModal(false)}


    return (
        <div className="w-full p-6">
            <form className="space-y-6 w-full">
                <h3 className="text-xl mb-6 font-semibold bg-gray-600 p-3 rounded text-white">
                    Application Status
                </h3>
                <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="registerNo" className="mb-5 block text-md font-semibold text-gray-700">
                                Register No. :
                            </label>
                            <input
                                type="text" id="registerNo" name="registerNo" required
                                value={studentData.registerNo}
                                onChange={(e) => setStudentData({ ...studentData, registerNo: e.target.value.toUpperCase() })}
                                className="w-full p-2 border border-gray-400 rounded-md text-gray-900 uppercase focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[50%]">
                    <button
                        type="button" onClick={Submit}
                        className="w-[30%] py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded shadow"
                    >
                        Check Status
                    </button>
                    <button
                        type="button" onClick={handleModifyClick}
                        className="w-[30%] py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded shadow"
                    >
                        Modify
                    </button>
                    <button
                        type="button" onClick={() => navigate('/freshstudent/application/fresh')}
                        className="w-[30%] py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow"
                    >
                        New Application
                    </button>
                </div>
            </form>
            <ModifyModal
                showModifyModal={showModifyModal} studentData={studentData}
                setStudentData={setStudentData} closeModifyModal={closeModifyModal}
            />























            {/* {showModal && student && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-300 w-3/4 h-96 rounded-lg overflow-auto p-6">
                        <div className='grid grid-cols-4 w-auto p-4 text-amber-950 text-xl'>
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
                            <div></div>
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
                                    <div><label className="">Attendance Percentage: {student.classAttendancePer}</label></div>
                                    <div><label className="">Deeniyath Percentage: {student.deeniyathPer}</label></div>
                                    <div><label className="">No. Of Arrear: {student.arrear}</label></div>
                                    <div className='grid grid-cols-2 mt-2 '>
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
            )} */}
            {/* {showAcceptModal && student && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 w-3/4 h-3/4 text-black rounded-lg overflow-auto p-6">
                        <form onSubmit={SubmitAccept} className='border border-white gap-1 h-full' >
                            <div className='grid grid-cols-4     mt-10 text-xl w-auto p-4'>
                                <div className='uppercase font-bold'>
                                    {student.registerNo}
                                </div>
                                <div className='uppercase font-bold'>
                                    {student.name}
                                </div>
                                <div className='uppercase font-bold'>
                                    {student.dept}
                                </div>
                                <div className='uppercase font-bold'>
                                    <label className="block mb-1"></label>{student.specialCategory}
                                </div>
                                <div className=' flex inline-flex'>
                                    <input
                                        type="checkbox"
                                        name="zakkath"
                                        id="zakkath"
                                        checked={zakkath}
                                        onChange={(e) => setZakkath(e.target.checked)}
                                        className=" scale-200"
                                    />
                                    <label htmlFor="zakkath" className=" ml-3 mt-11 font-bold ">Zakkath</label>
                                </div>
                                <div>
                                    <label className="block mb-1 mt-10">Scholarship Type</label>
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
                                    <label className="block mb-1 mt-10">Donor</label>
                                    <select
                                        name="ScholarshipCategory"
                                        value={scholdonar}
                                        onChange={(e) => setScholdonar(e.target.value)}
                                        className=" w-48 p-2 border rounded-md text-slate-950 lg:w-48"
                                    >
                                        <option value="">Select Donor</option>
                                        {Array.isArray(filteredDonars) && filteredDonars.map((donar) => (
                                            <option key={donar._id} value={donar._id}>
                                                {donar.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mt-10">Scholarship Amount</label>
                                    <input
                                        type="text" name="amount"
                                        className="border p-2 rounded w-48 text-black"
                                        value={scholamt}
                                        onChange={(e) => setScholamt(e.target.value)}

                                    />
                                </div>

                                <div className="block relative">
                                    <button
                                        type="submit"
                                        onClick={ScholSubmit}
                                        className="absolute right-0 bg-sky-500 text-white py-2 px-6 text-lg ml-4 mb-4 mr-12 rounded-lg hover:bg-black"
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
            )
            } */}

           
        </div >
    )
}

export default Status;