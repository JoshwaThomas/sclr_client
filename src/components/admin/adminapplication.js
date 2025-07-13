import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loading from '../../assets/Pulse.svg';
import ApplicationPrint from '../students/ApplicationPrint';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-7 text-lg rounded-lg font-bold bg-white  ${type === 'success' ? ' text-green-700' : 'text-red-500'
            }`}>
            {message}
            <button onClick={onClose} className="ml-4 text-red-500 underline">Close</button>
        </div>
    );
};

function Action() {

    const [users, setUsers] = useState([]);
    const [rusers, setRusers] = useState([]);
    const [donars, setDonars] = useState([]);
    const [scholtypes, setScholtypes] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterUsers, setFilterUsers] = useState([]);
    const [showModals, setShowModals] = useState(false);
    const [showModalReject, setShowModalReject] = useState(false);
    const [reason, setReason] = useState('');
    const [scholamt, setScholamt] = useState('');
    const [scholtype, setScholType] = useState('');
    const [scholdonar, setScholdonar] = useState([]);
    const [registerNo, setRegisterNo] = useState('');
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [fresherOrRenewal, setFresherOrRenewal] = useState('');
    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [totaldonaramt, setDonaramt] = useState(0);
    const [submittedData, setSubmittedData] = useState([]);
    const [radioValue, setRadioValue] = useState('all');
    const [progressRadioValue, setProgressRadioValue] = useState('all');
    const [acceptreject, setAcceptreject] = useState('all');
    const [specialCategories, setSpecialCategories] = useState({
        muaddin: false,
        hazrath: false,
        fatherMotherSeparated: false,
        fatherExpired: false,
        singleparent: false,
    });
    //variable declare
    const [staffverify, setStaffverify] = useState({
        All: false,
        Aided: false,
        SFM: false,
        SFW: false,
        DM: false,
        DW: false,
        MM: false,
        MW: false,
        COE: false,
    })
    const [filteredDonars, setFilteredDonars] = useState([]);
    const [zakkath, setZakkath] = useState(false);
    const [quickRejectMode, setQuickRejectMode] = useState(false);
    const [quickRejectList, setQuickRejectList] = useState([]);
    const [classAttendance, setClassAttendance] = useState('');
    const [moralAttendance, setMoralAttendance] = useState('');
    const [mark, setMark] = useState('');
    const [arrear, setArrear] = useState('');
    const [siblingsIncome, setSiblingsIncome] = useState('');
    const [isSubmitEnabled, setSubmitEnabled] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 5000);
    };


    // const [donorMapping, setDonorMapping] = useState({});
    // const [scholarshipRows, setScholarshipRows] = useState([{ scholtype: '', scholdonar: '', scholamt: '' }]);

    useEffect(() => {
        // console.log('useEffect triggered');
        const fetchYear = async () => {
            try {
                const acyear = await axios.get(`${apiUrl}/api/admin/current-acyear`)
                const curacyear = acyear.data.acyear;
                console.log('academic Year:', curacyear.acyear)
                const fetchFreshUsers = async () => {
                    try {
                        const response = await axios.get(`${apiUrl}/fresh`);
                        const freshUsers = response.data.filter(user => user.acyear === curacyear.acyear);
                        setUsers(freshUsers);
                        setFilterUsers(prev => [...prev, ...freshUsers]);
                    } catch (error) {
                        console.log(error);
                    }

                };

                const fetchRenewalUsers = async () => {
                    try {
                        const response = await axios.get(`${apiUrl}/renewal`);
                        console.log('Renewal Users:', response.data);
                        const renewalUsers = response.data.filter(user => user.acyear === curacyear.acyear);
                        setRusers(renewalUsers);
                        setFilterUsers(prev => [...prev, ...renewalUsers]);
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchFreshUsers();
                fetchRenewalUsers();
                console.log("filterUsers:", filterUsers)
            }
            catch (error) {
                console.log('Academic Year:', error)
            }
        }
        fetchYear();
    }, [apiUrl]);


    // Use Effect to Filter Users
    useEffect(() => {
        let combinedUsers = [...users, ...rusers];
        console.log('Combined Users:', combinedUsers);

        let filteredUsers = combinedUsers;

        if (radioValue === 'all') {

            if (acceptreject !== 'allar') {
                filteredUsers = filteredUsers.filter(user => {
                    const userAction = String(user.action || '').trim();
                    const selectedAccept = acceptreject.trim();
                    return userAction === selectedAccept;
                });
            }

        } else if (radioValue === 'in-progress') {
            filteredUsers = combinedUsers.filter(user => user.action === 0);
            // console.log('Filtered Users after action check:', filteredUsers);

            if (progressRadioValue !== 'all') {
                filteredUsers = filteredUsers.filter(user => {
                    const userFresherOrRenewal = (user.fresherOrRenewal || '').toLowerCase().trim();
                    const selectedProgress = progressRadioValue.toLowerCase().trim();
                    return userFresherOrRenewal === selectedProgress;
                });
            }

            if (Object.values(specialCategories).some(value => value)) {
                filteredUsers = filteredUsers.filter(user => {
                    const specialCategory = (user.specialCategory || '').toLowerCase();
                    return (
                        (specialCategories.muaddin && specialCategory.includes('muaddin')) ||
                        (specialCategories.hazrath && specialCategory.includes('hazrath')) ||
                        (specialCategories.fathermotherseparated && specialCategory.includes('fathermotherseparated')) ||
                        (specialCategories.fatherexpired && specialCategory.includes('fatherexpired')) ||
                        (specialCategories.singleparent && specialCategory.includes('singleparent'))
                    );
                });
            }
            //StaffVerify checkbox
            if (Object.values(staffverify).some(value => value)) {
                filteredUsers = filteredUsers.filter(user => {
                    const classper = user.classAttendancePer || 0;
                    const deeniyathper = user.deeniyathPer || 0;
                    const semper = user.semPercentage || 0;

                    return (
                        (staffverify.All && (classper !== 0) && (deeniyathper !== 0) && (semper !== 0)) ||
                        (staffverify.Aided && user.procategory === 'Aided' && classper !== 0) ||
                        (staffverify.SFM && user.procategory === 'SFM' && classper !== 0) ||
                        (staffverify.SFW && user.procategory === 'SFW' && classper !== 0) ||
                        (staffverify.DM && (user.procategory === 'SFM' || user.procategory === 'Aided') && user.deeniyath === 'Yes' && deeniyathper !== 0) ||
                        (staffverify.DW && user.deeniyath === 'Yes' && deeniyathper !== 0 && user.procategory === 'SFW') ||
                        (staffverify.MM && user.deeniyath === 'No' && (user.procategory === 'SFM' || user.procategory === 'Aided') && deeniyathper !== 0) ||
                        (staffverify.MW && user.deeniyath === 'No' && deeniyathper !== 0 && user.procategory === 'SFW') ||
                        (staffverify.COE && semper !== 0)
                    )
                })
            }
        }

        setFilterUsers(filteredUsers);
        console.log(filteredUsers)

        // if (classAttendance) {
        //     filteredUsers = filteredUsers.filter(user => user.classAttendancePer <= Number(classAttendance));
        // }
        // if (moralAttendance) {
        //     filteredUsers = filteredUsers.filter(user => user.deeniyathPer <= Number(moralAttendance));
        // }
        // if (mark) {
        //     filteredUsers = filteredUsers.filter(user => user.semPercentage <= Number(mark));
        // }
        // if (arrear) {
        //     filteredUsers = filteredUsers.filter(user => user.arrear >= Number(arrear));
        // }
        // if (siblingsIncome) {
        //     console.log(siblingsIncome)
        //     filteredUsers = filteredUsers.filter(user => user.siblingsIncome >= Number(siblingsIncome));
        //     console.log(filteredUsers)
        // }

        // const quickRejectUsers = filteredUsers.filter(user => user.action === 0);
        let quickRejectUsers = filteredUsers.filter(user =>
            user.action === 0 && (
                (classAttendance && user.classAttendancePer <= Number(classAttendance)) ||
                (moralAttendance && user.deeniyathPer <= Number(moralAttendance)) ||
                (mark && user.semPercentage <= Number(mark)) ||
                (arrear && user.arrear >= Number(arrear)) ||
                (siblingsIncome && user.siblingsIncome >= Number(siblingsIncome))
            )
        );
        setQuickRejectList(quickRejectUsers);
        // console.log('Filtered Users:', filteredUsers);

    }, [radioValue, progressRadioValue, acceptreject, specialCategories, users, rusers, staffverify, classAttendance, moralAttendance, mark, arrear, siblingsIncome]);
    const handleFilter = () => {
        let quickRejectUsers = filterUsers.filter(user =>
            user.action === 0 && user.semester !== 'I' && (
                (classAttendance && user.classAttendancePer <= Number(classAttendance)) ||
                (moralAttendance && user.deeniyathPer <= Number(moralAttendance)) ||
                (mark && user.semPercentage <= Number(mark)) ||
                (arrear && user.arrear >= Number(arrear)) ||
                (siblingsIncome && user.siblingsIncome >= Number(siblingsIncome))
            )
        );

        setQuickRejectList(quickRejectUsers);
    };

    useEffect(() => {
        // Set default values for filters on initial render
        setRadioValue('all');
        setAcceptreject('allar');
    }, []);

    useEffect(() => {
        handleRadioChange({ target: { value: 'all' } });
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const allUsers = [...users, ...rusers];

        const filteredUsers = allUsers.filter(user => {
            const dept = user.dept?.toLowerCase() || '';
            const registerNo = user.registerNo?.toLowerCase() || '';
            const name = user.name?.toLowerCase() || '';
            const fresherOrRenewal = user.fresherOrRenewal?.toLowerCase() || '';

            return dept.includes(searchText) ||
                registerNo.includes(searchText) ||
                name.includes(searchText) ||
                fresherOrRenewal.includes(searchText);
        });

        setFilterUsers(filteredUsers);
    };

    // Handle Progress Radio Change
    const handleProgressRadioChange = (e) => {
        const value = e.target.value ? e.target.value.toLowerCase() : '';
        setProgressRadioValue(value);
    };

    const handleRadioChange = (e) => {
        // Ensure e.target.value is a string before calling .toLowerCase()
        const value = e.target.value ? e.target.value.toLowerCase() : '';
        setRadioValue(value);
        setAcceptreject('allar');
    };

    const handleSpecialCategoryChange = (e) => {
        const { name, checked } = e.target;
        setSpecialCategories(prevState => ({ ...prevState, [name.toLowerCase()]: checked }));
    };
    //get the value
    const handleStaffverifyChange = (e) => {
        const { name, checked } = e.target;
        setStaffverify(prevState => ({ ...prevState, [name]: checked }))
        // console.log("staff",staffverify)
    }

    const handleAcceptrejectChange = (e) => {
        const value = e.target.value ? e.target.value.toLowerCase() : '';
        setAcceptreject(value);
    }

    // const handleProgressRadioChange = (e) => {
    //     // Ensure e.target.value is a string before calling .toLowerCase()
    //     const value = e.target.value ? e.target.value.toLowerCase() : '';
    //     setProgressRadioValue(value);
    // };

    const otherReason = (e) => {
        setReason(e.target.value)
    }

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleAccept = (user) => {
        setSelectedUser(user);
        setDonars(user);
        setShowModals(true);
        setFresherOrRenewal(user.fresherOrRenewal);
        setRegisterNo(user.registerNo);
        setName(user.name);
        setDept(user.dept);

    };
    const handleReject = (user) => {
        setSelectedUser(user);
        setFresherOrRenewal(user.fresherOrRenewal);
        setRegisterNo(user.registerNo);
        setName(user.name);
        setDept(user.dept);
        setShowModalReject(true);
    }

    // useEffect(() => {
    //     if (showModals) {
    //       const fetchDonars = () => {
    //         return axios.get(`${apiUrl}/api/admin/donars`)
    //           .then(response => {
    //             console.log('Fetched Donors:', response.data); // Debugging log
    //             return response.data;
    //           })
    //           .catch(err => {
    //             console.error('Error fetching donors:', err);
    //             return [];
    //           });
    //       };

    //       const fetchScholtypes = () => {
    //         return axios.get(`${apiUrl}/api/admin/scholtypes`)
    //           .then(response => {
    //             console.log('Fetched Scholarship Types:', response.data); // Debugging log
    //             return response.data;
    //           })
    //           .catch(err => {
    //             console.error('Error fetching scholarship types:', err);
    //             return [];
    //           });
    //       };

    //       fetchDonars()
    //         .then(data => {
    //           console.log('Fetched Donors:', data); // Debugging log
    //           setDonars(data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching donors:', error);
    //         });

    //       fetchScholtypes()
    //         .then(data => {
    //           setScholtypes(data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching scholarship types:', error);
    //         });
    //     }
    //   }, [showModals, apiUrl]);

    //11/09/2024
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
        if (showModals) {
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
    }, [showModals, apiUrl]);

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


    // useEffect(() => {
    //     if (scholtype) {
    //         const filtered = donars.filter(donar => donar.scholtype === scholtype);
    //         setFilteredDonars(filtered);
    //     } 
    //     if (zakkath) {
    //         const filtered = donars.filter(donar => donar.zakkathamt);
    //         setFilteredDonars(filtered);
    //     }    

    //     else {
    //         setFilteredDonars(donars);
    //     }
    // }, [scholtype, donars, zakkath]);


    const closeModal = () => {
        setShowModal(false);
        setShowModals(false);
        setShowModalReject(false);
        setSelectedUser(null);

    };
    const refreshInputs = () => {
        setScholamt('');
        setScholType('');
        setScholdonar('');
    };

    const ScholSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch current academic year
            const acYearResponse = await axios.get(`${apiUrl}/api/admin/current-acyear`);
            if (!acYearResponse.data.success) {
                throw new Error('Failed to fetch current academic year');
            }
            const acyear = acYearResponse.data.acyear.acyear;
            const balanceField = zakkath ? 'zakkathbal' : 'balance';

            // Update donor's balance
            const donorResponse = await axios.put(`${apiUrl}/api/admin/donar/${scholdonar}`, {
                amount: scholamt,
                balanceField: balanceField
            });

            console.log(donorResponse);
            const updatedBalance = donorResponse.data.updatedBalance;
            showNotification(`Submitted Successfully. Available balance for donor: ${updatedBalance}`, "success");

            const saveAmountResponse = await axios.post(`${apiUrl}/api/admin/freshamt`, {
                registerNo, name, dept, scholtype, scholdonar, scholamt, acyear, fresherOrRenewal,
            });

            console.log('Amount saved in AmountModel:', saveAmountResponse);

            // Update state and clear inputs only if everything succeeded
            const newSubmission = { scholtype, scholdonar, scholamt };
            setSubmittedData(prevData => [...prevData, newSubmission]);
            refreshInputs();
            setSubmitEnabled(true);

        } catch (err) {
            console.error('Error during submission:', err);

            // Specific error handling
            if (err.response && err.response.status === 400) {
                if (err.response.data.message === 'Insufficient balance') {
                    showNotification(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`, "error");
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 10000);
                    // window.alert(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`);
                } else {
                    showNotification("I am Dull Try Later", "error");
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 10000);
                    // window.alert("Server Not Response!");
                }
            } else {
                showNotification("Server Not Response!", "error");
                // setTimeout(() => {
                //   window.location.reload();
                // }, 10000);
                // window.alert("I am Dull Try Later");
            }

            // Optionally, you could add additional logging or actions here
            console.error('Data was not saved due to an error.');
        }
    };

    const Submit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}/api/admin/action`, {
            registerNo
        })
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                // Handle error appropriately
            });
    };



    const submitReject = (e) => {
        e.preventDefault();
        axios.get(`${apiUrl}/api/admin/current-acyear`)
            .then(response => {
                if (response.data.success) {
                    const acyear = response.data.acyear.acyear;
                    axios.post(`${apiUrl}/api/admin/reject`, {
                        fresherOrRenewal, registerNo, name, dept, reason, acyear
                    })
                        .then(result => {
                            console.log(result);
                            return axios.post(`${apiUrl}/api/admin/actionreject`, {
                                registerNo
                            });
                        })
                        .then(result => {
                            console.log(result);

                            if (result.data.success) {
                                showNotification("The Application Rejected Successfully", "error");
                                // setTimeout(() => {
                                //   window.location.reload();
                                // }, 10000);
                                // window.alert("Your Data Rejected Successfully");
                            }
                            else {
                                showNotification("Something went worng", "error");
                                // setTimeout(() => {
                                //   window.location.reload();
                                // }, 10000);
                                // alert('Something went worng')
                            }
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);
                            showNotification("Submission failed!", "error");
                            // setTimeout(() => {
                            //   window.location.reload();
                            // }, 10000);
                            // window.alert("Submission failed!");
                            window.location.reload();
                        });
                    // axios.put(`http://localhost:3001/freshaction/${registerNo}`, {
                    //     action: '2'
                    // })
                }
                else {
                    console.error('Failed to fetch current academic year');
                    showNotification("'Failed to fetch current academic year", "error");
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 10000);
                    // window.alert('Failed to fetch current academic year');
                }
            })
            .catch(error => {
                console.error('Error fetching current academic year:', error);
                showNotification("Error fetching current academic year", "error");
                // setTimeout(() => {
                //   window.location.reload();
                // }, 10000);
                // window.alert('Error fetching current academic year');
            });
    };


    //show the no of applicant in footer
    useEffect(() => {
        axios.get(`${apiUrl}/api/dashboard/counts`)
            .then(response => {
                setData(response.data)
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
                const total1 = response.data.donaramt.reduce((add, amount) => add + amount, 0);
                setDonaramt(total1);
            })
            .catch(err => console.log('Error fetching data:', err))
    }, [apiUrl]);


    //Quick rejection
    const handleQuickRejection = () => {
        setQuickRejectMode(true);
        const quickRejectUsers = filterUsers.filter(user => user.action === 0);
        setQuickRejectList(quickRejectUsers);
    };

    const handleQuickRejectReasonChange = (e, userId) => {
        setQuickRejectList(prevState => prevState.map(user =>
            user._id === userId ? { ...user, rejectReason: e.target.value } : user
        ));
    };

    const handleQuickRejectSubmit = () => {
        axios.get(`${apiUrl}/api/admin/current-acyear`)
            .then(response => {
                if (response.data.success) {
                    const acyear = response.data.acyear.acyear;

                    // Filter out users without a rejectReason
                    const filteredRejectList = quickRejectList.filter(user => user.rejectReason && user.rejectReason.trim() !== '');

                    const rejectRequests = filteredRejectList.map(user => {
                        return axios.post(`${apiUrl}/api/admin/reject`, {
                            fresherOrRenewal: user.fresherOrRenewal,
                            registerNo: user.registerNo,
                            name: user.name,
                            dept: user.dept,
                            reason: user.rejectReason,
                            acyear
                        }).then(() => {
                            return axios.post(`${apiUrl}/api/admin/actionreject`, {
                                registerNo: user.registerNo
                            });
                        });
                    });

                    Promise.all(rejectRequests)
                        .then(() => {

                            window.alert("All selected users were rejected successfully");
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);
                            window.alert("Submission failed!");
                            window.location.reload();
                        });
                } else {
                    console.error('Failed to fetch current academic year');
                    window.alert('Failed to fetch current academic year');
                }
            })
            .catch(error => {
                console.error('Error fetching current academic year:', error);
                window.alert('Error fetching current academic year');
            });
    };


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    if (!data) return <div ><center> <img src={Loading} alt="" className=" w-36 h-80  " /></center></div>;


    return (
        <div className='p-6'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                {/* Search Box */}
                <div className="flex items-center gap-3">
                    <input type="text"
                        placeholder="Search ...."
                        className="py-2 px-4 w-72 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
                        onChange={handleSearch}
                    />
                </div>
                {/* Quick Rejection Button */}
                <div>
                    <button type="button"
                        onClick={handleQuickRejection}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-base md:text-lg px-6 py-3 rounded-md shadow"
                    >
                        Quick Rejection
                    </button>
                </div>
            </div>
            {quickRejectMode ? (
                <div className="">
                    <h3 className="text-[19px] mb-6 font-semibold bg-gray-600 text-white p-3 rounded">
                        Quick Rejection List ( Students will be rejected if they meet any of the following conditions ) :
                    </h3>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-md font-semibold text-gray-700 mb-3">
                                Class Attendance (≤) :
                            </label>
                            <input
                                type="text"
                                value={classAttendance}
                                onChange={(e) => setClassAttendance(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-semibold text-gray-700 mb-3">
                                Deeniyath / Moral Attendance (≤) :
                            </label>
                            <input
                                type="text"
                                value={moralAttendance}
                                onChange={(e) => setMoralAttendance(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-semibold text-gray-700 mb-3">
                                Percentage of Marks (≤) :
                            </label>
                            <input
                                type="text"
                                value={mark}
                                onChange={(e) => setMark(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-semibold text-gray-700 mb-3">
                                Arrear Subjects (≥) :
                            </label>
                            <input
                                type="text"
                                value={arrear}
                                onChange={(e) => setArrear(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-md font-semibold text-gray-700 mb-3">
                                Annual Income (≥) :
                            </label>
                            <input
                                type="text"
                                value={siblingsIncome}
                                onChange={(e) => setSiblingsIncome(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                className="bg-emerald-600 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-700 transition"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Count */}
                    <div className="text-right font-semibold text-lg mb-4">
                        No of Students : {quickRejectList.length}
                    </div>

                    {/* Table Wrapper */}
                    <div className="overflow-x-auto border rounded-md shadow-sm">
                        <table className="min-w-full table-auto border-collapse">
                            {/* Table Head */}
                            <thead className="bg-emerald-700 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-center font-semibold border-r border-white w-[15%]">Register No</th>
                                    <th className="px-4 py-3 text-center font-semibold border-r border-white w-[35%]">Name</th>
                                    <th className="px-4 py-3 text-center font-semibold border-r border-white w-[20%]">Special Categories</th>
                                    <th className="px-4 py-3 text-center font-semibold w-[30%]">Rejection Reason</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {quickRejectList.length === 0 ? (
                                    <tr className='h-[70px]'>
                                        <td colSpan="4" className="text-center text-gray-500 font-medium">
                                            No records found.
                                        </td>
                                    </tr>
                                ) : (
                                    quickRejectList.map((user) => (
                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-50 transition-colors text-center text-gray-700"
                                        >
                                            <td className="px-4 py-3 font-semibold border-r">{user.registerNo}</td>
                                            <td className="px-4 py-3 font-semibold border-r">{user.name}</td>
                                            <td className="px-4 py-3 border-r">{user.specialCategory || <span className="text-gray-400">—</span>}</td>
                                            <td className="px-2 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter reason"
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                    value={user.rejectReason || ''}
                                                    onChange={(e) => handleQuickRejectReasonChange(e, user._id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-black transition"
                            onClick={() => setQuickRejectMode(false)}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
                            onClick={handleQuickRejectSubmit}
                        >
                            Submit All Rejections
                        </button>
                    </div>
                </div>
            ) : (
                <div >
                    {/* Filter Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                        {/* Search Mode */}
                        <div className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-800 mb-5">Search Mode</h2>
                            <div className="flex gap-4">
                                {["all", "in-progress"].map((mode) => (
                                    <label key={mode} className="flex items-center gap-2 text-gray-700 text-base capitalize">
                                        <input
                                            type="radio"
                                            name="search"
                                            value={mode}
                                            onChange={handleRadioChange}
                                            checked={radioValue === mode}
                                            className="accent-emerald-600 w-5 h-5"
                                        />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Application Status */}
                        {radioValue === "all" && (
                            <div className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-800 mb-5">Application Status</h2>
                                <div className="flex gap-4">
                                    {[
                                        { value: "allar", label: "All" },
                                        { value: "1", label: "Accepted" },
                                        { value: "2", label: "Rejected" },
                                    ].map(({ value, label }) => (
                                        <label key={value} className="flex items-center gap-2 text-gray-700 text-base">
                                            <input
                                                type="radio"
                                                name="acceptreject"
                                                value={value}
                                                onChange={handleAcceptrejectChange}
                                                checked={acceptreject === value}
                                                className="accent-blue-600 w-5 h-5"
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Progress Type */}
                        {radioValue === "in-progress" && (
                            <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-800 mb-5">Progress Type</h2>
                                <div className="flex gap-4">
                                    {["all", "fresher", "renewal"].map((val) => (
                                        <label key={val} className="flex items-center gap-2 text-gray-700 text-base capitalize">
                                            <input
                                                type="radio"
                                                name="progress"
                                                value={val}
                                                onChange={handleProgressRadioChange}
                                                checked={progressRadioValue === val}
                                                className="accent-indigo-600 w-5 h-5"
                                            />
                                            {val}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Progress Status */}
                        {radioValue === "in-progress" && (
                            <div className="bg-white border-l-4 border-emerald-600 p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-800 mb-5">Staff Progress Status</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    {["All", "Aided", "SFM", "SFW", "DM", "DW", "MM", "MW", "COE"].map((status) => (
                                        <label key={status} className="flex items-center gap-2 text-gray-700 text-sm uppercase">
                                            <input
                                                type="checkbox"
                                                id={status}
                                                name={status}
                                                onChange={handleStaffverifyChange}
                                                className="accent-emerald-600 w-5 h-5"
                                            />
                                            {status}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Special Categories */}
                        {radioValue === "in-progress" && (
                            <div className="bg-white border-l-4 border-yellow-600 p-6 rounded-lg shadow-md lg:col-span-3">
                                <h2 className="text-lg font-semibold text-gray-800 mb-5">Student Special Categories</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                    {[
                                        { id: "muaddin", label: "Mu-addin" },
                                        { id: "hazrath", label: "Hazrath" },
                                        { id: "fathermotherseparated", label: "Parent Separated" },
                                        { id: "fatherExpired", label: "Father Expired" },
                                        { id: "singleparent", label: "Single Parent" },
                                    ].map(({ id, label }) => (
                                        <label key={id} className="flex items-center gap-3 text-gray-700 text-md">
                                            <input
                                                type="checkbox"
                                                id={id}
                                                name={id}
                                                onChange={handleSpecialCategoryChange}
                                                className="accent-yellow-500 w-5 h-5"
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Student List Table */}
                    <div>
                        <div className="text-right font-semibold text-lg mb-3">
                            No of Students : {filterUsers.length}
                        </div>
                        {/* Header Grid */}
                        <div className="overflow-x-auto rounded-lg shadow ring-1 font-semibold ring-black ring-opacity-5">
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                <thead className="bg-emerald-700">
                                    <tr>
                                        <th className="px-6 py-4 text-center text-md font-semibold text-white border-r border-gray-300">
                                            Register No
                                        </th>
                                        <th className="px-6 py-4 text-center text-md font-semibold text-white border-r border-gray-300">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-center text-md font-semibold text-white border-r border-gray-300">
                                            Department
                                        </th>
                                        <th className="px-6 py-4 text-center text-md font-semibold text-white">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {filterUsers.length > 0 ? (
                                        filterUsers.map((user, index) => (
                                            <tr
                                                key={`${user._id}-${index}`}
                                                className="hover:bg-gray-50 font-semibold h-[60px] transition-colors border-t border-gray-300"
                                            >
                                                <td className="px-6 py-3 text-center text-md text-gray-700 uppercase border-r">
                                                    {user.registerNo}
                                                </td>
                                                <td className="px-6 py-3 text-center text-md text-gray-700 uppercase border-r">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-3 text-center text-md text-gray-700 uppercase border-r">
                                                    {user.dept}
                                                </td>
                                                <td className="px-6 py-3 text-center text-md text-gray-700">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleViewClick(user)}
                                                            className="bg-blue-500 text-white hover:bg-blue-700 py-1 h-[35px] w-24 rounded-md"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAccept(user)}
                                                            className={`py-1 h-[35px] w-24 rounded-md ${user.action === 1
                                                                    ? 'bg-green-400 text-green-700'
                                                                    : user.action === 0
                                                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                                                        : 'bg-gray-300 text-gray-500'
                                                                }`}
                                                            disabled={user.action !== 0}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleReject(user)}
                                                            className={`py-1 h-[35px] w-24 rounded-md ${user.action === 2
                                                                    ? 'bg-red-400 text-red-700'
                                                                    : user.action === 0
                                                                        ? 'bg-red-500 text-white hover:bg-red-600'
                                                                        : 'bg-gray-300 text-gray-500'
                                                                }`}
                                                            disabled={user.action !== 0}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center text-gray-500 py-4 text-md font-medium"
                                            >
                                                No records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-gray-800">
                {/* Application Summary */}
                <div className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        📋 Application Summary
                    </h3>
                    <div className="flex justify-between text-gray-700">
                        <span>Number of Students Applied :</span>
                        <span className="font-bold">{data.totalApplication}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mt-2">
                        <span>Number of Students Benefitted :</span>
                        <span className="font-bold">{data.totalBenefit}</span>
                    </div>
                </div>
                {/* Scholarship Summary */}
                <div className="bg-white border-l-4 border-green-600 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        💰 Scholarship Summary
                    </h3>
                    <div className="flex justify-between text-gray-700">
                        <span>Scholarship Received :</span>
                        <span className="font-bold">{formatCurrency(totaldonaramt)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 mt-2">
                        <span>Scholarship Awarded :</span>
                        <span className="font-bold">{formatCurrency(totalamount)}</span>
                    </div>
                </div>
            </div>
            {/* Application View Modal */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 left-8 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="absolute top-4 right-10 text-gray-600 hover:text-red-600 text-3xl font-bold focus:outline-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <div className="bg-white ml-64 w-[81%] h-full overflow-auto p-6">
                        <div>
                            <h3 className="text-xl font-semibold mt-12 bg-gray-600 p-3 text-white rounded-t-md">Application Status</h3>
                            <div className="py-4">
                                {selectedUser.action === 1 && (
                                    <p className="text-green-600 font-semibold text-lg">
                                        Your application is selected. If any query, contact ERP or the Scholarship Office.
                                    </p>
                                )}
                                {selectedUser.action === 2 && (
                                    <p className="text-red-600 font-semibold text-lg">
                                        Your application is rejected.
                                    </p>
                                )}
                                {![1, 2, 0].includes(selectedUser.action) && (
                                    <p className="text-yellow-600 font-semibold text-lg">
                                        Go to Application Tab to apply for Scholarship Renewal.
                                    </p>
                                )}
                                {![1, 2].includes(selectedUser.action) && (
                                    <p className="text-yellow-600 font-semibold text-lg">
                                        Your application is under process.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-black p-5 rounded-xl bg-white text-center text-xl font-semibold uppercase">
                                {selectedUser.fresherOrRenewal}
                            </div>
                            <div className="border border-black p-5 rounded-xl bg-white text-center text-xl font-semibold uppercase">
                                {selectedUser.specialCategory}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold bg-gray-600 p-3 text-white mt-6 rounded-t-md">
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-5 border border-black p-8 rounded-b-xl bg-white">
                                <Detail label="Register No. :" value={selectedUser.registerNo} />
                                <Detail label="Name :" value={selectedUser.name} />
                                <Detail label="Department :" value={selectedUser.dept} />
                                <Detail label="Section :" value={selectedUser.section} />
                                <Detail label="UG or PG :" value={selectedUser.ugOrPg} />
                                <Detail label="Programme Category :" value={selectedUser.procategory} />
                                <Detail label="Semester :" value={selectedUser.semester} />
                                <Detail label="Mobile No. :" value={selectedUser.mobileNo} />
                                <Detail label="S/O, D/O :" value={selectedUser.fatherName} />
                                <Detail label="Father's Contact No. :" value={selectedUser.fatherNo} />
                                <Detail label="Father's Occupation :" value={selectedUser.fatherOccupation} />
                                <Detail label="Annual Income :" value={selectedUser.annualIncome} />
                                <Detail label="Siblings :" value={selectedUser.siblings} />
                                {selectedUser.siblings === 'Yes' && (
                                    <>
                                        <Detail label="No. of Siblings :" value={selectedUser.siblingsNo} />
                                        <Detail label="Siblings Occupation :" value={selectedUser.siblingsOccupation} />
                                        <Detail label="Family Annual Income :" value={selectedUser.siblingsIncome} />
                                    </>
                                )}
                                <Detail label="Hostel :" value={selectedUser.hostel} />
                                <Detail label="Special Category :" value={selectedUser.specialCategory} />
                                <Detail label="Religion :" value={selectedUser.religion} />
                                <Detail label="Permanent Address :" value={selectedUser.address} />
                                <Detail label="State :" value={selectedUser.state} />
                                <Detail label="District :" value={selectedUser.district} />
                                <Detail label="Pincode :" value={selectedUser.pin} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold bg-gray-600 p-3 text-white mt-6 rounded-t-md">
                                Personal Details
                            </h3>
                            <div className="overflow-x-auto border border-black p-8 rounded-b-xl bg-white">
                                <div className="grid grid-cols-2 border-r border-l border-t border-gray-600 rounded-md overflow-hidden">
                                    {selectedUser.semester === 'I' ? (
                                        <>
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                                Percentage of Mark
                                            </div>
                                            <div className="flex justify-center border-b border-gray-600 p-3">
                                                {selectedUser.percentageOfMarkSchool || 'N/A'}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                                Percentage of Mark
                                            </div>
                                            <div className="flex justify-center border-b border-gray-600 p-3">
                                                {selectedUser.semPercentage === 0 ? 'Pending' : selectedUser.semPercentage}
                                            </div>
                                        </>
                                    )}
                                    {/* Common Fields - continue the same grid here */}
                                    <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                        Class Attendance Percentage
                                    </div>
                                    <div className="flex justify-center border-b border-gray-600 p-3">
                                        {selectedUser.classAttendancePer === 0 ? 'Pending' : selectedUser.classAttendancePer}
                                    </div>
                                    <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                        Deeniyath / Moral Percentage
                                    </div>
                                    <div className="flex justify-center p-3 border-b border-gray-600">
                                        {selectedUser.deeniyathPer === 0 ? 'Pending' : selectedUser.deeniyathPer}
                                    </div>
                                    {selectedUser.arrear !== 0 && (
                                        <>
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                                No. of Arrear
                                            </div>
                                            <div className="flex justify-center p-3 border-b border-gray-600"> {selectedUser.arrear} </div>
                                        </>
                                    )}
                                    {selectedUser.fresherOrRenewal === 'Renewal' && (
                                        <>
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">
                                                Last Time Credited Amount
                                            </div>
                                            <div className="flex justify-center p-3 border-b border-gray-600"> {selectedUser.lastCreditedAmt} </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl mt-6">
                                <div>
                                    <p className="font-semibold mb-4">Jamath / Declaration Letter : </p>
                                    <img src={`${apiUrl}/${selectedUser.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            <button
                                onClick={() => handleAccept(selectedUser)}
                                disabled={selectedUser.action !== 0}
                                className={`px-6 py-2 rounded-md font-semibold shadow transition-colors duration-200 ${selectedUser.action !== 0
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(selectedUser)}
                                disabled={selectedUser.action !== 0}
                                className={`px-6 py-2 rounded-md font-semibold shadow transition-colors duration-200 ${selectedUser.action !== 0
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                    }`}
                            >
                                Reject
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 rounded-md font-semibold bg-gray-500 text-white hover:bg-gray-600 shadow"
                            >
                                Close
                            </button>
                        </div>
                        <div className="mt-6"> <ApplicationPrint student={selectedUser} /> </div>
                    </div>
                </div>
            )}
            {/* Accept Session */}
            {showModals && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({ message: '', type: '' })}
                    />
                    <div className="bg-white w-[80%] max-w-6xl h-[70%] rounded-xl overflow-y-auto shadow-lg p-6">
                        <form onSubmit={Submit} className="space-y-8">
                            {/* Header Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-100 p-4 rounded-md shadow">
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm text-gray-600">Register No. :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.registerNo}</div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm text-gray-600">Name :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.name}</div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm text-gray-600">Department :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.dept}</div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm text-gray-600">Special Category :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.specialCategory || "—"}</div>
                                </div>
                            </div>

                            {/* Zakkath */}
                            <div className="flex items-center mt-2 md:mt-8">
                                <input
                                    type="checkbox"
                                    id="zakkath"
                                    checked={zakkath}
                                    onChange={(e) => setZakkath(e.target.checked)}
                                    className="w-5 h-5 accent-green-600"
                                />
                                <label htmlFor="zakkath" className="ml-3 font-semibold text-gray-700">
                                    Zakkath
                                </label>
                            </div>

                            {/* Form Fields Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Scholarship Type */}
                                <div>
                                    <label className="block mb-1 text-gray-700 font-semibold">Scholarship Type</label>
                                    <select
                                        value={scholtype}
                                        onChange={(e) => setScholType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 text-gray-800"
                                    >
                                        <option value="">Select</option>
                                        {scholtypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Donor */}
                                <div>
                                    <label className="block mb-1 text-gray-700 font-semibold">Donor</label>
                                    <select
                                        value={scholdonar}
                                        onChange={(e) => setScholdonar(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 text-gray-800"
                                    >
                                        <option value="">Select Donor</option>
                                        {Array.isArray(filteredDonars) &&
                                            filteredDonars.map((donar) => (
                                                <option key={donar._id} value={donar._id}>
                                                    {donar.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className="block mb-1 text-gray-700 font-semibold">Scholarship Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        value={scholamt}
                                        onChange={(e) => setScholamt(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 text-gray-800"
                                    />
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <div className="text-right mt-6">
                                <button type="button" onClick={ScholSubmit}
                                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Confirm
                                </button>
                            </div>

                            {/* Submitted List */}
                            {submittedData.length > 0 && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <h3 className="text-lg font-bold mb-2 text-gray-700">Submitted Scholarships:</h3>
                                    <div className="space-y-2">
                                        {submittedData.map((submission, index) => (
                                            <div key={index} className="grid grid-cols-4 gap-4 text-gray-800">
                                                <div>{index + 1}.</div>
                                                <div>{submission.scholtype}</div>
                                                <div>{formatCurrency(submission.scholamt)}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Final Buttons */}
                            <div className="flex justify-end items-center gap-6 mt-10">
                                <button type="submit"
                                    disabled={!isSubmitEnabled}
                                    className={`bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition ${!isSubmitEnabled ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Reject Session */}
            {showModalReject && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({ message: '', type: '' })}
                    />
                    <div className="bg-white w-[80%] max-w-4xl rounded-xl overflow-y-auto shadow-lg p-6">
                        <form onSubmit={submitReject} className="space-y-8">
                            {/* Header Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-100 p-4 rounded-md shadow">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-600">Register No. :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.registerNo}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-600">Name :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.name}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-600">Department :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.dept}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-600">Special Category :</label>
                                    <div className="text-lg font-semibold uppercase">{selectedUser.specialCategory || "—"}</div>
                                </div>
                            </div>
                            {/* Reason Section */}
                            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                                <label className="block text-gray-700 font-semibold mb-2">Rejection Reason</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                                        required
                                    >
                                        <option value="">Select Reason</option>
                                        <option value="Re Appear">Re Appear</option>
                                        <option value="Low Percentage of Marks">Low Percentage of Marks</option>
                                        <option value="Missing Document">Missing Document</option>
                                        <option value="Redo">Redo</option>
                                        <option value="Shortage of Attendance">Shortage of Attendance</option>
                                        <option value="Shortage of Deeniyath Attendance">Shortage of Deeniyath Attendance</option>
                                        <option value="Shortage of the Moral Attendance">Shortage of the Moral Attendance</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {reason === "others" && (
                                        <input
                                            type="text"
                                            placeholder="Enter custom reason"
                                            onChange={otherReason}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end items-center gap-6 mt-6">
                                <button type="submit"
                                    className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition"
                                >
                                    Submit
                                </button>
                                <button type="button" onClick={closeModal}
                                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    )
}

const Detail = ({ label, value }) => (
    <div className="text-base space-y-1">
        <p className="text-slate-700 font-lightbold">{label}</p>
        <p className="uppercase font-bold text-slate-900">{value || '-'}</p>
    </div>
)

export default Action;