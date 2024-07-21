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
    const [specialCategories, setSpecialCategories] = useState({
        muaddin: false,
        hazrath: false,
        fatherMotherSeparated: false,
        fatherExpired: false,
        singleparent: false,
    });
    // const [donorMapping, setDonorMapping] = useState({});
    // const [scholarshipRows, setScholarshipRows] = useState([{ scholtype: '', scholdonar: '', scholamt: '' }]);


    useEffect(() => {
        const fetchFreshUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fresh');
                setUsers(response.data);
                setFilterUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRenewalUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/renewal');
                setRusers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFreshUsers();
        fetchRenewalUsers();
    }, []);


    // useEffect(() => {
    //     let combinedUsers = [...users, ...rusers];
    //     let filteredUsers = [];

    //     if (radioValue === 'all') {
    //         filteredUsers = combinedUsers;
    //     } else if (radioValue === 'in-progress') {
    //         filteredUsers = combinedUsers.filter(user => user.action === 0);
    //         if (progressRadioValue !== 'all') {
    //             filteredUsers = filteredUsers.filter(user => 
    //                 (user.fresherOrRenewal || '').toLowerCase() === progressRadioValue
    //             );
    //         }
    //     }
    //     setFilterUsers(filteredUsers);
    // }, [radioValue, progressRadioValue, users, rusers]);


    // Handle Progress Radio Change
    const handleProgressRadioChange = (e) => {
        const value = e.target.value ? e.target.value.toLowerCase() : '';
        setProgressRadioValue(value);
    };

    // Use Effect to Filter Users
    useEffect(() => {
        let combinedUsers = [...users, ...rusers];
        console.log('Combined Users:', combinedUsers);

        let filteredUsers = [];

        if (radioValue === 'all') {
            filteredUsers = combinedUsers;
        } else if (radioValue === 'in-progress') {
            filteredUsers = combinedUsers.filter(user => user.action === 0);
            console.log('Filtered Users after action check:', filteredUsers);

            if (progressRadioValue !== 'all') {
                filteredUsers = filteredUsers.filter(user => {
                    const userFresherOrRenewal = (user.fresherOrRenewal || '').toLowerCase().trim();
                    const selectedProgress = progressRadioValue.toLowerCase().trim();
                    return userFresherOrRenewal === selectedProgress;
                });
            }
        }

        if (Object.values(specialCategories).some(value => value)) {
            filteredUsers = filteredUsers.filter(user => {
                const specialCategory = (user.specialCategory || '').toLowerCase();
                return (
                    (specialCategories.muaddin && specialCategory.includes('muaddin')) ||
                    (specialCategories.hazrath && specialCategory.includes('hazrath')) ||
                    (specialCategories.fatherMotherSeparated && specialCategory.includes('fatherMotherSeparated')) ||
                    (specialCategories.fatherexpired && specialCategory.includes('father expired')) ||
                    (specialCategories.singleparent && specialCategory.includes('singleparent'))
                );
            });
        }

        console.log('Filtered Users:', filteredUsers);
        setFilterUsers(filteredUsers);
    }, [radioValue, progressRadioValue, specialCategories, users, rusers]);

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

    const handleRadioChange = (e) => {
        // Ensure e.target.value is a string before calling .toLowerCase()
        const value = e.target.value ? e.target.value.toLowerCase() : '';
        setRadioValue(value);
    };

    const handleSpecialCategoryChange = (e) => {
        const { name, checked } = e.target;
        setSpecialCategories(prevState => ({ ...prevState, [name.toLowerCase()]: checked }));
    };


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
            .then(response => response.data)
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
                    console.log('Fetched Scholarship Types:', data); // Debugging log
                    setScholtypes(data);
                })
                .catch(error => {
                    console.error('Error fetching scholarship types:', error);
                });
        }
    }, [showModals]);



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

    const ScholSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3001/api/admin/current-acyear')
            .then(response => {
                if (response.data.success) {
                    const acyear = response.data.acyear.acyear;

                    // Check the donor details and balance amount before saving to freshamt
                    axios.put(`http://localhost:3001/api/admin/donar/${scholdonar}`, {
                        amount: scholamt
                    })
                        .then(result => {
                            console.log(result);
                            const updatedBalance = result.data.updatedBalance;
                            window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

                            return axios.post('http://localhost:3001/api/admin/freshamt', {
                                fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt, acyear
                            });
                        })
                        .then(result => {
                            const newSubmission = { scholtype, scholdonar, scholamt };
                            setSubmittedData([...submittedData, newSubmission]);
                            refreshInputs();

                            console.log(result);

                        })
                        // .then(result => {
                        //     console.log(result);
                        //     // Update the action value in the applicant model
                        //     return axios.post('http://localhost:3001/api/admin/action', {
                        //         registerNo
                        //     });
                        // })
                        // .then(result => {
                        //     console.log(result);
                        //     window.location.reload();
                        // })
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
                            // window.location.reload();
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

    if (!data) return <div ><center> <img src={Loading} alt="" className=" w-36 h-80  " /></center></div>;


    return (
        <div>
            <div className='end-px'>
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
                <div className='end-px text-white border border-amber-300 w-72 mt-4'>
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
                {radioValue === 'in-progress' && (
                    <div className='flex inline-flex gap-28'>
                        <div className='end-px text-white border border-amber-300 w-72 mt-4 '>
                            <input
                                type="radio"
                                id="all-progress"
                                name="progress"
                                value="all"
                                className='scale-200 ml-8'
                                onChange={handleProgressRadioChange}
                                defaultChecked
                            />
                            <label htmlFor="all-progress" className='form-radio ml-2 text-lg'>All</label>

<<<<<<< HEAD
                            <input
                                type="radio"
                                id="fresher"
                                name="progress"
                                value="Fresher"
                                className='scale-200 ml-4'
                                onChange={handleProgressRadioChange}
                            />
                            <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Fresher</label>

                            <input
                                type="radio"
                                id="renewal"
                                name="progress"
                                value="renewal"
                                className='scale-200 ml-4'
                                onChange={handleProgressRadioChange}
                            />
                            <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>
                        </div>
                        <div className='end-px text-white border border-amber-300 w-auto mt-4'>
                            <input
                                type="checkbox"
                                id="muaddin"
                                name="muaddin"
                                className='scale-200 ml-4'
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
                                id="fatherMotherSeparated"
                                name="fatherMotherSeparated"
                                className='scale-200 ml-4'
                                onChange={handleSpecialCategoryChange}
                            />
                            <label htmlFor="fatherMotherSeparated" className='form-checkbox ml-2 text-lg'>Father & Mother Separated</label>

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
                    </div>

                )}
=======
                <input
                    type="radio"
                    id="renewal"
                    name="search"
                    value="Renewal"
                    className='scale-200 ml-4'
                    onChange={handleRadioChange}
                />
                <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>
                
>>>>>>> f6c6b5621e82a5c650ac5bc4271c4f6301126136
            </div>
            <div className='mt-6 pl-0'>
                <div className="grid grid-cols-4 w-auto bg-amber-300">
                    <div className="font-bold border border-white text-center py-3">REGISTER NO.</div>
                    <div className="font-bold border border-white text-center py-3">NAME</div>
                    <div className="font-bold border border-white text-center py-3">DEPARTMENT</div>
                    <div className="font-bold border border-white text-center py-3">ACTION</div>
                </div>
                {filterUsers.map((user, index) => (
                    <div key={`${user.registerNo}-${index}`} className="grid grid-cols-4 w-auto bg-amber-200">
                        <div className="font-bold border border-white text-center uppercase py-3">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">{user.dept}</div>
                        <div className="font-bold border border-white text-center uppercase py-3">
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
                                className="px-4 py-1 ml-1 bg-green-500 text-white hover:bg-black rounded-lg"
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                onClick={() => handleReject(user)}
                                className="px-4 py-1 ml-1 bg-red-500 text-white hover:bg-black rounded-lg"
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
            <div className=' text-white flex inline-flex text-xl bg-blue-600 py-5 grid grid-cols-2 gap-4 mt-4'>
                <div className='border border-white rounded-lg  grid grid-cols-2 p-4'>
                    <div className=' w-72 ml-7' > Number of Students Applied    </div><div className='ml-16'> :   {data.totalApplication} </div>
                    <div className=' w-72 ml-7' > Number of Students Benefitted : </div><div className='ml-20'> {data.totalBenefit} </div>
                </div>
                <div className='border border-white rounded-lg   p-4 grid grid-cols-2 '>
                    <div className='  '>Scholarship Received :</div><div className='-ml-10'> {totaldonaramt}</div>
                    <div className=' '>Scholarship Awarded  : </div><div className='-ml-10'> {totalamount}  </div>
                </div>
            </div>
            {showModal && selectedUser && (

                <div className="fixed inset-0  flex items-center justify-center  bg-black bg-opacity-50">
                    <div className="bg-white w-3/4 h-3/4 rounded-lg overflow-auto p-6">
                        {/* fresher form data retrive */}
                        <div>
                            <div className=' '>
                                <div>

                                    <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                                    <div className="space-x-4 inline-flex border p-10 rounded-xl">
                                        <div className='uppercase'>
                                            {selectedUser.fresherOrRenewal}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

                                <div className='uppercase'>
                                    {/* <label className="block mb-1">Register No.:</label> */}
                                    {selectedUser.registerNo}

                                    {/* <label className="block mb-1">Name:</label> */}
                                    <div>
                                        {selectedUser.name}
                                    </div>

                                    <div>
                                        {/* <label className="block mb-1">Department:</label> */}
                                        {selectedUser.dept}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Section</label> */}
                                        {selectedUser.section}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">UG Or PG</label> */}{selectedUser.ugOrPg}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Programme Category</label> */}
                                        {selectedUser.procategory}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Semester:</label>  */}
                                        {selectedUser.semester}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Mobile No.:</label> */}
                                        {selectedUser.mobileNo}
                                    </div>
                                </div>
                                <div className='uppercase'>
                                    <div>
                                        <label className="block mb-1">S/O,D/O</label>{selectedUser.fatherName}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Father's Contact No.:</label> */}

                                        {/* <label className="block mb-1">Father's Occupation:</label> */}
                                        {selectedUser.fatherOccupation}
                                    </div>
                                    <div>
                                        {selectedUser.fatherNo}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Annual Income:</label> */}
                                        {selectedUser.annualIncome}
                                    </div>
                                    <label className="">Siblings: </label>{selectedUser.siblings}

                                </div>

                                <div className='uppercase'>
                                    <div>
                                        {/* <label className="block mb-1">Hostel:</label> */}
                                        {selectedUser.hostel}
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

                                        {/* <label className="block mb-1">Special Category:</label> */}
                                        {selectedUser.specialCategory}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Religion:</label> */}
                                        {selectedUser.religion}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Permanent Address</label> */}
                                        {selectedUser.address}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">State:</label> */}
                                        {selectedUser.state}
                                    </div>
                                    <div>
                                        {/* 
                                    <label className="block mb-1">District:</label> */}
                                        {selectedUser.district}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Pincode:</label> */}
                                        {selectedUser.pin}
                                    </div>

                                </div>
                            </div>
                            {/* Education Details section */}
                            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
                                        <div className='uppercase'>
                                            <div>
                                                <label className="">Last School Name:</label>{selectedUser.schoolName}
                                            </div>
                                            <div>
                                                <label className="">Percentage of Mark:</label>{selectedUser.percentageOfMarkSchool}
                                            </div>
                                        </div>

                                        <div className='uppercase'>
                                            <div>
                                                <label className="">Semester:</label>{selectedUser.preSemester}
                                            </div>
                                            <div>
                                                <label className="">Percentage of Mark:</label>{selectedUser.semPercentage}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

                                    <div>
                                        <label className="">Class Attendance Percentage:</label>{selectedUser.classAttendancePer}

                                    </div>
                                    <div>
                                        <label className="">Deeniyath Percentage:</label>{selectedUser.deeniyathPer}

                                    </div>
                                    <div>
                                        <label className="">No. Of Arrear :</label>{selectedUser.arrear}

                                    </div>
                                    <div>
                                        <label className="">Last Time Credited Amount:</label>{selectedUser.lastCreditedAmt}

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* renewal form data retrive */}
                        <div className=' ml-80'>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-black mr-2"
                                onClick={() => handleAccept(selectedUser)}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black mr-2"
                                onClick={() => handleReject(selectedUser)}
                            >
                                Reject
                            </button>
                            <button
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg  hover:bg-black mr-2"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModals && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-teal-600 w-3/4 h-72 text-white rounded-lg overflow-auto p-6">
                        <form onSubmit={Submit}>
                            <div className='grid grid-cols-3 w-auto p-4'>
                                <div className='uppercase'>
                                    <label className="block mb-1">Register No.:</label>{selectedUser.registerNo}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Name:</label>{selectedUser.name}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Department:</label>{selectedUser.dept}
                                </div>
                                {/* <div>
                                    <label className="block mb-1">Scholarship Type</label>
                                    <select
                                        name="ScholarshipCategory"
                                        value={scholtype}
                                        onChange={(e) => setScholType(e.target.value)}
                                        className=" w-48 p-2 border rounded-md text-slate-950 lg:w-48"

                                    >
                                        <option value="">Select</option>
                                        <option value="Endowment">Endowment</option>
                                        <option value="JMC Staff">JMC Staff</option>
                                        <option value="Alumni">Alumni</option>
                                        <option value="Well Wishers">Well Wishers</option>
                                        <option value="Singapore Chapter">Singapore Chapter</option>
                                        <option value="Trichy Chapter">Trichy Chapter</option>
                                        <option value="Chennai Chapter">Chennai Chapter</option>
                                        <option value="Kerala Chapter">Kerala Chapter</option>
                                        <option value="Kuwait Chapter">Kuwait Chapter</option>
                                        <option value="Jeddah Chapter">Jeddah Chapter</option>
                                        <option value="Koothanallur Chapter">Koothanallur Chapter</option>
                                        <option value="USA Chapter">USA Chapter</option>
                                        <option value="Burnei Chapter">Burnei Chapter</option>
                                        <option value="Riyadh Chapter">Riyadh Chapter</option>
                                        <option value="Malaysia Chapter">Malaysia Chapter</option>
                                        <option value="Tenkasi Chapter">Tenkasi Chapter</option>
                                        <option value="UK Chapter">UK Chapter</option>
                                        <option value="Kongu Nadu Chapter">Kongu Nadu Chapter</option>
                                        <option value="Bahrain Chapter">Bahrain Chapter</option>
                                        <option value="Bengaluru Chapter">Bengaluru Chapter</option>
                                        <option value="UAE Chapter">UAE Chapter</option>
                                        <option value="Qatar Chapter">Qatar Chapter</option>
                                        <option value="Others">Others</option>
                                    </select>
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
                                        <div key={index} className=' grid grid-cols-4'>
                                            <div className=''>Submission {index + 1}:</div>
                                            <div className=' w-60 '>Scholarship Type: {submission.scholtype}</div>
                                            <div className=' w-60 '>Donor: {submission.scholdonar}</div>
                                            <div className=' w-60 '>Scholarship Amount: {submission.scholamt}</div>

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
                                    className="bg-red-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
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
                        <div className="bg-red-400 w-3/4 h-96 rounded-lg overflow-auto p-6">
                            <form onSubmit={submitReject}>
                                <div className='grid grid-cols-3 w-auto p-4 border border-white gap-1 text-center'>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Register No.:</label>{selectedUser.registerNo}
                                    </div>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Name:</label>{selectedUser.name}
                                    </div>
                                    <div className='uppercase'>
                                        <label className="block mb-1">Department:</label>{selectedUser.dept}
                                    </div>
                                    <div>
                                        <label>Reason</label>
                                        <input
                                            type='text'
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-black"
                                        >
                                            Submit
                                        </button>

                                        <button
                                            type="button"
                                            className="bg-red-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
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
