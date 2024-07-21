import { useEffect, useState, React } from 'react';
import axios from "axios";
import Loading from '../../assets/Pulse.svg'

function Action() {

    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [donorMapping, setDonorMapping] = useState({});
    const [data, setData] = useState(null);
    const [totalamount, setTotalAmount] = useState(0);
    const [totaldonaramt, setDonaramt] = useState(0);
    // const [rusers, setRusers] = useState([]);
    // const [donars, setDonars] = useState([]);
    // const [selectedUser, setSelectedUser] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    // const [showModals, setShowModals] = useState(false);
    // const [scholamt, setScholamt] = useState('');
    // const [scholtype, setScholType] = useState('');
    // const [registerNo, setRegisterNo] = useState('');
    // const [name, setName] = useState('');
    // const [dept, setDept] = useState('');
    // const [fresherOrRenewal, setFresherOrRenewal] = useState('');
    // const [scholdonar, setScholdonar] = useState([]);



    useEffect(() => {
        const fetchUsersAndDonors = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:3001/api/admin/freshamt');
                const donorsResponse = await axios.get('http://localhost:3001/api/admin/donors');

                const usersData = usersResponse.data;
                const donorsData = donorsResponse.data;

                const donorMap = donorsData.reduce((map, donor) => {
                    map[donor._id] = donor.name;
                    return map;
                }, {});

                setUsers(usersData);
                setFilterUsers(usersData);
                setDonorMapping(donorMap);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsersAndDonors();
    }, []);

    // useEffect(() => {
    //     axios.get('http://localhost:3001/renewal')
    //         .then(response => {
    //             setRusers(response.data);
    //             setFilterUsers(prevUsers => [...prevUsers, ...response.data]);
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    // const handleViewClick = (user) => {
    //     setSelectedUser(user);
    //     setShowModal(true);
    // };

    // const handleAccept = (user) => {
    //     setSelectedUser(user);
    //     setDonars(user);
    //     setShowModals(true);
    //     setFresherOrRenewal(user.fresherOrRenewal);
    //     setRegisterNo(user.registerNo);
    //     setName(user.name);
    //     setDept(user.dept);

    // };

    // const fetchDonars = () => {
    //     return axios.get('http://localhost:3001/api/admin/donar')
    //         .then(response => response.data)
    //         .catch(err => {
    //             console.error('Error fetching donors:', err);
    //             return [];
    //         });
    // };

    // useEffect(() => {
    //     if (showModals) {
    //         fetchDonars()
    //             .then(data => {
    //                 console.log('Fetched Donors:', data); // Debugging log
    //                 setDonars(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching donors:', error);
    //             });
    //     }
    // }, [showModals]);




    // const closeModal = () => {
    //     setShowModal(false);
    //     setShowModals(false);
    //     setSelectedUser(null);

    // };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();

        const filteredUsers = users.filter((user) =>
            user.dept.toLowerCase().includes(searchText) ||
            user.registerNo.toLowerCase().includes(searchText) ||
            user.name.toLowerCase().includes(searchText) ||
            // user.fresherOrRenewal.toLowerCase().includes(searchText) ||
            user.scholdonar.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };
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

    // const Submit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:3001/api/admin/freshamt', {
    //         fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt
    //     })
    //         .then(result => {
    //             console.log(result);
    //             window.alert("Submitted Successfully");
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             window.alert("Submission failed!");
    //         });

    // };
    // const Submit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:3001/api/admin/freshamt', {
    //         fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt
    //     })
    //         .then(result => {
    //             console.log(result);
    //             //check the donar details and balance amt
    //             return axios.put(`http://localhost:3001/api/admin/donar/${scholdonar}`, {
    //                 amount: scholamt
    //             });
    //         })
    //         .then(result => {
    //             console.log(result);
    //             const updatedBalance = result.data.updatedBalance;
    //             window.alert(`Submitted Successfully. Available balance for donor: ${updatedBalance}`);

    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             window.alert("Submission failed!");
    //             window.location.reload();
    //         });
    // };
    // show the no of applicant in footer
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

    const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};


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
                {/* <input
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
                <label htmlFor="renewal" className='form-radio ml-2 text-lg'>Renewal</label> */}
            </div>
            <div className="grid grid-cols-6 w-auto bg-amber-300 mt-4">
                {/* <div className=""> */}
                {/* <div className="grid grid-cols-4 w-auto bg-amber-200 p-4  gap-1 text-center"> */}
                {/* <div className="font-bold border border-white text-center">Application</div> */}
                <div className="font-bold border border-white text-center py-3">REGISTER NO.</div>
                <div className="font-bold border border-white text-center py-3">NAME</div>
                <div className="font-bold border border-white text-center py-3">DEPARTMENT</div>
                <div className="font-bold border border-white text-center py-3">SCHOLARSHIP TYPE</div>
                <div className="font-bold border border-white text-center py-3">DONOR NAME</div>
                <div className='font-bold border border-white text-center py-3'>AMOUNT</div>
                {/* <div className="font-bold border border-white text-center">Action</div> */}

            </div>
            {filterUsers.map((user) => (
                <div key={user.registerNo} className="grid grid-cols-6 bg-amber-200">
                    {/* <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div> */}
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.registerNo}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.name}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.dept}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.scholtype}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{donorMapping[user.scholdonar] || user.scholdonar}</div>
                    <div className="font-bold border border-white text-center py-3 uppercase">{user.scholamt}</div>
                    {/* <div className="font-bold border border-white text-center uppercase">
                            <button
                                type="button"
                                onClick={() => handleViewClick(user)}
                                className="bg-blue-500 text-white py-1 ml-1 px-3 hover:bg-black rounded-lg mt-1"
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
                                className="px-4 py-1 ml-1 bg-red-500 text-white hover:bg-black rounded-lg"
                            >
                                Reject
                            </button>
                        </div> */}
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
                // ))} */}</div>
            {/* </div> */}
            {/* <div>
                <div>Total Benefits / Applicants:  
                    {data.totalBenefit} / {data.totalApplication} </div>

            </div> */}


            {/* {showModals && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 w-3/4 h-96 rounded-lg overflow-auto p-6">
                        <form onSubmit={Submit}>
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
                                    <label className="block mb-1">Scholarship Type</label>
                                    <select
                                        name="ScholarshipCategory"
                                        value={scholtype}
                                        onChange={(e) => setScholType(e.target.value)}
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
                                    <label className="block mb-1">Donar</label>
                                    <select
                                        name="ScholarshipCategory"
                                        value={scholdonar}
                                        onChange={(e) => setScholdonar(e.target.value)}
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
                                        className="border p-2 rounded w-72"
                                        value={scholamt}
                                        onChange={(e) => setScholamt(e.target.value)}
                                        required
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
            )} */}

            <div className=' text-white flex inline-flex text-xl bg-blue-600 py-5 grid grid-cols-2 gap-4 mt-4'>
                <div className='border border-white rounded-lg  grid grid-cols-2 p-4'>
                    <div className=' w-72 ml-7' > Number of Students Applied    </div><div className='ml-16'> :   {data.totalApplication} </div>
                    <div className=' w-72 ml-7' > Number of Students Benefitted : </div><div className='ml-20'> {data.totalBenefit} </div>
                </div>
                <div className='border border-white rounded-lg   p-4 grid grid-cols-2 '>
                    <div className='  '>Scholarship Received :</div><div className='-ml-10'> {formatCurrency(totaldonaramt)}</div>
                    <div className=' '>Scholarship Awarded  : </div><div className='-ml-10'> {formatCurrency(totalamount)}  </div>
                </div>
            </div>
        </div>
    );
}

export default Action;
