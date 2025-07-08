import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoAlert } from "react-icons/go";

function Status() {

    const navigate = useNavigate();
    const [registerNo, setRegisterNo] = useState('');
    const [name, setName] = useState()
    const [fresherOrRenewal, setFresherOrRenewal] = useState()
    const [scholarship, setScholarship] = useState()
    const [ugOrPg, setUgOrPg] = useState()
    const [semester, setSemester] = useState()
    const [dept, setDept] = useState()
    const [section, setSection] = useState()
    const [religion, setReligion] = useState()
    const [procategory, setProcategory] = useState()
    const [specialCategory, setSpecialCategory] = useState()
    const [hostel, setHostel] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [aadhar, setAadhar] = useState()
    const [fatherName, setFatherName] = useState()
    const [fatherNo, setFatherNo] = useState()
    const [fatherOccupation, setFatherOccupation] = useState()
    const [annualIncome, setAnnualIncome] = useState()
    const [siblings, setSiblings] = useState()
    const [siblingsNo, setSiblingsNo] = useState()
    const [siblingsOccupation, setSiblingsOccupation] = useState()
    const [siblingsIncome, setSiblingsIncome] = useState()
    const [schoolName, setSchoolName] = useState()
    const [yearOfPassing, setYearOfPassing] = useState()
    const [percentageOfMarkSchool, setPercentageOfMarkSchool] = useState()
    const [deeniyathPer, setDeeniyathPer] = useState()
    const [classAttendancePer, setClassAttendancePer] = useState()
    const [classAttendanceRem, setClassAttendanceRem] = useState()
    const [deeniyathRem, setDeeniyathRem] = useState()
    const [semRem, setSemRem] = useState()
    const [preSemester, setPreSemester] = useState()
    const [semPercentage, setSemPercentage] = useState()
    const [address, setAddress] = useState()
    const [state, setState] = useState()
    const [district, setDistrict] = useState()
    const [pin, setPin] = useState()
    const [jamath, setJamath] = useState()
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [deleteCon, setDeleteCon] = useState(false);
    const [scholamt, setScholamt] = useState('');
    const [scholdonar, setScholdonar] = useState('');
    const [donars, setDonars] = useState([]);
    const [scholtypes, setScholtypes] = useState([]);
    const [scholtype, setScholType] = useState('');
    const [submittedData, setSubmittedData] = useState([]);
    const [filteredDonars, setFilteredDonars] = useState([]);
    const [zakkath, setZakkath] = useState(false);
    const [fileName, setFileName] = useState("");
    const [password, setPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [notification, setNotification] = useState({ message: '', type: '' });


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
        if (!registerNo) { alert('Register No should not be empty'); return }

        try {
            const result = await axios.get(`${apiUrl}/api/admin/status/${registerNo}`);
            if (result.data.status === 'not exist') {
                showNotification('Student Not Found', 'error');
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
                setClassAttendanceRem(result.data.classAttendanceRem);
                setDeeniyathRem(result.data.deeniyathRem);
                setSemRem(result.data.semRem);
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

    // Modify Button Click
    const handleModifyClick = async (e) => {
        e.preventDefault();
        if (!registerNo) { alert('Register number should not be empty'); return }

        try {
            const result = await axios.get(`${apiUrl}/api/admin/status/${registerNo}`);
            if (result.data.status === 'not exist') {
                showNotification('Student Not Found', 'error');
                setStudent(null);

            }
            else {
                setStudent(result.data);
                setName(result.data.name);
                setFresherOrRenewal(result.data.fresherOrRenewal);
                setScholarship(result.data.scholarship)
                setProcategory(result.data.procategory);
                setUgOrPg(result.data.ugOrPg);
                setSection(result.data.section);
                setSemester(result.data.semester);
                setDept(result.data.dept);
                setHostel(result.data.hostel);
                setMobileNo(result.data.mobileNo);
                setAadhar(result.data.aadhar);
                setFatherName(result.data.fatherName);
                setFatherNo(result.data.fatherNo);
                setSpecialCategory(result.data.specialCategory);
                setReligion(result.data.religion);
                setFatherOccupation(result.data.fatherOccupation);
                setAnnualIncome(result.data.annualIncome);
                setSiblings(result.data.siblings);
                setSiblingsNo(result.data.siblingsNo);
                setSiblingsOccupation(result.data.siblingsOccupation);
                setSiblingsIncome(result.data.siblingsIncome);
                setPreSemester(result.data.preSemester);
                setSemPercentage(result.data.semPercentage);
                setDeeniyathPer(result.data.deeniyathPer);
                setClassAttendancePer(result.data.classAttendancePer);
                setClassAttendanceRem(result.data.classAttendanceRem);
                setDeeniyathRem(result.data.deeniyathRem);
                setSemRem(result.data.semRem);
                setAddress(result.data.address)
                setState(result.data.state)
                setDistrict(result.data.district)
                setPin(result.data.pin)
                setPassword(result.data.password)
                setJamath(result.data.jamath)
                setShowModifyModal(true);
                console.log(deeniyathPer, classAttendancePer, semPercentage, preSemester, 'sh', result.data.scholarship, result.data.hostel)
            }
        } catch (err) {
            alert('An error occurred while fetching the student data');
            setStudent(null);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the file is a JPEG
            if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                // Check if the file size is between 30 KB and 50 KB
                const fileSizeInKB = file.size / 1024;
                if (fileSizeInKB >= 30 && fileSizeInKB <= 100) {
                    setJamath(file);
                    setFileName(file.name);
                } else {
                    showNotification("File size must be between 30KB and 200KB.", "error");
                }
            } else {
                showNotification("Please upload a JPEG/JPG/PNG file.", "error");
            }
        }
    };

    const SubmitModify = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ugOrPg", ugOrPg);
        formData.append("semester", semester);
        formData.append("name", name);
        formData.append("registerNo", registerNo);
        formData.append("dept", dept);
        formData.append("section", section);
        formData.append("religion", religion);
        formData.append("procategory", procategory);
        formData.append("address", address);
        formData.append("district", district);
        formData.append("state", state);
        formData.append("pin", pin);
        formData.append("specialCategory", specialCategory);
        formData.append("aadhar", aadhar);
        formData.append("hostel", hostel);
        formData.append("mobileNo", mobileNo);
        formData.append("fatherName", fatherName);
        formData.append("fatherNo", fatherNo);
        formData.append("fatherOccupation", fatherOccupation);
        formData.append("annualIncome", annualIncome);
        formData.append("siblings", siblings)
        formData.append("siblingsNo", siblingsNo);
        formData.append("siblingsOccupation", siblingsOccupation);
        formData.append("siblingsIncome", siblingsIncome);
        formData.append("scholarship", scholarship);
        formData.append("schoolName", schoolName);
        formData.append("yearOfPassing", yearOfPassing);
        formData.append("percentageOfMarkSchool", percentageOfMarkSchool);
        formData.append("classAttendancePer", classAttendancePer);
        formData.append("classAttendanceRem", classAttendanceRem);
        formData.append("deeniyathPer", deeniyathPer);
        formData.append("deeniyathRem", deeniyathRem);
        formData.append("semPercentage", semPercentage);
        formData.append("semRem", semRem);
        formData.append("jamath", jamath);
        formData.append("password", password);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        try {
            const result = await axios.post(`${apiUrl}/api/admin/student/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setShowModifyModal(false);
            if (result.data.success) {
                showNotification("Application Updated Successfully", "success");
                // window.alert("Your Application Submitted Successfully");
                console.log(result)
            } else if (result.data.message === "Register No. Already Existing") {
                // alert("Register No. Already Existing");
                showNotification("Register No. Already Existing", "error");
            } else {
                // alert("Something went wrong");
                showNotification("Check Your Details and Fill Properly", "error");
            }
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


    // useEffect(() => {
    //     if (showAcceptModal) {
    //         fetchDonars();
    //         fetchScholtypes();
    //     }
    // }, [showAcceptModal]);

    const ScholSubmit = (e) => {
        e.preventDefault();
        axios.get(`${apiUrl}/api/admin/current-acyear`)
            .then(response => {
                if (response.data.success) {
                    const acyear = response.data.acyear.acyear;

                    const balanceField = zakkath ? 'zakkathbal' : 'balance';

                    // Check the donor details and balance amount before saving to freshamt
                    axios.put(`${apiUrl}/api/admin/donar/${scholdonar}`, {
                        amount: scholamt,
                        balanceField: balanceField
                    })
                        .then(result => {
                            console.log(result);
                            const updatedBalance = result.data.updatedBalance;
                            window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

                            return axios.post(`${apiUrl}/api/admin/freshamt`, {
                                fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt, acyear
                            });
                        })
                        .then(result => {
                            const newSubmission = { scholtype, scholdonar, scholamt };
                            setSubmittedData(prevData => [...prevData, newSubmission]);
                            refreshInputs();

                            console.log(result);

                        })

                        .catch(err => {
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

                        });
                }
                else {
                    console.error('Failed to fetch current academic year');
                    window.alert('Failed to fetch current academic year');
                }
            })
            .catch(error => {
                console.error('Error fetching current academic year:', error);
                window.alert('Error fetching current academic year');
            });
    };

    const refreshInputs = () => {
        setScholamt('');
        setScholdonar('');
        setScholType('');
    };

    const SubmitAccept = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/api/admin/action`, { registerNo: student.registerNo });
            window.location.reload();
        } catch (err) {
            console.log(err);
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
        setDeleteCon(false);
    };
    const handleDelete = () => {
        setDeleteCon(true);
    }
    const handleConDelete = async (e) => {
        e.preventDefault();
        try {
            console.log("Delete", registerNo)
            // rejectdata.js backend file
            const res = await axios.delete(`${apiUrl}/api/admin/delete/${registerNo}`,)
            if (res) {
                showNotification("Data Deleted Successfully", "error");
                setShowModifyModal(false);
                setDeleteCon(false)
            }
        } catch (err) {
            console.log(err);
        }

    }

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
                                type="text"
                                id="registerNo"
                                name="registerNo"
                                value={registerNo}
                                onChange={(e) => setRegisterNo(e.target.value.toUpperCase())}
                                className="w-full p-2 border border-gray-400 rounded-md text-gray-900 uppercase focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[50%]">
                    <button
                        type="button"
                        onClick={Submit}
                        className="w-[30%] py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded shadow"
                    >
                        Check Status
                    </button>
                    <button
                        type="button"
                        onClick={handleModifyClick}
                        className="w-[30%] py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded shadow"
                    >
                        Modify
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/freshstudent/application/fresh')}
                        className="w-[30%] py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow"
                    >
                        New Application
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
                    <div className="bg-red-400 w-3/4 h-3/4 text-black rounded-lg overflow-auto p-6">
                        <form onSubmit={SubmitAccept} className='border border-white gap-1 h-full' >
                            <div className='grid grid-cols-4     mt-10 text-xl w-auto p-4'>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Register No.:</label> */}
                                    {student.registerNo}
                                </div>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Name:</label> */}
                                    {student.name}
                                </div>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Department:</label> */}
                                    {student.dept}
                                </div>
                                {/* <div className='uppercase mt-3'>
                                        <label className="block mb-1">Amount: {student.totalScholamt}</label>
                                    </div> */}
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
            }
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
                                    <div className="grid grid-cols-3 md:grid-cols-3 gap-4 border p-10 rounded-xl">

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

                                                    />
                                                    <label htmlFor="SFW" className=' form-radio ml-2 text-lg'> SFW </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Applied for any other scholarships:</label>
                                            <div className="space-x-4 inline-flex">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="sYes"
                                                        name="schol"
                                                        value="Yes"
                                                        className=' scale-200'
                                                        checked={scholarship === "Yes"}
                                                        onChange={(e) => setScholarship(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="sYes" className=' form-radio ml-2 text-lg'> Yes</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="sNo"
                                                        name="schol"
                                                        value="No"
                                                        className=' scale-200'
                                                        checked={scholarship === "No"}
                                                        onChange={(e) => setScholarship(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="sNo" className=' form-radio ml-2 text-lg'> No</label>
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
                                                        value="I"
                                                        className=' scale-200'
                                                        checked={semester === 'I'}
                                                        onChange={(e) => setSemester(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="I" className=' form-radio ml-2 text-lg'> I </label>
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
                                                        value="III"
                                                        className=' scale-200'
                                                        checked={semester === 'III'}
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
                                                        value="IV"
                                                        className=' scale-200'
                                                        checked={semester === 'IV'}
                                                        onChange={(e) => setSemester(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="IV" className=' form-radio ml-2 text-lg'> IV </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="VSemester"
                                                        name="semester"
                                                        value="V"
                                                        className=' scale-200'
                                                        checked={semester === 'V'}
                                                        onChange={(e) => setSemester(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="V" className=' form-radio ml-2 text-lg'> V </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="VIsemester"
                                                        name="semester"
                                                        value="VI"
                                                        className=' scale-200'
                                                        checked={semester === 'VI'}
                                                        onChange={(e) => setSemester(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="VI" className=' form-radio ml-2 text-lg'> VI </label>
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
                                                        value="YES"
                                                        className=' scale-200'
                                                        checked={hostel === 'YES'}
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
                                                        value="NO"
                                                        className=' scale-200'
                                                        checked={hostel === 'NO'}
                                                        onChange={(e) => setHostel(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="hostelNo" className=' form-radio ml-2 text-lg'> No</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Siblings:</label>
                                            <div className="space-x-4 inline-flex">
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="sbYes"
                                                        name="siblings"
                                                        value="Yes"
                                                        className=' scale-200'
                                                        checked={siblings === 'Yes'}
                                                        onChange={(e) => setSiblings(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="sbYes" className=' form-radio ml-2 text-lg'> Yes</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="sbNo"
                                                        name="siblings"
                                                        value="No"
                                                        className=' scale-200'
                                                        checked={siblings === 'No'}
                                                        onChange={(e) => setSiblings(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="sbNo" className=' form-radio ml-2 text-lg'> No</label>
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
                                                <option value="UAI">UAI</option>
                                                <option value="UAM">UAM</option>
                                                <option value="UAR">UAR</option>
                                                <option value="UBA">UBA</option>
                                                <option value="UBO">UBO</option>
                                                <option value="UBT">UBT</option>
                                                <option value="UCC">UCC</option>
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
                                                <option value="UIC">UIC</option>
                                                <option value="UIF">UIF</option>
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
                                                <option value="PSW">PSW</option>
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
                                                <option value="General">General</option>
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
                                            <label className="block mb-1">
                                                Aadhar no:
                                                <span className=" text-red-500 text-lg">
                                                    <sup>*</sup>
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="aadhar"
                                                maxLength="12"
                                                value={aadhar}
                                                onChange={(e) => setAadhar(e.target.value)}
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
                                        {siblings === "Yes" && (
                                            <div>
                                                <div>
                                                    <label className="block mb-1 ">Siblings No</label>
                                                    <input
                                                        type="text"
                                                        name="siblings"
                                                        value={siblingsNo}
                                                        onChange={(e) => setSiblingsNo(e.target.value)}
                                                        className="w-48 md:w-44 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 ">Siblings Occupation</label>
                                                    <input
                                                        type="text"
                                                        name="siblings"
                                                        value={siblingsOccupation}
                                                        onChange={(e) => setSiblingsOccupation(e.target.value)}
                                                        className="w-48 md:w-44 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 ">Family Income</label>
                                                    <input
                                                        type="text"
                                                        name="siblings"
                                                        value={siblingsIncome}
                                                        onChange={(e) => setSiblingsIncome(e.target.value)}
                                                        className="w-48 md:w-44 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                            </div>
                                        )}

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
                                            {semester === 'I' && (<div>
                                                <div>
                                                    <label className="block mb-1">Last School or College:</label>
                                                    <input
                                                        type="text"
                                                        name="schoolName"
                                                        value={schoolName}
                                                        onChange={(e) => setSchoolName(e.target.value.toUpperCase())}
                                                        className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Year of Passing:</label>
                                                    <input
                                                        type="text"
                                                        name="yearOfPassing"
                                                        value={yearOfPassing}
                                                        onChange={(e) => setYearOfPassing(e.target.value.toUpperCase())}
                                                        className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Percentage of Mark for Sch or Clg:</label>
                                                    <input
                                                        type="text"
                                                        name="percentageOfMarkSchool"
                                                        value={percentageOfMarkSchool}
                                                        onChange={(e) => setPercentageOfMarkSchool(e.target.value.toUpperCase())}
                                                        className="w-48  md:w-52 p-2 border rounded-md text-slate-950"

                                                    />
                                                </div>
                                            </div>)}

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
                                            <div>
                                                <label className="block mb-1">Password:</label>
                                                <input
                                                    type="text"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-48 md:w-92 p-2 border rounded-md text-slate-950"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 mt-2 w-48 md:w-96">Jamath / Self Declaration Letter:</label>
                                                <input
                                                    type="file"
                                                    name="jamath"
                                                    // onChange={(e) => setJamath(e.target.files[0])}
                                                    onChange={handleFileChange}
                                                    className=" w-48 mt-1 border rounded-md p-2 text-slate-950 md:w-96"
                                                />
                                                {fileName && (
                                                    <p className="mt-2 text-sm w-48 md:w-96">Selected file: {fileName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <img src={`${apiUrl}/${jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
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
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 ml-2 rounded-md"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )
            }
            {deleteCon && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h1 className='text-center text-3xl flex justify-center'><GoAlert className='text-red-500 text-center' /></h1>
                        <h4 className="text-lg font-bold mb-4"> Are you Sure Delete the {registerNo} Data? </h4>
                        <div className="flex justify-end space-x-2">
                            <button onClick={handleConDelete} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-500">Confirm</button>
                            <button onClick={closeModifyModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
}

export default Status;