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
                    <div className= "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        {/* <div className="bg-red-400 bg-teal-300 w-3/4 h-96 rounded-lg overflow-auto p-6"> */}
                        <div className=" bg-teal-600 w-3/4 h-96 rounded-lg overflow-auto p-6 ">
                            <div className='grid grid-cols-4 w-auto p-4 text-white'>
                                <div className='uppercase'>
                                    <label className="block mb-1 ">Register No.:  {student.registerNo}</label>

                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Name: {student.name}</label>

                                </div>
                                <div className='uppercase'>
                                    <label className="block mb-1">Application:  {student.fresherOrRenewal}</label>
                                </div>
                                <div>

                                </div>

                                <div className='uppercase mt-3'>
                                    <div> {student.ugOrPg} </div>
                                    <div> {student.dept} </div>
                                    <div> {student.section} </div>
                                    <div> {student.procategory} </div>
                                    <div>{student.semester} </div>
                                    <div> {student.mobileNo} </div>
                                    <div>  <label className="block mb-1">Hostel:{student.hostel} </label> </div>
                                </div>


                                <div className='uppercase mt-3'>
                                    <div> <label className="block mb-1">S/O,D/O :{student.fatherName} </label> </div>
                                    <div> {student.fatherNo} </div>
                                    <div> {student.fatherOccupation} </div>
                                    <div> {student.annualIncome} </div>
                                    <div> <label className="">Siblings: </label>{student.siblings} </div>
                                </div>




                                <div className='uppercase mt-3'>

                                    {/* <label className="block mb-1">Special Category:</label> */}
                                    <div>   {student.specialCategory} </div>
                                    <div>   {student.religion} </div>
                                    <div>    {student.address} </div>
                                    <div>    {student.district} </div>
                                    <div>   {student.state} </div>
                                    <div>   {student.pin} </div>
                                </div>

                                <div className='uppercase mt-3'>
                                    {/* <label className="">Last School Name:</label> */}
                                    <div>  {student.schoolName}  </div>

                                    {/* <label className="">Percentage of Mark:</label> */}
                                    <div>  {student.percentageOfMarkSchool}  </div>

                                    {/* <label className="">Semester:</label> */}
                                    <div>    {student.preSemester}  </div>

                                    {/* <label className="">Percentage of Mark:</label> */}
                                    <div>   {student.semPercentage}  </div>

                                    <div>  <label className="">Class Attendance Percentage:  {student.classAttendancePer}  </label>
                                    </div>

                                    <div>  <label className="">Deeniyath Percentage:     {student.deeniyathPer}</label>
                                    </div>

                                    <div>  <label className="">No. Of Arrear :    {student.arrear} </label>
                                    </div>
                                </div>



                                <div className='uppercase mt-3'>
                                    <label className="block mb-1">Amount:</label>
                                    {student.scholamt}
                                </div>
                                <div className='uppercase mt-3'>
                                    <label className="block mb-1">Scholar Type:</label>
                                    {student.scholtype}
                                </div>
                                <div className='uppercase mt-3'>
                                    <label className="block mb-1">Rejected Reason:</label>
                                    {student.reason}
                                </div>



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



                )};
            </div>
        </div>
    )
}
export default Status;

