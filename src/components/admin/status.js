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
    const [allDonars, setAllDonars] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isSubmitEnabled, setSubmitEnabled] = useState(false);
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

    useEffect(() => {
        if (showAcceptModal) {
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
    }, [showAcceptModal]);

    // To Fetch Donars based on the Donar Type and Input Amount

    useEffect(() => {
        let filtered = Array.isArray(donars) ? donars : [];
        if (allDonars) { setFilteredDonars(filtered) }
        else if (scholtype && scholamt) {
            const amount = parseFloat(scholamt);
            filtered = filtered.filter((donar) =>
                donar.scholtype === scholtype && donar.balance >= amount
            );
            setFilteredDonars(filtered);
        }
        else { setFilteredDonars(filtered) }
    }, [scholtype, zakkath, donars, scholamt, allDonars]);

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

    // Save Button
    const ScholSubmit = async (e) => {
        e.preventDefault();
        const newSubmission = { scholtype, scholdonar, scholamt };
        if (!scholdonar || !scholamt) { alert("Please select donor and enter amount."); return }
        setSubmittedData(prev => [...prev, newSubmission]);
        refreshInputs();
        setSubmitEnabled(true);
    }




    const SubmitAccept = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/admin/action`, { registerNo: studentData.registerNo });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const closeModifyModal = () => { setShowModifyModal(false) }
    const closeModal = () => { setShowModal(false); setShowAcceptModal(false) }
    const closeAcceptModal = () => { setShowAcceptModal(false); }



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


    const Submit = async (e) => {

        e.preventDefault();
        if (!studentData.registerNo) { alert('Register number should not be empty'); return; }

        try {
            const registerNo = studentData.registerNo
            const result = await axios.get(`${apiUrl}/api/admin/status/${registerNo}`);
            if (result.data.status === 'Not Exist') {
                alert('Student Not Found');
                setStudent(null);
            }
            else {
                const student = result.data;
                setStudent(student);
                setStudentData(prev => ({ ...prev, ...student }));
                setShowModal(true);
            }
        } catch (err) {
            alert('An error occurred while fetching the student data');
            setStudent(null);
        }
    };

    const acceptSubmit = async (e) => {

        e.preventDefault();
        if (submittedData.length === 0) {
            alert("No scholarship data to submit.");
            return;
        }

        try {

            const acYearResponse = await axios.get(`${apiUrl}/api/admin/current-acyear`);
            if (!acYearResponse.data.success) throw new Error("Failed to fetch academic year");
            const acyear = acYearResponse.data.acyear.acyear;
            const balanceField = zakkath ? 'zakkathbal' : 'balance';
            const donorUpdates = submittedData.map(entry => ({
                donorId: entry.scholdonar,
                amount: entry.scholamt, balanceField
            }));

            const donorRes = await axios.put(`${apiUrl}/api/admin/donar/multiple`, { donors: donorUpdates });

            if (!donorRes.data.success) {
                const failedList = donorRes.data.insufficient || [];
                const errorDetails = failedList.map(d =>
                    `Donor ID : ${d.donorId} ( Available : ₹${d.available}, Required : ₹${d.required})`
                ).join('\n');
                alert("Donor Deduction Failed :\n" + errorDetails); return;
            }

            for (const entry of submittedData) {
                const { scholdonar, scholamt, scholtype } = entry;
                const saveAmountResponse = await axios.post(`${apiUrl}/api/admin/freshamt`, {
                    registerNo: studentData.registerNo, name: studentData.name, dept: studentData.dept,
                    scholtype, scholdonar, scholamt, acyear, fresherOrRenewal: studentData.fresherOrRenewal
                })
                if (!saveAmountResponse.data.success) { alert(`Failed to save scholarship for Donor ID ${scholdonar}`); return }
            }

            const registerNo = studentData.registerNo
            await axios.post(`${apiUrl}/api/admin/action`, { registerNo });
            alert("All Scholarships Submitted Successfully.");
            setSubmittedData([]); closeModal();
            window.location.reload()

        } catch (err) {
            console.error("Error in Sumitting Accept : ", err);
            alert("Something went wrong during submission. Please try again.");
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };




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

            {showModal && student && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white w-[95%] max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-indigo-100 to-white border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Scholarship Application - {studentData.name}</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-600 transition text-xl font-bold">&times;</button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto px-8 py-6 space-y-8">
                            {/* Section: Student Info */}
                            <Section title="Student Info">
                                <Grid cols={3}>
                                    <Field label="Register No. :" value={studentData.registerNo} />
                                    <Field label="Application :" value={studentData.fresherOrRenewal} />
                                    <Field label="Scholar Type :" value={studentData.scholtype} />
                                </Grid>
                            </Section>

                            {/* Section: Scholarship Details */}
                            <Section title="Scholarship Details">
                                <Grid cols={3}>
                                    <Field label="Total Scholarship Amount :" value={studentData.totalScholamt} />
                                </Grid>
                            </Section>

                            {/* Rejected Reason */}
                            {studentData.reason && (
                                <div className="bg-red-50 border border-red-300 text-red-800 rounded-xl p-4 shadow-sm">
                                    <strong className="block mb-1">Rejected Reason : </strong>
                                    <span>{studentData.reason}</span>
                                </div>
                            )}

                            {/* Section: Academic Info */}
                            <Section title="Academic Info">
                                <Grid cols={3}>
                                    <Field label="UG/PG :" value={studentData.ugOrPg} />
                                    <Field label="Department :" value={studentData.dept} />
                                    <Field label="Section :" value={studentData.section} />
                                    <Field label="Semester :" value={studentData.semester} />
                                    <Field label="Pro Category :" value={studentData.procategory} />
                                    <Field label="Hostel :" value={studentData.hostel} />
                                    <Field label="Mobile No :" value={studentData.mobileNo} />
                                </Grid>
                            </Section>

                            {/* Section: Parent & Sibling Info */}
                            <Section title="Parent & Sibling Info">
                                <Grid cols={3}>
                                    <Field label="Father Name :" value={studentData.fatherName} />
                                    <Field label="Father Contact :" value={studentData.fatherNo} />
                                    <Field label="Occupation :" value={studentData.fatherOccupation} />
                                    <Field label="Annual Income :" value={studentData.annualIncome} />
                                    <Field label="Siblings :" value={studentData.siblings} />
                                </Grid>
                            </Section>

                            {/* Section: Address & Personal Info */}
                            <Section title="Address & Personal Info">
                                <Grid cols={3}>
                                    <Field label="Special Category :" value={studentData.specialCategory} />
                                    <Field label="Religion :" value={studentData.religion} />
                                    <Field label="Address :" value={studentData.address} />
                                    <Field label="District :" value={studentData.district} />
                                    <Field label="State : " value={studentData.state} />
                                    <Field label="PIN :" value={studentData.pin} />
                                </Grid>
                            </Section>

                            {/* Section: Academic Performance */}
                            <Section title="Academic Performance">
                                <Grid cols={3}>
                                    <Field label="School Name :" value={studentData.schoolName} />
                                    <Field label="School % Marks :" value={studentData.percentageOfMarkSchool} />
                                    <Field label="Prev Semester :" value={studentData.preSemester} />
                                    <Field label="Sem % Marks :" value={studentData.semPercentage} />
                                    <Field label="Class Attendance % :" value={studentData.classAttendancePer} />
                                    <Field label="Deeniyath % :" value={studentData.deeniyathPer} />
                                    <Field label="No. of Arrears :" value={studentData.arrear} />
                                </Grid>
                            </Section>

                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-4 px-8 py-4 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={handleAccept}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
                            >
                                {studentData.reason || studentData.scholtype ? 'Release' : 'Accept'}
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-600 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


























            {/* {showAcceptModal && student && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 w-3/4 h-3/4 text-black rounded-lg overflow-auto p-6">
                        <form onSubmit={SubmitAccept} className='border border-white gap-1 h-full' >
                            <div className='grid grid-cols-4     mt-10 text-xl w-auto p-4'>
                                <div className='uppercase font-bold'>
                                    {studentData.registerNo}
                                </div>
                                <div className='uppercase font-bold'>
                                    {studentData.name}
                                </div>
                                <div className='uppercase font-bold'>
                                    {studentData.dept}
                                </div>
                                <div className='uppercase font-bold'>
                                    <label className="block mb-1"></label>{studentData.specialCategory}
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

            {showAcceptModal && student && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="bg-white w-[90%] max-w-6xl max-h-[90vh] rounded-2xl overflow-y-auto shadow-2xl p-8">
                        <form onSubmit={acceptSubmit} className="space-y-10">
                            {/* Header Info */}
                            <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <Field label="Register No. :" value={studentData.registerNo} />
                                    <Field label="Name :" value={studentData.name} />
                                    <Field label="Department :" value={studentData.dept} />
                                    <Field label="Special Category :" value={studentData.specialCategory || "—"} />
                                </div>
                            </div>
                            {/* Zakkath */}
                            {/* <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="zakkath"
                                    checked={zakkath}
                                    onChange={(e) => setZakkath(e.target.checked)}
                                    className="w-5 h-5 accent-green-600"
                                />
                                <label htmlFor="zakkath" className="ml-3 text-md font-medium text-gray-700">
                                    Mark as Zakkath Scholarship
                                </label>
                            </div> */}
                            {/* Scholarship Input Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">Scholarship Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        value={scholamt}
                                        onChange={(e) => setScholamt(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">Scholarship Type</label>
                                    <select
                                        value={scholtype}
                                        onChange={(e) => setScholType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select</option>
                                        {scholtypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-3">Donor</label>
                                <select
                                    value={scholdonar}
                                    onChange={(e) => setScholdonar(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Donor</option>
                                    {Array.isArray(filteredDonars) &&
                                        filteredDonars
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((donar) => (
                                                <option key={donar._id} value={donar._id}> {donar.name} </option>
                                            ))}
                                </select>
                            </div>
                            {/* Confirm Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={ScholSubmit}
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                            {/* Submitted Scholarships List */}
                            {submittedData.length > 0 && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Submitted Scholarships</h3>
                                    <div className="space-y-3">
                                        {submittedData.map((submission, index) => (
                                            <div key={index} className="grid grid-cols-4 text-md text-gray-700 gap-4 items-center bg-white rounded-md px-4 py-2 border">
                                                <div>{index + 1}.</div>
                                                <div className="font-semibold">{submission.scholtype}</div>
                                                <div>{donars.find(d => d._id === submission.scholdonar)?.name || 'Unknown Donor'}</div>
                                                <div className="text-right font-medium">{formatCurrency(submission.scholamt)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                                {/* Negative Donars */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="allDonars"
                                        checked={allDonars}
                                        onChange={(e) => setAllDonars(e.target.checked)}
                                        className="w-5 h-5 accent-green-600"
                                    />
                                    <label htmlFor="zakkath" className="ml-3 text-md font-medium text-gray-700">
                                        Allow Negative Values
                                    </label>
                                </div>
                                <div className='space-x-4 flex flex-end'>
                                    <button
                                        type="submit"
                                        disabled={!isSubmitEnabled}
                                        className={`px-6 py-2 rounded-lg font-semibold transition ${isSubmitEnabled
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-green-400 text-white opacity-70 cursor-not-allowed"}`}
                                    >
                                        Final Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}





        </div >
    )
}



const Field = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="space-y-2">
            <p className="text-md font-medium text-gray-500">{label}</p>
            <p className="text-base font-semibold text-gray-800">{value}</p>
        </div>
    )
}

const Section = ({ title, children }) => (
    <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
        {children}
    </section>
)

const Grid = ({ cols = 3, children }) => (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
        {children}
    </div>
)

export default Status;