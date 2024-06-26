import { useEffect, useState, React } from 'react';
import axios from "axios";

function Action() {

    const [users, setUsers] = useState([]);
    const [rusers, setRusers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterUsers, setFilterUsers] = useState([]);
    const [showModals, setShowModals] = useState(false);
    const [scholamt, setScholamt] = useState('');
    const [scholtype, setScholType] = useState('');
    const [registerNo, setRegisterNo] = useState('');
    const [name, setName] = useState('');
    const [dept, setDept] = useState('');
    const [fresherOrRenewal, setFresherOrRenewal] = useState('');
    const [scholdonar, setScholdonar] = useState('');

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
            .then(response => setRusers(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleAccept = (user) => {
        setSelectedUser(user);
        setShowModals(true);
        setFresherOrRenewal(user.fresherOrRenewal);
        setRegisterNo(user.registerNo);
        setName(user.name);
        setDept(user.dept);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowModals(false);
        setSelectedUser(null);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = users.filter((user) => 
            user.dept.toLowerCase().includes(searchText) ||
            user.registerNo.toLowerCase().includes(searchText) ||
            user.fresherOrRenewal.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/admin/freshamt', {
            fresherOrRenewal, registerNo, name, dept, scholtype, scholdonar, scholamt
        })
        .then(result => {
            console.log(result);
            window.alert("Submitted Successfully");
          })
          .catch(err => {
            console.log(err);
            window.alert("Submission failed!");
          });
    
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
            </div>
            <div className='mt-6 pl-0'>
                <div className="grid grid-cols-6 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                    <div className="font-bold border border-white text-center">Application</div>
                    <div className="font-bold border border-white text-center">Dept</div>
                    <div className="font-bold border border-white text-center">Register No.</div>
                    <div className="font-bold border border-white text-center">Name</div>
                    <div className="font-bold border border-white text-center">Action</div>
                    <div className="font-bold border border-white text-center">Application View</div>
                </div>
                {filterUsers.map((user) => (
                    <div key={user.registerNo} className="grid grid-cols-6 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                        <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.dept}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.name}</div>
                        <div className="font-bold border border-white text-center uppercase">
                            <button
                                type="button"
                                onClick={() => handleViewClick(user)}
                                className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                            >
                                View
                            </button>
                        </div>
                        <div className='border border-white text-center py-1'>
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
                ))}
                {rusers.map((user) => (
                    <div key={user.registerNo} className="grid grid-cols-6 w-auto bg-amber-200 p-4 border border-white gap-1 text-center">
                        <div className="font-bold border border-white text-center uppercase">{user.fresherOrRenewal}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.dept}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.registerNo}</div>
                        <div className="font-bold border border-white text-center uppercase">{user.name}</div>
                        <div className="font-bold border border-white text-center">
                            <button
                                type="button"
                                onClick={() => handleViewClick(user)}
                                className="bg-blue-500 text-white py-1 px-3 hover:bg-black rounded-lg mt-1"
                            >
                                View
                            </button>
                        </div>
                        <div className='border border-white text-center py-1'>
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
                ))}
            </div>

            {showModal && selectedUser &&  (

<div className="fixed inset-0  flex items-center justify-center  bg-black bg-opacity-50">
    <div className="bg-white w-3/4 h-3/4 rounded-lg overflow-auto p-6">
        {/* fresher form data retrive */}
        <div>
            <div className=' '>
                <div>

                    <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                    <div className="space-x-4 inline-flex border p-10 rounded-xl">
                        <div className='uppercase'>
                            <label> Application: </label> {selectedUser.fresherOrRenewal}
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">

                <div className='uppercase'>
                    <label className="block mb-1">UG Or PG</label>{selectedUser.ugOrPg}
                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Programme Category</label>{selectedUser.procategory}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Semester:</label>{selectedUser.semester}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Hostel:</label>{selectedUser.hostel}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10  rounded-xl">
                <div className='uppercase'>
                    <label className="block mb-1">Register No.:</label>{selectedUser.registerNo}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Name:</label>{selectedUser.name}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Department:</label>{selectedUser.dept}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Section</label>{selectedUser.section}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">
                <div className='uppercase'>
                    <label className="block mb-1">Special Category:</label>{selectedUser.specialCategory}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Religion:</label>{selectedUser.religion}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Community:</label>{selectedUser.community}

                </div>

                <div className='uppercase'>
                    <label className="block mb-1">Mobile No.:</label>{selectedUser.mobileNo}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Email Id:</label>{selectedUser.emailId}

                </div>

                <div>
                    <label className="block mb-1">Aadhar no:</label>{selectedUser.aadhar}

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
                <div className='uppercase'>
                    <label className="block mb-1">Father's Name:</label>{selectedUser.fatherName}


                    <label className="block mb-1">Father's Contact No.:</label>{selectedUser.fatherNo}



                    <label className="block mb-1">Father's Occupation:</label>{selectedUser.fatherOccupation}


                    <label className="block mb-1">Annual Income:</label>{selectedUser.annualIncome}

                </div>
                <div className='uppercase'>
                    <label className="block mb-1">Permanent Address</label>{selectedUser.address}

                    <label className="block mb-1">State:</label>{selectedUser.state}

                    <label className="block mb-1">District:</label>{selectedUser.district}

                    <label className="block mb-1">Pincode:</label>{selectedUser.pin}


                </div>
            </div>
            {/* Education Details section */}
            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
            <div>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-10 rounded-xl">
                        <div className='uppercase'>
                            <label className="block mb-1">Last School Name:</label>{selectedUser.schoolName}

                        </div>
                        <div>

                        </div>
                        <div>
                            <label className="block mb-1">Percentage of Mark:</label>{selectedUser.percentageOfMarkSchool}

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-10 rounded-xl">
                        <div>
                            <label className="block mb-1">Semester:</label>{selectedUser.preSemester}

                        </div>
                        <div>
                            <label className="block mb-1">Percentage of Mark:</label>{selectedUser.semPercentage}

                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

                    <div>
                        <label className="block mb-1">Class Attendance Percentage:</label>{selectedUser.classAttendancePer}

                    </div>
                    <div>
                        <label className="block mb-1">Deeniyath Percentage:</label>{selectedUser.deeniyathPer}

                    </div>

                    <div>
                        <label className="block mb-1">Siblings</label>{selectedUser.siblings}
                    </div>
                    <div>
                        <label className="block mb-1">No. Of Arrear :</label>{selectedUser.arrear}

                    </div>
                    <div>
                        <label className="block mb-1">Last Time Credited Amount:</label>{selectedUser.lastCreditedAmt}

                    </div>
                </div>
            </div>
        </div>
        {/* renewal form data retrive */}


        <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={closeModal}
        >
            Close
        </button>
    </div>
</div>
)}

            {showModals && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 w-3/4 h-3/4 rounded-lg overflow-auto p-6">
                        <form onSubmit={Submit}>
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
                                            <option value="type1">Type 1</option>
                                            <option value="type2">Type 2</option>
                                            <option value="type3">Type 3</option>
                                            <option value="type4">Type 4</option>
                                            <option value="type5">Type 5</option>
                                            <option value="type6">Type 6</option>
                                            <option value="type7">Type 7</option>
                                            <option value="type8">Type 8</option>
                                            <option value="type9">Type 9</option>
                                            <option value="type10">Type 10</option>
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
                                            <option value="">Select</option>
                                            <option value="type1">Type 1</option>
                                            <option value="type2">Type 2</option>
                                            <option value="type3">Type 3</option>
                                            <option value="type4">Type 4</option>
                                            <option value="type5">Type 5</option>
                                            <option value="type6">Type 6</option>
                                            <option value="type7">Type 7</option>
                                            <option value="type8">Type 8</option>
                                            <option value="type9">Type 9</option>
                                            <option value="type10">Type 10</option>
                                        </select>
                                    </div>
                            <div>
                                <label className="block uppercase">Scholarship Amount:</label>
                                <input 
                                    type="text" 
                                    className="border p-2 rounded w-full" 
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
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Action;
