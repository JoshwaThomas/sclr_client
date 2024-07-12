import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../assets/Pulse.svg'

function Action() {

    const [users, setUsers] = useState([]);
    const [rusers, setRusers] = useState([]);
    const [donars, setDonars] = useState([]);
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
    // const [scholarshipRows, setScholarshipRows] = useState([{ scholtype: '', scholdonar: '', scholamt: '' }]);


    useEffect(() => {
        axios.get('http://localhost:3001/fresh')
            .then(response => {
                setUsers(response.data);
                setFilterUsers(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/renewal')
            .then(response => {
                setRusers(response.data);
                setFilterUsers(prevUsers => [...prevUsers, ...response.data]);
            })
            .catch(err => console.log(err));
    }, []);

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
        }
    }, [showModals]);




    const closeModal = () => {
        setShowModal(false);
        setShowModals(false);
        setShowModalReject(false);
        setSelectedUser(null);

    };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            user.dept.toLowerCase().includes(searchText) ||
            user.registerNo.toLowerCase().includes(searchText) ||
            user.name.toLowerCase().includes(searchText) ||
            user.fresherOrRenewal.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };
    const handleRadioChange = (e) => {
        const radioValue = e.target.value.toLowerCase();
        const allUsers = [...users, ...rusers];

        if (radioValue === 'all') {
            setFilterUsers(allUsers);
        } else {
            const filteredUsers = allUsers.filter(user =>
                user.fresherOrRenewal.toLowerCase() === radioValue
            );
            setFilterUsers(filteredUsers);
        }
    };
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


    const Submit = (e) => {
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
                            console.log(result);
                            // Update the action value in the applicant model
                            return axios.post('http://localhost:3001/api/admin/action', {
                                registerNo
                            });
                        })
                        .then(result => {
                            console.log(result);
                            window.location.reload();
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

    if (!data) return <div ><center><img src={Loading} alt="" className=" w-36 h-80  " /></center></div>;


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
                <input
                    type="radio"
                    id="all"
                    name="search"
                    value="All"
                    className='scale-200 ml-8'
                    onChange={handleRadioChange}
                />
                <label htmlFor="all" className='form-radio ml-2 text-lg'>All</label>

                <input
                    type="radio"
                    id="fresher"
                    name="search"
                    value="Fresh"
                    className='scale-200 ml-4'
                    onChange={handleRadioChange}
                />
                <label htmlFor="fresher" className='form-radio ml-2 text-lg'>Fresher</label>

                <input
                    type="radio"
                    id="renewal"
                    name="search"
                    value="Renewal"
                    className='scale-200 ml-4'
                    onChange={handleRadioChange}
                />
                <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label>
            </div>
            <div className='mt-6 pl-0'>
                <div className="grid grid-cols-4 w-auto bg-amber-300 ">
                    {/* <div className="font-bold border border-white text-center">Application</div> */}
                    <div className="font-bold border border-white text-center py-3">REGISTER NO.</div>
                    <div className="font-bold border border-white text-center py-3">NAME</div>
                    <div className="font-bold border border-white text-center py-3">DEPARTMENT</div>
                    <div className="font-bold border border-white text-center py-3">ACTION</div>

                </div>
                {filterUsers.map((user) => (
                    <div key={user.registerNo} className="grid grid-cols-4 w-auto bg-amber-200 ">
                        {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
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
                <div>
                    {/* {rusers.map((user) => (
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
                ))} */}</div>
            </div>
            <div className=' text-white flex inline-flex text-xl bg-blue-600 py-5 grid grid-cols-2 gap-10'>
                <div>
                     <div>  Number of Students Applied: {data.totalApplication} </div>
                    <div> Number of Students Benefitted: {data.totalBenefit} </div>
                </div>
                <div className='ml-90'>
                    <div className=' ml-'>
                        Scholarship Received: {totaldonaramt}</div>
                    <div className=' ml-'>Scholarship Awarded	: {totalamount}  </div>
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
                    <div className="bg-red-400 w-3/4 h-96 rounded-lg overflow-auto p-6">
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
                            </div>
                            <div>
                                <label className="block mb-1">Scholarship Type</label>
                                <select
                                    name="ScholarshipCategory"
                                    value={scholtype}
                                    onChange={(e) => setScholType(e.target.value)}
                                    className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"

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
                            </div>

                            <div>
                                <label className="block mb-1">Donar</label>
                                <select
                                    name="ScholarshipCategory"
                                    value={scholdonar}
                                    onChange={(e) => setScholdonar(e.target.value)}
                                    className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"

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
                                    className="border p-2 rounded w-72"
                                    value={scholamt}
                                    onChange={(e) => setScholamt(e.target.value)}

                                />
                            </div>


                            {/* {scholarshipRows.map((row, index) => (
                                <div key={index} className='grid grid-cols-3 w-auto p-4 border border-white gap-1 text-center'>
                                    <div>
                                        <label className="block mb-1">Scholarship Type</label>
                                        <select
                                            name="scholtype"
                                            value={row.scholtype}
                                            onChange={(e) => handleScholarshipChange(index, e)}
                                            className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                            required
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
                                    </div>
                                    <div>
                                        <label className="block mb-1">Donor</label>
                                        <select
                                            name="scholdonar"
                                            value={row.scholdonar}
                                            onChange={(e) => handleScholarshipChange(index, e)}
                                            className=" w-72 p-2 border rounded-md text-slate-950 lg:w-48"
                                            required
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
                                            type="text"
                                            name="scholamt"
                                            className="border p-2 rounded w-72"
                                            value={row.scholamt}
                                            onChange={(e) => handleScholarshipChange(index, e)}
                                            required
                                        />
                                    </div>
                                    {/* {index > 0 && (
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                            onClick={() => removeRow(index)}
                                        >
                                            Remove
                                        </button>
                                    )} 
                    </div>
                            ))}  */}
                            <div className="mt-4 flex justify-end">
                                {/* <button
                                    type="button"
                                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-black"
                                    onClick={addRow}
                                >
                                    Add Row
                                </button> */}
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
