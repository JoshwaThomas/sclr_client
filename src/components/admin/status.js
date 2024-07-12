import React, { useState } from 'react';
import axios from 'axios';

function Status() {
    const [registerNo, setRegisterNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const Submit = async (e) => {
        e.preventDefault();
        const result = await axios.get(`http://localhost:3001/api/admin/status/${registerNo}`);
        try {
            setStudent(result.data);
            setShowModal(true); // Show modal when student data is fetched
        } catch (err) {
            setStudent(null);
            alert('Student not found');
            setShowModal(false); // Hide modal if there's an error
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={Submit} className="space-y-4">
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
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        >
                            Check Status
                        </button>
                    </div>
                </form>
                {showModal && student && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-red-400 w-3/4 h-96 rounded-lg overflow-auto p-6">
                            <div className='grid grid-cols-3 w-auto p-4 text-white'>
                                <div className='uppercase'>
                                    <label className="block mb-1 ">Register No.:</label>
                                    {student.registerNo}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Name:</label>
                                    {student.name}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Department:</label>
                                    {student.dept}
                                </div>

                                <div className='uppercase'>
                                    {student.fresherOrRenewal}
                                </div>

                                <div>
                                    {/* <label className="block mb-1">Section</label> */}
                                    {student.section}
                                </div>
                                <div>
                                    {/* <label className="block mb-1">UG Or PG</label> */}{student.ugOrPg}
                                </div>
                                <div>
                                    {/* <label className="block mb-1">Programme Category</label> */}
                                    {student.procategory}
                                </div>
                                <div>

                                    {/* <label className="block mb-1">Semester:</label>  */}
                                    {student.semester}
                                </div>
                                <div>
                                    {/* <label className="block mb-1">Mobile No.:</label> */}
                                    {student.mobileNo}
                                </div>

                                <div className='uppercase'>
                                    <div>
                                        <label className="block mb-1">S/O,D/O</label>{student.fatherName}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Father's Contact No.:</label> */}

                                        {/* <label className="block mb-1">Father's Occupation:</label> */}
                                        {student.fatherOccupation}
                                    </div>
                                    <div>
                                        {student.fatherNo}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">Annual Income:</label> */}
                                        {student.annualIncome}
                                    </div>
                                    <div>
                                        <label className="">Siblings: </label>{student.siblings}
                                    </div>
                                </div>

                                <div className='uppercase'>
                                    <div>
                                        {/* <label className="block mb-1">Hostel:</label> */}
                                        {student.hostel}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Special Category:</label> */}
                                        {student.specialCategory}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Religion:</label> */}
                                        {student.religion}
                                    </div>
                                    <div>

                                        {/* <label className="block mb-1">Permanent Address</label> */}
                                        {student.address}
                                    </div>
                                    <div>
                                        {/* <label className="block mb-1">State:</label> */}
                                        {student.state}
                                    </div>
                                    <div>
                                        {/* 
                                    <label className="block mb-1">District:</label> */}
                                        {student.district}
                                    </div>

                                    {/* <label className="block mb-1">Pincode:</label> */}
                                    {student.pin}

                                    {/* Education Details section */}

                                    <div>
                                        <label className="">Last School Name:</label>{student.schoolName}

                                        <label className="">Percentage of Mark:</label>{student.percentageOfMarkSchool}

                                        <label className="">Semester:</label>{student.preSemester}

                                        <label className="">Percentage of Mark:</label>{student.semPercentage}

                                        <label className="">Class Attendance Percentage:</label>{student.classAttendancePer}

                                        <label className="">Deeniyath Percentage:</label>{student.deeniyathPer}

                                        <label className="">No. Of Arrear :</label>{student.arrear}
                                    </div>
                                </div>

                                <div className='uppercase'>
                                    <label className="block mb-1">Amount:</label>
                                    {student.scholamt}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Scholar Type:</label>
                                    {student.scholtype}
                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Rejected Reason:</label>
                                    {student.something}
                                </div>


                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-1 px-4 ml-4 rounded-lg hover:bg-black"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>



                )};
            </div>
        </div>
    )
}
export default Status;

