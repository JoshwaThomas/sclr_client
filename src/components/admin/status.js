import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Status() {
    const [registerNo, setRegisterNo] = useState('');
    const [name, setName] = useState()
    const [fresherOrRenewal, setFresherOrRenewal] = useState()
    const [ugOrPg, setUgOrPg] = useState()
    const [semester, setSemester] = useState()
    const [dept, setDept] = useState()
    const [section, setSection] = useState()
    const [religion, setReligion] = useState()
    const [procategory, setProcategory] = useState()
    const [specialCategory, setSpecialCategory] = useState()
    const [hostel, setHostel] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [fatherName, setFatherName] = useState()
    const [fatherNo, setFatherNo] = useState()
    const [fatherOccupation, setFatherOccupation] = useState()
    const [annualIncome, setAnnualIncome] = useState()
    const [siblings, setSiblings] = useState()
    const [deeniyathPer, setDeeniyathPer] = useState()
    const [classAttendancePer, setClassAttendancePer] = useState()
    const [preSemester, setPreSemester] = useState()
    const [semPercentage, setSemPercentage] = useState()
    const [address, setAddress] = useState()
    const [state, setState] = useState()
    const [district, setDistrict] = useState()
    const [pin, setPin] = useState()
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [scholamt, setScholamt] = useState('');
    const [scholdonar, setScholdonar] = useState('');
    const [donars, setDonars] = useState([]);
    const [scholtypes, setScholtypes] = useState([]);
    const [scholtype, setScholType] = useState('');
    const [submittedData, setSubmittedData] = useState([]);

    const Submit = async (e) => {
        e.preventDefault();
        if (!registerNo) {
            alert('Please fill in the Register No');
            return;
        }

        try {
            const result = await axios.get(`http://localhost:3001/api/admin/status/${registerNo}`);
            if (result.data.status === 'not exist') {
                alert('Student Not Found');
                setStudent(null);
            } else {
                setStudent(result.data);
                setName(result.data.name);
                setFresherOrRenewal(result.data.fresherOrRenewal);
                setProcategory(result.data.procategory);
                setUgOrPg(result.data.ugOrPg);
                setSection(result.data.section);
                setSemester(result.data.semester);
                setDept(result.data.dept);
                setHostel(result.data.hostel);
                setMobileNo(result.data.mobileNo);
                setFatherName(result.data.fatherName);
                setFatherNo(result.data.fatherNo);
                setSpecialCategory(result.data.specialCategory);
                setReligion(result.data.religion);
                setFatherOccupation(result.data.fatherOccupation);
                setAnnualIncome(result.data.annualIncome);
                setSiblings(result.data.siblings);
                setPreSemester(result.data.preSemester);
                setSemPercentage(result.data.semPercentage);
                setDeeniyathPer(result.data.deeniyathPer);
                setClassAttendancePer(result.data.classAttendancePer);
                setAddress(result.data.address)
                setState(result.data.state)
                setDistrict(result.data.district)
                setPin(result.data.pin)
                setShowModal(true);
            }
        } catch (err) {
            alert('An error occurred while fetching the student data');
            setStudent(null);
        }
    };

    const handleModifyClick = async (e) => {
        e.preventDefault();
        if (!registerNo) {
            alert('Please fill in the Register No');
            return;
        }

        try {
            const result = await axios.get(`http://localhost:3001/api/admin/status/${registerNo}`);
            if (result.data.status === 'not exist') {
                alert('Student Not Found');
                setStudent(null);
                
            }
            else {
                setStudent(result.data);
                setName(result.data.name);
                setFresherOrRenewal(result.data.fresherOrRenewal);
                setProcategory(result.data.procategory);
                setUgOrPg(result.data.ugOrPg);
                setSection(result.data.section);
                setSemester(result.data.semester);
                setDept(result.data.dept);
                setHostel(result.data.hostel);
                setMobileNo(result.data.mobileNo);
                setFatherName(result.data.fatherName);
                setFatherNo(result.data.fatherNo);
                setSpecialCategory(result.data.specialCategory);
                setReligion(result.data.religion);
                setFatherOccupation(result.data.fatherOccupation);
                setAnnualIncome(result.data.annualIncome);
                setSiblings(result.data.siblings);
                setPreSemester(result.data.preSemester);
                setSemPercentage(result.data.semPercentage);
                setDeeniyathPer(result.data.deeniyathPer);
                setClassAttendancePer(result.data.classAttendancePer);
                setAddress(result.data.address)
                setState(result.data.state)
                setDistrict(result.data.district)
                setPin(result.data.pin)
                setShowModifyModal(true); // Show modify modal when student data is fetched
            }
        } catch (err) {
            alert('An error occurred while fetching the student data');
            setStudent(null);
        }
    };

    const SubmitModify = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/admin/student/update', {
                fresherOrRenewal, ugOrPg, semester, name, registerNo, dept, section,
                religion, procategory, specialCategory, hostel, mobileNo, fatherName, fatherNo,
                fatherOccupation, annualIncome, siblings, deeniyathPer, classAttendancePer, preSemester, semPercentage
            });
            setShowModifyModal(false);
            window.alert("Details modified successfully.");
        } catch (err) {
            console.log(err);
            window.alert("Failed to modify details.");
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setStudent({ ...student, [name]: value });
    // };


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
    const closeModifyModal = () => {
        setShowModifyModal(false);
    };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form className="space-y-4">
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
                            type="button"
                            onClick={Submit}
                            className="px-4 py-2 bg-blue-500 text-white rounded mt-10"
                        >
                            Check Status
                        </button>
                        <button
                            type="button"
                            onClick={handleModifyClick}
                            className="px-4 py-2 bg-green-500 text-white rounded mt-10 ml-3"
                        >
                            Modify
                        </button>

                    </div>
                </form>
                {showModal && student && (
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
                                                {/* <button
                                                    className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
                                                    onClick={() => handleViewClick(student)}
                                                >
                                                    Modify
                                                </button> */}
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
                {showModifyModal && (

                    <div className="fixed inset-0  flex items-center justify-center  bg-black bg-opacity-50">
                        <div className="bg-white w-3/4 h-3/4 rounded-lg overflow-auto p-6">
                            <form onSubmit={SubmitModify} className="space-y-4">
                                <div >
                                    {/* fresher form data retrive */}

                                    <div>
                                        <div className=' '>
                                            <div>

                                                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                                                <div className=''>
                                                    <div className="space-x-4 inline-flex border p-10 rounded-xl">
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                id="Fresher"
                                                                name="fresherOrRenewal"
                                                                value="Fresher"
                                                                className=' scale-200'
                                                                checked={fresherOrRenewal === 'Fresher'}
                                                                onChange={(e) => setFresherOrRenewal(e.target.value)}
                                                                required
                                                                disabled
                                                            />
                                                            <label htmlFor="Fresher" className=' form-radio ml-2 text-xl'>Fresher</label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                id="Renewal"
                                                                name="fresherOrRenewal"
                                                                value="Renewal"
                                                                className=' scale-200'
                                                                checked={fresherOrRenewal === 'Renewal'}
                                                                onChange={(e) => setFresherOrRenewal(e.target.value)}
                                                                required
                                                                disabled
                                                            />
                                                            <label htmlFor="Renewal" className=' form-radio ml-2 text-xl'>Renewal</label>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>
                                        <div className="grid grid-cols-3 md:grid-cols-2 gap-4 border p-10 rounded-xl">

                                            <div>
                                                <label className="block mb-1">UG or PG:</label>
                                                <div className=" space-x-7 inline-flex">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="Ug"
                                                            name="ugOrPg"
                                                            value="UG"
                                                            className=' scale-200'
                                                            checked={ugOrPg === 'UG'}
                                                            onChange={(e) => setUgOrPg(e.target.value)}
                                                            required
                                                            disabled
                                                        />
                                                        <label htmlFor="UG" className=' form-radio ml-2 text-lg'> UG</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="Pg"
                                                            name="ugOrPg"
                                                            value="PG"
                                                            className=' scale-200'
                                                            checked={ugOrPg === 'PG'}
                                                            onChange={(e) => setUgOrPg(e.target.value)}
                                                            required
                                                            disabled
                                                        />
                                                        <label htmlFor="PG" className=' form-radio ml-2 text-lg'> PG</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Programme Category</label>
                                                <div className="space-x-4 inline-flex">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="aided"
                                                            name="procategory"
                                                            value="Aided"
                                                            className=' scale-200'
                                                            checked={procategory === 'Aided'}
                                                            onChange={(e) => setProcategory(e.target.value)}
                                                            required
                                                            disabled
                                                        />
                                                        <label htmlFor="Aided" className=' form-radio ml-2 text-lg'> Aided</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="sfmens"
                                                            name="procategory"
                                                            value="SFM"
                                                            className=' scale-200'
                                                            checked={procategory === 'SFM'}
                                                            onChange={(e) => setProcategory(e.target.value)}
                                                            required
                                                            disabled
                                                        />
                                                        <label htmlFor="SFM" className=' form-radio ml-2 text-lg'> SFM</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="sfwomens"
                                                            name="procategory"
                                                            value="SFW"
                                                            className=' scale-200'
                                                            checked={procategory === 'SFW'}
                                                            onChange={(e) => setProcategory(e.target.value)}
                                                            required
                                                            disabled
                                                        />
                                                        <label htmlFor="SFW" className=' form-radio ml-2 text-lg'> SFW </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Semester:</label>
                                                <div className="space-x-4 inline-flex">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="ISemester"
                                                            name="semester"
                                                            value="I "
                                                            className=' scale-200'
                                                            checked={semester === 'I '}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="I " className=' form-radio ml-2 text-lg'> I </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="IISemester"
                                                            name="semester"
                                                            value="II"
                                                            className=' scale-200'
                                                            checked={semester === 'II'}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="II" className=' form-radio ml-2 text-lg'> II </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="IIISemester"
                                                            name="semester"
                                                            value="III "
                                                            className=' scale-200'
                                                            checked={semester === 'III '}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="III Semester" className=' form-radio ml-2 text-lg'> III </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="IVSemester"
                                                            name="semester"
                                                            value="IV "
                                                            className=' scale-200'
                                                            checked={semester === 'IV '}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="IV " className=' form-radio ml-2 text-lg'> IV </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="VSemester"
                                                            name="semester"
                                                            value="V "
                                                            className=' scale-200'
                                                            checked={semester === 'V '}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="V " className=' form-radio ml-2 text-lg'> V </label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="VIsemester"
                                                            name="semester"
                                                            value="VI "
                                                            className=' scale-200'
                                                            checked={semester === 'VI '}
                                                            onChange={(e) => setSemester(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="VI " className=' form-radio ml-2 text-lg'> VI </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Hostel:</label>
                                                <div className="space-x-4 inline-flex">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="hostelYes"
                                                            name="hostel"
                                                            value="yes"
                                                            className=' scale-200'
                                                            checked={hostel === 'yes'}
                                                            onChange={(e) => setHostel(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="hostelYes" className=' form-radio ml-2 text-lg'> Yes</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            id="hostelNo"
                                                            name="hostel"
                                                            value="no"
                                                            className=' scale-200'
                                                            checked={hostel === 'no'}
                                                            onChange={(e) => setHostel(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="hostelNo" className=' form-radio ml-2 text-lg'> No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">


                                            <div>
                                                <label className="block mb-1">Register No.:</label>
                                                <input
                                                    type="text"
                                                    name="registerNo"
                                                    value={registerNo}
                                                    onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                                                    className=" w-48 md:w-72 p-2 border rounded-md text-slate-950"
                                                    required
                                                    disabled
                                                />
                                            </div>

                                            {/* <label className="block mb-1">Name:</label> */}
                                            <div>
                                                <label className="block mb-1"> Name:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value.toUpperCase())}
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </div>

                                            <div>
                                                <label className="block mb-1">Department:</label>
                                                <select
                                                    name="dept"
                                                    value={dept}
                                                    onChange={(e) => setDept(e.target.value)}
                                                    className="w-48 md:w-72 p-2 border  rounded-md text-slate-950"
                                                    required
                                                    disabled
                                                    readOnly
                                                >
                                                    <option value="">Select</option>
                                                    <option value="UAR">UAR</option>
                                                    <option value="UBA">UBA</option>
                                                    <option value="UBO">UBO</option>
                                                    <option value="UBT">UBT</option>
                                                    <option value="UCO">UCO</option>
                                                    <option value="UCH">UCH</option>
                                                    <option value="UCA">UCA</option>
                                                    <option value="UCS">UCS</option>
                                                    <option value="UEC">UEC</option>
                                                    <option value="UEN">UEN</option>
                                                    <option value="UFT">UFT</option>
                                                    <option value="UHS">UHS</option>
                                                    <option value="UHM">UHM</option>
                                                    <option value="UIT">UIT</option>
                                                    <option value="UMA">UMA</option>
                                                    <option value="UMB">UMB</option>
                                                    <option value="UND">UND</option>
                                                    <option value="UPH">UPH</option>
                                                    <option value="UTA">UTA</option>
                                                    <option value="UVC">UVC</option>
                                                    <option value="UZO">UZO</option>
                                                    <option value="PAR">PAR</option>
                                                    <option value="PBO">PBO</option>
                                                    <option value="PBT">PBT</option>
                                                    <option value="PCO">PCO</option>
                                                    <option value="PCH">PCH</option>
                                                    <option value="PCS">PCS</option>
                                                    <option value="PEC">PEC</option>
                                                    <option value="PEN">PEN</option>
                                                    <option value="PFT">PFT</option>
                                                    <option value="PHS">PHS</option>
                                                    <option value="PIT">PIT</option>
                                                    <option value="PMA">PMA</option>
                                                    <option value="PMB">PMB</option>
                                                    <option value="PND">PND</option>
                                                    <option value="PPH">PPH</option>
                                                    <option value="PTA">PTA</option>
                                                    <option value="PZO">PZO</option>
                                                    <option value="MBA">MBA</option>
                                                    <option value="MCA">MCA</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Section</label>
                                                <select
                                                    name="specialCategory"
                                                    value={section}
                                                    onChange={(e) => setSection(e.target.value)}
                                                    className=" w-48 md:w-72 p-2 border rounded-md text-slate-950"

                                                >
                                                    <option value="">Select</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="D">D</option>
                                                    <option value="E">E</option>
                                                    <option value="F">F</option>
                                                    <option value="G">G</option>
                                                    <option value="H">H</option>
                                                    <option value="I">I</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block mb-1">Special Category:</label>
                                                <select
                                                    name="specialCategory"
                                                    value={specialCategory}
                                                    onChange={(e) => setSpecialCategory(e.target.value)}
                                                    className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option value="none">None</option>
                                                    <option value="Muaddin">Mu-addin</option>
                                                    <option value="Hazrath">Hazrath</option>
                                                    <option value="FatherMotherSeparated">Father & Mother Separated</option>
                                                    <option value="FatherExpired">Father Expired</option>
                                                    <option value="Singleparent">Single Parent</option>
                                                    <option value="Orphan">Orphan</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Religion:</label>
                                                <select
                                                    name="religion"
                                                    value={religion}
                                                    onChange={(e) => setReligion(e.target.value)}
                                                    className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"

                                                >
                                                    <option value="">Select</option>
                                                    <option value="ISLAM">Islam</option>
                                                    <option value="HINDU">Hindu</option>
                                                    <option value="CHRISTIAN">Christian</option>
                                                    <option value="OTHERS">Others</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-1">Mobile No.:</label>
                                                <input
                                                    type="text"
                                                    maxlength="10"
                                                    name="mobileNo"
                                                    value={mobileNo}
                                                    onChange={(e) => setMobileNo(e.target.value)}
                                                    className="w-48  md:w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 ">Father's or Mother's Name:</label>
                                                <input
                                                    type="text"
                                                    name="fatherName"
                                                    value={fatherName}
                                                    onChange={(e) => setFatherName(e.target.value.toUpperCase())}
                                                    className=" w-48  md:w-44 p-2  border rounded-md text-slate-950"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 ">Father's or Mother's Contact No.:</label>
                                                <input
                                                    type="text"
                                                    name="fatherNo"
                                                    maxlength="10"
                                                    value={fatherNo}
                                                    onChange={(e) => setFatherNo(e.target.value)}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1">Father's or Mother's Occupation:</label>
                                                <input
                                                    type="text"
                                                    name="fatherOccupation"
                                                    value={fatherOccupation}
                                                    onChange={(e) => setFatherOccupation(e.target.value.toUpperCase())}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1">Annual Income:</label>
                                                <input
                                                    type="text"
                                                    name="annualIncome"
                                                    value={annualIncome}
                                                    onChange={(e) => setAnnualIncome(e.target.value)}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"

                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 ">Siblings</label>
                                                <input
                                                    type="text"
                                                    name="siblings"
                                                    value={siblings}
                                                    onChange={(e) => setSiblings(e.target.value)}
                                                    className="w-48 md:w-44 p-2 border rounded-md text-slate-950"

                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
                                            <div>
                                                <label className="block mb-1 mt-3">Permanent Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value.toUpperCase())}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                                                    placeholder='Door No & Street'

                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 mt-3">State:</label>
                                                <select
                                                    name="state"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"

                                                >
                                                    <option value="">Select State</option>
                                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                    <option value="Assam">Assam</option>
                                                    <option value="Bihar">Bihar</option>
                                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                                    <option value="Goa">Goa</option>
                                                    <option value="Gujarat">Gujarat</option>
                                                    <option value="Haryana">Haryana</option>
                                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                    <option value="Jharkhand">Jharkhand</option>
                                                    <option value="Karnataka">Karnataka</option>
                                                    <option value="Kerala">Kerala</option>
                                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                    <option value="Maharashtra">Maharashtra</option>
                                                    <option value="Manipur">Manipur</option>
                                                    <option value="Meghalaya">Meghalaya</option>
                                                    <option value="Mizoram">Mizoram</option>
                                                    <option value="Nagaland">Nagaland</option>
                                                    <option value="Odisha">Odisha</option>
                                                    <option value="Punjab">Punjab</option>
                                                    <option value="Rajasthan">Rajasthan</option>
                                                    <option value="Sikkim">Sikkim</option>
                                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                                    <option value="Telangana">Telangana</option>
                                                    <option value="Tripura">Tripura</option>
                                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                    <option value="Uttarakhand">Uttarakhand</option>
                                                    <option value="West Bengal">West Bengal</option>
                                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                    <option value="Chandigarh">Chandigarh</option>
                                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                                    <option value="Delhi">Delhi</option>
                                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                    <option value="Ladakh">Ladakh</option>
                                                    <option value="Lakshadweep">Lakshadweep</option>
                                                    <option value="Puducherry">Puducherry</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-1 mt-3">District:</label>
                                                <select
                                                    name="district"
                                                    value={district}
                                                    onChange={(e) => setDistrict(e.target.value)}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"

                                                >
                                                    <option value="">Select District</option>
                                                    <option value="Ariyalur">Ariyalur</option>
                                                    <option value="Chengalpattu">Chengalpattu</option>
                                                    <option value="Chennai">Chennai</option>
                                                    <option value="Coimbatore">Coimbatore</option>
                                                    <option value="Cuddalore">Cuddalore</option>
                                                    <option value="Dharmapuri">Dharmapuri</option>
                                                    <option value="Dindigul">Dindigul</option>
                                                    <option value="Erode">Erode</option>
                                                    <option value="Kallakurichi">Kallakurichi</option>
                                                    <option value="Kanchipuram">Kanchipuram</option>
                                                    <option value="Kanyakumari">Kanyakumari</option>
                                                    <option value="Karur">Karur</option>
                                                    <option value="Krishnagiri">Krishnagiri</option>
                                                    <option value="Madurai">Madurai</option>
                                                    <option value="Nagapattinam">Nagapattinam</option>
                                                    <option value="Namakkal">Namakkal</option>
                                                    <option value="Nilgiris">Nilgiris</option>
                                                    <option value="Perambalur">Perambalur</option>
                                                    <option value="Pudukkottai">Pudukkottai</option>
                                                    <option value="Ramanathapuram">Ramanathapuram</option>
                                                    <option value="Ranipet">Ranipet</option>
                                                    <option value="Salem">Salem</option>
                                                    <option value="Sivaganga">Sivaganga</option>
                                                    <option value="Tenkasi">Tenkasi</option>
                                                    <option value="Thanjavur">Thanjavur</option>
                                                    <option value="Theni">Theni</option>
                                                    <option value="Thoothukudi">Thoothukudi</option>
                                                    <option value="Tiruchirappalli">Tiruchirappalli</option>
                                                    <option value="Tirunelveli">Tirunelveli</option>
                                                    <option value="Tirupathur">Tirupathur</option>
                                                    <option value="Tiruppur">Tiruppur</option>
                                                    <option value="Tiruvallur">Tiruvallur</option>
                                                    <option value="Tiruvannamalai">Tiruvannamalai</option>
                                                    <option value="Tiruvarur">Tiruvarur</option>
                                                    <option value="Vellore">Vellore</option>
                                                    <option value="Viluppuram">Viluppuram</option>
                                                    <option value="Virudhunagar">Virudhunagar</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block mb-1 mt-3">Pincode:</label>
                                                <input
                                                    type="text"
                                                    maxlength="6"
                                                    name="pin"
                                                    value={pin}
                                                    onChange={(e) => setPin(e.target.value)}
                                                    className="w-48  md:w-44 p-2 border rounded-md text-slate-950"
                                                    placeholder='Pincode'

                                                />

                                            </div>
                                        </div>


                                    </div>
                                    {/* Education Details section */}
                                    <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                                    <div>
                                        <div className="overflow-x-auto">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
                                                <div>
                                                    <label className="block mb-1">Semester:</label>
                                                    <input
                                                        type="text"
                                                        name="preSemester"
                                                        value={preSemester}
                                                        onChange={(e) => setPreSemester(e.target.value.toUpperCase())}
                                                        className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Percentage of Mark:</label>
                                                    <input
                                                        type="text"
                                                        name="semPercentage"
                                                        value={semPercentage}
                                                        onChange={(e) => setSemPercentage(e.target.value)}
                                                        className=" w-48  md:w-52 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Class Attendance Percentage:</label>
                                                    <input
                                                        type="text"
                                                        name="classAttendancePer"
                                                        value={classAttendancePer}
                                                        onChange={(e) => setClassAttendancePer(e.target.value)}
                                                        className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Deeniyath Percentage:</label>
                                                    <input
                                                        type="text"
                                                        name="deeniyathPer"
                                                        value={deeniyathPer}
                                                        onChange={(e) => setDeeniyathPer(e.target.value)}
                                                        className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                {/* renewal form data retrive */}
                                <div className=' ml-96 px-2 py-2'>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded-md "
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 ml-2 rounded-md"
                                        onClick={closeModifyModal}
                                    >
                                        Close
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* {
                    showModifyModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-gray-300 p-8 rounded-lg">
                                <form onSubmit={SubmitModify} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value.toUpperCase())}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dept" className="block">Department</label>
                                        <input
                                            type="text"
                                            id="dept"
                                            name="dept"
                                            value={student.dept || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mobileNo" className="block">Mobile No.</label>
                                        <input
                                            type="text"
                                            id="mobileNo"
                                            name="mobileNo"
                                            value={student.mobileNo || ''}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                                        onClick={closeModifyModal}
                                    >
                                        Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                } */}
            </div >
        </div >
    );
}

export default Status;