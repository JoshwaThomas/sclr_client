import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../assets/Pulse.svg'

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
        All: true,
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
    // const [donorMapping, setDonorMapping] = useState({});
    // const [scholarshipRows, setScholarshipRows] = useState([{ scholtype: '', scholdonar: '', scholamt: '' }]);

    useEffect(() => {
        // console.log('useEffect triggered');
        const fetchFreshUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fresh');
                setUsers(response.data);
                setFilterUsers(prev => [...prev, ...response.data]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRenewalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/renewal');
                console.log('Renewal Users:', response.data); // L
                setRusers(response.data);
                setFilterUsers(prev => [...prev, ...response.data]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFreshUsers();
        fetchRenewalUsers();
    }, []);

    // Use Effect to Filter Users
    useEffect(() => {
        let combinedUsers = [...users, ...rusers];
        // console.log('Combined Users:', combinedUsers);

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
                        (specialCategories.fatherexpired && specialCategory.includes('father expired')) ||
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
        // console.log('Filtered Users:', filteredUsers);
        setFilterUsers(filteredUsers);
    }, [radioValue, progressRadioValue, acceptreject, specialCategories, users, rusers, staffverify]);

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


    const fetchDonars = () => {
        return axios.get('http://localhost:3001/api/admin/donar')
            .then(response => response.data)
            .catch(err => {
                console.error('Error fetching donors:', err);
                return [];
            });
    };

    const fetchScholtypes = () => {
        return axios.get('http://localhost:3001/api/admin/scholtypes')
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
    }, [showModals]);

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

    // const handleSearch = (e) => {
    //     const searchText = e.target.value.toLowerCase();
    //     const allUsers = [...users, ...rusers];
    //     const filteredUsers = allUsers.filter(user =>
    //         user.dept.toLowerCase().includes(searchText) ||
    //         user.registerNo.toLowerCase().includes(searchText) ||
    //         user.name.toLowerCase().includes(searchText) ||
    //         user.fresherOrRenewal.toLowerCase().includes(searchText)
    //     );
    //     setFilterUsers(filteredUsers);
    // };
    // const handleRadioChange = (e) => {
    //     const radioValue = e.target.value.toLowerCase();
    //     const allUsers = [...users, ...rusers];

    //     if (radioValue === 'all') {
    //         setFilterUsers(allUsers);
    //     } else {
    //         const filteredUsers = allUsers.filter(user =>
    //             user.fresherOrRenewal.toLowerCase() === radioValue
    //         );
    //         setFilterUsers(filteredUsers);
    //     }
    // };
    // const handleScholarshipChange = (index, event) => {
    //     const { name, value } = event.target;
    //     const updatedRows = [...scholarshipRows];
    //     updatedRows[index][name] = value;
    //     setScholarshipRows(updatedRows);
    // };

    // const addRow = () => {
    //     setScholarshipRows([...scholarshipRows, { scholtype: '', scholdonar: '', scholamt: '' }]);
    // };

    // const Submit = (e) => {
    //     e.preventDefault();
    //     axios.get('http://localhost:3001/api/admin/current-acyear')
    //         .then(response => {
    //             if (response.data.success) {
    //                 const acyear = response.data.acyear.acyear;

    //                 Promise.all(scholarshipRows.map(row => (
    //                     axios.put(`http://localhost:3001/api/admin/donar/${row.scholdonar}`, { amount: row.scholamt })
    //                         .then(result => ({ success: true, message: `Updated balance for donor: ${row.scholdonar}` }))
    //                         .catch(err => ({ success: false, message: `Failed to update balance for donor: ${row.scholdonar}` }))
    //                 )))
    //                     .then(results => {
    //                         const allDonorUpdatesSuccess = results.every(result => result.success);
    //                         const updatedBalance = results.data.updatedBalance;

    //                         if (allDonorUpdatesSuccess) {
    //                             Promise.all(scholarshipRows.map(row => (
    //                                 axios.post('http://localhost:3001/api/admin/freshamt', {
    //                                     fresherOrRenewal: selectedUser.fresherOrRenewal,
    //                                     registerNo: selectedUser.registerNo,
    //                                     name: selectedUser.name,
    //                                     dept: selectedUser.dept,
    //                                     scholtype: row.scholtype,
    //                                     scholdonar: row.scholdonar,
    //                                     scholamt: row.scholamt,
    //                                     acyear
    //                                 })
    //                             )))
    //                                 .then(results => {
    //                                     const allFreshAmtInsertsSuccess = results.every(result => !!result.data);

    //                                     if (allFreshAmtInsertsSuccess) {
    //                                         console.log('Scholarship details saved successfully');
    //                                         return axios.post('http://localhost:3001/api/admin/action', {
    //                                             registerNo: selectedUser.registerNo
    //                                         });
    //                                     } else {
    //                                         console.error('Failed to save scholarship details');
    //                                         window.alert('Failed to save scholarship details');
    //                                     }
    //                                 })
    //                                 .then(result => {
    //                                     if (result) {
    //                                         console.log('Action updated successfully');
    //                                         window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);
    //                                         window.location.reload();
    //                                     }
    //                                 })
    //                                 .catch(err => {
    //                                     console.error('Error saving scholarship details:', err);
    //                                     if (err.response && err.response.status === 400) {
    //                                         if (err.response.data.message === 'Insufficient balance') {
    //                                             window.alert(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`);
    //                                         } else {
    //                                             window.alert('Server Not Response!');
    //                                         }
    //                                     } else {
    //                                         window.alert('An error occurred. Please try again later.');
    //                                     }
    //                                 });
    //                         } else {
    //                             console.error('Failed to update donor balances');
    //                             window.alert('Failed to update donor balances');
    //                         }
    //                     })
    //                     .catch(error => {
    //                         console.error('Error updating donor balances:', error);
    //                         window.alert('An error occurred while updating donor balances');
    //                     });
    //             } else {
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
        setScholType('');
        setScholdonar('');
    };
    // it worked
    // const ScholSubmit = (e) => {
    //     e.preventDefault();
    //     axios.get('http://localhost:3001/api/admin/current-acyear')
    //         .then(response => {
    //             if (response.data.success) {
    //                 const acyear = response.data.acyear.acyear;

    //                 const balanceField = zakkath ? 'zakkathbal' : 'balance';

    //                 // Check the donor details and balance amount before saving to freshamt
    //                 axios.put(`http://localhost:3001/api/admin/donar/${scholdonar}`, {
    //                     amount: scholamt,
    //                     balanceField: balanceField
    //                 })
    //                     .then(result => {
    //                         console.log(result);
    //                         const updatedBalance = result.data.updatedBalance;
    //                         window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

    //                         return axios.post('http://localhost:3001/api/admin/freshamt', {
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

    //checked
    const ScholSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch current academic year
            const acYearResponse = await axios.get('http://localhost:3001/api/admin/current-acyear');
            if (!acYearResponse.data.success) {
                throw new Error('Failed to fetch current academic year');
            }
            const acyear = acYearResponse.data.acyear.acyear;
            const balanceField = zakkath ? 'zakkathbal' : 'balance';

            // Update donor's balance
            const donorResponse = await axios.put(`http://localhost:3001/api/admin/donar/${scholdonar}`, {
                amount: scholamt,
                balanceField: balanceField
            });

            console.log(donorResponse);
            const updatedBalance = donorResponse.data.updatedBalance;
            window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

            // Save scholarship amount in AmountModel
            const saveAmountResponse = await axios.post('http://localhost:3001/api/admin/freshamt', {
                registerNo, name, dept, scholtype, scholdonar, scholamt, acyear
            });

            console.log('Amount saved in AmountModel:', saveAmountResponse);

            // Update state and clear inputs only if everything succeeded
            const newSubmission = { scholtype, scholdonar, scholamt };
            setSubmittedData(prevData => [...prevData, newSubmission]);
            refreshInputs();

        } catch (err) {
            console.error('Error during submission:', err);

            // Specific error handling
            if (err.response && err.response.status === 400) {
                if (err.response.data.message === 'Insufficient balance') {
                    window.alert(`Insufficient balance. Available balance for donor: ${err.response.data.availableBalance}`);
                } else {
                    window.alert("Server Not Response!");
                }
            } else {
                window.alert("I am Dull Try Later");
            }

            // Optionally, you could add additional logging or actions here
            console.error('Data was not saved due to an error.');
        }
    };

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/admin/action', {
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
        axios.get('http://localhost:3001/api/admin/current-acyear')
            .then(response => {
                if (response.data.success) {
                    const acyear = response.data.acyear.acyear;
                    axios.post('http://localhost:3001/api/admin/reject', {
                        fresherOrRenewal, registerNo, name, dept, reason, acyear
                    })
                        .then(result => {
                            console.log(result);
                            // Update the action value in the applicant model
                            return axios.post('http://localhost:3001/api/admin/actionreject', {
                                registerNo
                            });
                        })
                        .then(result => {
                            console.log(result);

                            if (result.data.success) {
                                window.alert("Your Data Rejected Successfully");
                            }
                            else {
                                alert('Something went worng')
                            }
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);
                            window.alert("Submission failed!");
                            window.location.reload();
                        });
                    // axios.put(`http://localhost:3001/freshaction/${registerNo}`, {
                    //     action: '2'
                    // })
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


    //show the no of applicant in footer
    useEffect(() => {
        axios.get('http://localhost:3001/api/dashboard/counts')
            .then(response => {
                setData(response.data)
                const total = response.data.scholamt.reduce((add, amount) => add + amount, 0);
                setTotalAmount(total);
                const total1 = response.data.donaramt.reduce((add, amount) => add + amount, 0);
                setDonaramt(total1);
            })
            .catch(err => console.log('Error fetching data:', err))
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    if (!data) return <div ><center> <img src={Loading} alt="" className=" w-36 h-80  " /></center></div>;


    return (
        <div>
            <div className='end-px'>
                <div>
                    <input
                        type='text'
                        placeholder='Search text here'
                        className='uppercase py-1 rounded-md mr-2'
                        onChange={handleSearch}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                    >
                        Search
                    </button>
                    <span className='ml-56'></span>
                    <button
                        type="button"
                        className="bg-orange-500 text-white py-1 px-3 ml-96 hover:bg-black rounded-lg mt-1 "
                    >
                        Quick Rejection
                    </button>
                    
                </div>
               
                <div className='flex inline-flex '>
                    <div className='end-px text-white border border-amber-100 w-72 mt-4 py-2 border-4 flex inline-flex'>
                        <input
                            type="radio"
                            id="all"
                            name="search"
                            value="all"
                            className='scale-200 ml-8'
                            onChange={handleRadioChange}
                            defaultChecked
                        />
                        <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>

                        <input
                            type="radio"
                            id="in-progress"
                            name="search"
                            value="in-progress"
                            className='scale-200 ml-4'
                            onChange={handleRadioChange}


                        />
                        <label htmlFor="in-progress" className='form-radio ml-2 text-lg'>In-Progress</label>
                    </div>
                    <div className='flex inline-flex px-4'></div>
                    {radioValue === 'in-progress' && (
                        <div>
                            <div className='end-px text-white border border-amber-100 w-auto mt-4 py-2 px-2 border-4 flex inline-flex'>
                                <input
                                    type="checkbox"
                                    id="All"
                                    name="All"
                                    className='scale-200 ml-2'
                                    onChange={handleStaffverifyChange}
                                    defaultChecked
                                />
                                <label htmlFor="All" className='form-checkbox ml-2 text-lg'>All</label>

                                <input
                                    type="checkbox"
                                    id="Aided"
                                    name="Aided"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}

                                />
                                <label htmlFor="Aided" className='form-checkbox ml-2 text-lg'>Aided</label>

                                <input
                                    type="checkbox"
                                    id="SFM"
                                    name="SFM"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}

                                />
                                <label htmlFor="SFM" className='form-checkbox ml-2 text-lg'>SFM</label>

                                <input
                                    type="checkbox"
                                    id="SFW"
                                    name="SFW"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="SFW" className='form-checkbox ml-2 text-lg'>SFW</label>

                                <input
                                    type="checkbox"
                                    id="DM"
                                    name="DM"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="DM" className='form-checkbox ml-2 text-lg'>DM</label>
                                <input
                                    type="checkbox"
                                    id="DW"
                                    name="DW"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="DW" className='form-checkbox ml-2 text-lg'>DW</label>

                                <input
                                    type="checkbox"
                                    id="MM"
                                    name="MM"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="MM" className='form-checkbox ml-2 text-lg'>MM</label>

                                <input
                                    type="checkbox"
                                    id="MW"
                                    name="MW"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="MW" className='form-checkbox ml-2 text-lg'>MW</label>
                                <input
                                    type="checkbox"
                                    id="COE"
                                    name="COE"
                                    className='scale-200 ml-4'
                                    onChange={handleStaffverifyChange}
                                />
                                <label htmlFor="COE" className='form-checkbox ml-2 text-lg'>COE</label>
                            </div>
                        </div>
                    )}
                </div>
                {radioValue === 'all' && (
                    <div className=''>
                        <div className='end-px text-white border border-amber-100 w-72 mt-4 py-2 border-4'>
                            <input
                                type="radio"
                                id="all"
                                name="acceptreject"
                                value="allar"
                                className='scale-200 ml-8'
                                onChange={handleAcceptrejectChange}

                            />
                            <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>
                            <input
                                type="radio"
                                id="accept"
                                name="acceptreject"
                                value="1"
                                className='scale-200 ml-4'
                                onChange={handleAcceptrejectChange}
                                checked={acceptreject === '1'}
                            />
                            <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Accept</label>

                            <input
                                type="radio"
                                id="reject"
                                name="acceptreject"
                                value="2"
                                className='scale-200 ml-4'
                                onChange={handleAcceptrejectChange}
                                checked={acceptreject === '2'}
                            />
                            <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Reject</label>
                        </div>

                    </div>

                )}
                {radioValue === 'in-progress' && (
                    <div className=''>
                        <div className='end-px text-white border border-amber-100 w-72 mt-4 py-2 border-4 flex inline-flex'>
                            <input
                                type="radio"
                                id="all-progress"
                                name="progress"
                                value="all"
                                className='scale-200 ml-8'
                                onChange={handleProgressRadioChange}
                                checked={progressRadioValue === 'all'}
                            />
                            <label htmlFor="all-progress" className='form-radio ml-2 text-lg'>All</label>

                            <input
                                type="radio"
                                id="fresher"
                                name="progress"
                                value="Fresher"
                                className='scale-200 ml-4'
                                onChange={handleProgressRadioChange}
                                checked={progressRadioValue === 'fresher'}
                            />
                            <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Fresher</label>

                            <input
                                type="radio"
                                id="renewal"
                                name="progress"
                                value="renewal"
                                className='scale-200 ml-4'
                                onChange={handleProgressRadioChange}
                                checked={progressRadioValue === 'renewal'}
                            />
                            <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>
                        </div>
                        <div className='flex inline-flex px-4'></div>
                        <div className='end-px text-white border border-amber-100 w-auto mt-4 py-2 px-2 border-4 flex inline-flex'>
                            <input
                                type="checkbox"
                                id="muaddin"
                                name="muaddin"
                                className='scale-200 ml-2'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="muAddin" className='form-checkbox ml-2 text-lg'>Mu-addin</label>

                            <input
                                type="checkbox"
                                id="hazrath"
                                name="hazrath"
                                className='scale-200 ml-4'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="hazrath" className='form-checkbox ml-2 text-lg'>Hazrath</label>

                            <input
                                type="checkbox"
                                id="fathermotherseparated"
                                name="fathermotherseparated"
                                className='scale-200 ml-4'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="FatherMotherSeparated" className='form-checkbox ml-2 text-lg'>Parent Separated</label>

                            <input
                                type="checkbox"
                                id="fatherExpired"
                                name="fatherExpired"
                                className='scale-200 ml-4'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="fatherExpired" className='form-checkbox ml-2 text-lg'>Father Expired</label>
                            <input
                                type="checkbox"
                                id="singleparent"
                                name="singleparent"
                                className='scale-200 ml-4'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="singleparent" className='form-checkbox ml-2 text-lg'>Single Parent</label>
                        </div>
                        {/* <div className='end-px text-white border border-amber-100 w-auto mt-4 py-2 px-2 border-4 flex inline-flex'>
                            <input
                                type="checkbox"
                                id="All"
                                name="All"
                                className='scale-200 ml-2'
                                onChange={handleStaffverifyChange}
                                defaultChecked
                            />
                            <label htmlFor="All" className='form-checkbox ml-2 text-lg'>All</label>

                            <input
                                type="checkbox"
                                id="Aided"
                                name="Aided"
                                className='scale-200 ml-2'
                                onChange={handleStaffverifyChange}

                            />
                            <label htmlFor="Aided" className='form-checkbox ml-2 text-lg'>Aided</label>

                            <input
                                type="checkbox"
                                id="SFM"
                                name="SFM"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}

                            />
                            <label htmlFor="SFM" className='form-checkbox ml-2 text-lg'>SFM</label>

                            <input
                                type="checkbox"
                                id="SFW"
                                name="SFW"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="SFW" className='form-checkbox ml-2 text-lg'>SFW</label>

                            <input
                                type="checkbox"
                                id="DM"
                                name="DM"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="DM" className='form-checkbox ml-2 text-lg'>DM</label>
                            <input
                                type="checkbox"
                                id="DW"
                                name="DW"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="DW" className='form-checkbox ml-2 text-lg'>DW</label>

                            <input
                                type="checkbox"
                                id="MM"
                                name="MM"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="MM" className='form-checkbox ml-2 text-lg'>MM</label>

                            <input
                                type="checkbox"
                                id="MW"
                                name="MW"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="MW" className='form-checkbox ml-2 text-lg'>MW</label>
                            <input
                                type="checkbox"
                                id="COE"
                                name="COE"
                                className='scale-200 ml-4'
                                onChange={handleStaffverifyChange}
                            />
                            <label htmlFor="COE" className='form-checkbox ml-2 text-lg'>COE</label>
                        </div> */}
                    </div>

                )}




            </div>
            <div className='mt-6 pl-0'>
                <div className="text-right font-bold text-xl mr-40 text-white">No of Students :  {filterUsers.length}</div>
                <div className="grid grid-cols-4 w-auto bg-amber-200">
                    <div className="font-bold border border-white text-center py-3">REGISTER NO.</div>
                    <div className="font-bold border border-white text-center py-3">NAME</div>
                    <div className="font-bold border border-white text-center py-3">DEPARTMENT</div>
                    <div className="font-bold border border-white text-center py-3">ACTION</div>
                </div>

                {filterUsers.map((user, index) => (
                    <div key={`${user._id}-${index}`} className="grid grid-cols-4 w-auto bg-amber-100">
                        <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                        <div className="font-bold border  border-white text-center uppercase py-3">
                            <button
                                type="button"
                                onClick={() => handleViewClick(user)}
                                className="bg-blue-500 text-white py-1 px-4 hover:bg-black rounded-lg"
                            >
                                View
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAccept(user)}
                                className={`px-4 py-1 ml-1 rounded-lg ${user.action !== 0 ? 'bg-gray-400 text-gray-700' : 'bg-green-500 text-white hover:bg-black'}`}
                                disabled={user.action !== 0}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={() => handleReject(user)}
                                className={`px-4 py-1 ml-1 rounded-lg ${user.action !== 0 ? 'bg-gray-400 text-gray-700' : 'bg-red-500 text-white hover:bg-black'}`}
                                disabled={user.action !== 0}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
                {/* <div>
                    {rusers.map((user) => (
                        <div key={user.registerNo} className="grid grid-cols-5 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                            <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div>
                            <div className="font-bold border border-white text-center uppercase">{user.registerNo}</div>
                            <div className="font-bold border border-white text-center uppercase">{user.name}</div>
                            <div className="font-bold border border-white text-center uppercase">{user.dept}</div>
                            <div className="font-bold border border-white text-center">
                                <button
                                    type="button"
                                    onClick={() => handleViewClick(user)}
                                    className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                                >
                                    View
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAccept(user)}
                                    className="px-3 py-1 bg-green-500 text-white hover:bg-black rounded-lg"
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-1 ml-2 bg-red-500 text-white hover:bg-black rounded-lg"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}</div> */}
            </div>
            <div className=' text-white flex inline-flex text-xl py-5 grid grid-cols-2 gap-4 mt-4'>
                <div className='border border-white rounded-lg  grid grid-cols-2 p-4 bg-blue-600 '>
                    <div className=' w-72 ml-7' > Number of Students Applied    </div><div className='ml-16'> :   {data.totalApplication} </div>
                    <div className=' w-72 ml-7' > Number of Students Benefitted : </div><div className='ml-20'> {data.totalBenefit} </div>
                </div>
                <div className='border border-white rounded-lg   p-4 grid grid-cols-2 bg-blue-600 '>
                    <div className='  '>Scholarship Received :</div><div className='-ml-10'> {formatCurrency(totaldonaramt)}</div>
                    <div className=' '>Scholarship Awarded  : </div><div className='-ml-10'> {formatCurrency(totalamount)}  </div>
                </div>
            </div>
            {showModal && selectedUser && (

                <div className="fixed inset-0  flex items-center justify-center  ">
                    <div className="bg-white ml-64 w-5/6 h-full  overflow-auto p-6">
                        {/* fresher form data retrive */}
                        <div>
                            <div className=' '>
                                <div>

                                    <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                                    <div className="space-x-4 inline-flex border p-6 rounded-xl">
                                        <div className='uppercase font-bold text-xl'>
                                            {selectedUser.fresherOrRenewal}
                                        </div>
                                    </div>
                                    <div className="space-x-4 ml-5 inline-flex border p-6 rounded-xl">
                                        <div className='uppercase font-bold text-xl'>
                                            {selectedUser.specialCategory}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-4 text-white">Personal Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

                                <div className=''>
                                    <label className="block ">Register No.:</label>
                                    <label className='font-bold text-lg uppercase'> {selectedUser.registerNo} </label>

                                    <div>
                                        <label className="block mt-2">Name:</label>
                                        <label className='font-bold text-lg uppercase'>  {selectedUser.name} </label>
                                    </div>

                                    <div>
                                        <label className="block mt-2">Department:</label>
                                        <label className='font-bold text-lg uppercase'>  {selectedUser.dept} </label>
                                    </div>
                                    <div>
                                        <label className="block mb-1">Section</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.section} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">UG or PG</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.ugOrPg} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">Programme Category</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.procategory} </label>
                                    </div>
                                    <div>

                                        <label className="block mt-2">Semester:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.semester} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">Mobile No.:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.mobileNo} </label>
                                    </div>
                                </div>
                                <div className=''>
                                    <div>
                                        <label className="block mt-2">S/O,D/O</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.fatherName} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">Father's Contact No.:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.fatherNo} </label>

                                    </div>
                                    <div>
                                        <label className="block mt-2">Father's Occupation:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.fatherOccupation} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">Annual Income:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.annualIncome} </label>
                                    </div>
                                    <div>
                                        <label className="">Siblings: </label><br />
                                        <label className='font-bold text-lg uppercase'> {selectedUser.siblings} </label> <br />
                                    </div>
                                    {selectedUser.siblings === 'Yes' && (
                                        <div>
                                            <label className="">No of Siblings: </label> <br />
                                            <label className='font-bold text-lg uppercase'> {selectedUser.siblingsNo} </label><br />
                                            <label className="">Siblings Occupation: </label> <br />
                                            <label className='font-bold text-lg uppercase'> {selectedUser.siblingsOccupation} </label><br />
                                            <label className="">Siblings Annual Income: </label> <br />
                                            <label className='font-bold text-lg uppercase'> {selectedUser.siblingsIncome} </label>
                                        </div>
                                    )}


                                </div>

                                <div className=''>
                                    <div>
                                        <label className="block mt-2">Hostel:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.hostel} </label>
                                    </div>

                                    {/* </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10  rounded-xl"> */}


                                    {/* <div className='uppercase'>
                                    <label className="block mb-1">Community:</label>{selectedUser.community}

                                </div> */}


                                    {/* <div className='uppercase'>
                                    <label className="block mb-1">Email Id:</label>{selectedUser.emailId}

                                </div>

                                <div>
                                    <label className="block mb-1">Aadhar no:</label>{selectedUser.aadhar}

                                </div> */}

                                    <div>

                                        <label className="block mt-2">Special Category:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.specialCategory} </label>
                                    </div>
                                    <div>

                                        <label className="block mt-2">Religion:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.religion} </label>
                                    </div>
                                    <div>

                                        <label className="block mt-2">Permanent Address</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.address} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">State:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.state} </label>
                                    </div>
                                    <div>

                                        <label className="block mt-2">District:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.district} </label>
                                    </div>
                                    <div>
                                        <label className="block mt-2">Pincode:</label>
                                        <label className='font-bold text-lg uppercase'> {selectedUser.pin} </label>
                                    </div>

                                </div>
                            </div>
                            {/* Education Details section */}
                            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-10 rounded-xl">
                                        {selectedUser.semester === 'I' && (
                                            <div className='grid grid-cols-1 md:grid-cols-4 '>
                                                <div>
                                                    <label className="block mt-2 ">Last School Name:</label>
                                                    <label className='font-bold text-lg uppercase -mr-96'> {selectedUser.schoolName} </label>
                                                </div>
                                                <div>

                                                </div>
                                                <div>
                                                    <label className="block mt-2">Percentage of Mark:</label>
                                                    <label className='font-bold text-lg uppercase'> {selectedUser.percentageOfMarkSchool} </label>
                                                </div>
                                                <div>
                                                    <label className='block mt-2'>Year of Passing: </label>
                                                    <label className='font-bold text-lg uppercase'> {selectedUser.yearOfPassing} </label>
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 w-auto ">
                                            <div className="font-bold border border-black text-left py-3 px-5">Percentage of Mark</div>
                                            <div className="font-bold border border-black text-left py-3 px-5">{selectedUser.semPercentage === 0 ? 'Pending' : selectedUser.semPercentage}</div>
                                            <div className="font-bold border border-black text-left py-3 px-5">Class Attendance Percentage</div>
                                            <div className="font-bold border border-black text-left py-3 px-5"> {selectedUser.classAttendancePer === 0 ? 'Pending' : selectedUser.classAttendancePer}</div>
                                            <div className="font-bold border border-black text-left py-3 px-5">Deeniyath Percentage</div>
                                            <div className="font-bold border border-black text-left py-3 px-5">{selectedUser.deeniyathPer === 0 ? 'Pending' : selectedUser.deeniyathPer}</div>
                                        </div>

                                    </div>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl mt-5">
                                    {selectedUser.arrear !== 0 && (
                                        <div>
                                            <label className="">No. Of Arrear :</label>{selectedUser.arrear}

                                        </div>
                                    )}

                                    {selectedUser.fresherOrRenewal === 'Renewal' && (
                                        <div>
                                            <label className="">Last Time Credited Amount:</label>{selectedUser.lastCreditedAmt}

                                            {/* <a href={`http://localhost:3001/${selectedUser.jamath}`} target="_blank" rel="noopener noreferrer">Download Jamath File</a> */}

                                        </div>
                                    )}

                                    <div>
                                        <label className="">Jamath:</label>
                                        {selectedUser.jamath}
                                        {/* <a href={`http://localhost:3001/${selectedUser.jamath}`} target="_blank" rel="noopener noreferrer">Download Jamath File</a> */}
                                        <img src={selectedUser.jamath} alt="Jamath" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* renewal form data retrive */}
                        <div className=' ml-80'>
                            <button
                                onClick={() => handleAccept(selectedUser)}
                                className={`px-4 py-2 ml-20 rounded-lg ${selectedUser.action !== 0 ? 'bg-gray-400 text-gray-700' : 'bg-green-500 text-white hover:bg-black'}`}
                                disabled={selectedUser.action !== 0}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(selectedUser)}
                                className={`px-4 py-2 ml-2 rounded-lg ${selectedUser.action !== 0 ? 'bg-gray-400 text-gray-700' : 'bg-red-500 text-white hover:bg-black'}`}
                                disabled={selectedUser.action !== 0}
                            >
                                Reject
                            </button>
                            <button
                                className="mt-4 px-4 py-2 ml-2 bg-red-500 text-white rounded-lg  hover:bg-black mr-2"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Accept Session */}
            {showModals && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 w-3/4 h-3/4 text-black rounded-lg overflow-auto p-6">
                        <form onSubmit={Submit} className='border border-white gap-1'>
                            <div className='grid grid-cols-4     mt-10 text-xl w-auto p-4'>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Register No.:</label> */}
                                    {selectedUser.registerNo}
                                </div>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Name:</label> */}
                                    {selectedUser.name}
                                </div>
                                <div className='uppercase font-bold'>
                                    {/* <label className="block mb-1">Department:</label> */}
                                    {selectedUser.dept}
                                </div>

                                <div className='uppercase font-bold'>
                                    <label className="block mb-1"></label>{selectedUser.specialCategory}
                                </div>
                                <div className='flex inline-flex'>
                                    <input
                                        type="radio"
                                        name="zakkath"
                                        id="zakkath"
                                        checked={zakkath}
                                        onChange={(e) => setZakkath(e.target.checked)}
                                        className="scale-200"
                                    />
                                    <label htmlFor="zakkath" className="ml-3 mt-11 font-bold">Zakkath</label>
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


                            {submittedData.length > 0 && (
                                <div>

                                    {submittedData.map((submission, index) => (
                                        <div key={index} className=' grid grid-cols-4'>
                                            <div className=''> {index + 1}:</div>
                                            <div className=' w-auto '>  {submission.scholtype}</div>
                                            <div className=' w-auto '>  {submission.scholamt}</div>

                                        </div>
                                    ))}
                                </div>
                            )}


                            <div className="mt-32 mr-12 mb-5 flex justify-end">

                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-6 text-lg rounded-lg hover:bg-black"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-600 text-white py-2 px-6 text-lg ml-4 rounded-lg hover:bg-black"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }

            {/* Reject Session */}
            {
                showModalReject && selectedUser && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-red-400 w-3/4 h-3/4 text-black rounded-lg overflow-auto p-6">
                            <form onSubmit={submitReject} className='border border-white gap-1 h-3/4 mt-12'>
                                <div className='grid grid-cols-4 w-auto p-4 text-xl text-center'>
                                    <div className='uppercase font-bold'>
                                        {/* <label className="block mb-1">Register No.:</label> */}
                                        {selectedUser.registerNo}
                                    </div>
                                    <div className='uppercase font-bold'>
                                        {/* <label className="block mb-1">Name:</label> */}
                                        {selectedUser.name}
                                    </div>
                                    <div className='uppercase font-bold'>
                                        {/* <label className="block mb-1">Department:</label> */}
                                        {selectedUser.dept}
                                    </div>
                                    <div className='uppercase font-bold'>
                                        <label className="block mb-1"></label>{selectedUser.specialCategory}
                                    </div>
                                    <div className='ml-10 mt-10 font-bold'>
                                        <label>Reason</label>

                                        <select
                                            name="ScholarshipCategory"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="ml-3 mt-10 w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="Reason1">Reason1</option>
                                            <option value="Reason2">Reason2</option>
                                            <option value="Reason3">Reason3</option>


                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-black"
                                        >
                                            Submit
                                        </button>

                                        <button
                                            type="button"
                                            className=" bg-red-600 text-white py-2 px-5 ml-4 rounded-lg hover:bg-black"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Action;
