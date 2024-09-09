import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import PrintHeader from '../../assets/printHeader.jpg';

function Status() {
    // const [registerNo, setRegisterNo] = useState('');
    // const [mobileNo, setMobileNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const printRef = useRef();
    const { staffId } = useParams();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/admin/studstatus", {
                    params: { registerNo: staffId }
                });
                console.log("Response from server:", res.data);
                setStudent(res.data);
                console.log('semPercentage:', res.data.semPercentage);
                console.log('classAttendancePer:', res.data.classAttendancePer);
                console.log('deeniyathPer:', res.data.deeniyathPer);
                console.log('action:', res.data.action);
                setShowModal(true);

                if (res.data && res.data.message) {
                    alert(res.data.message);
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
                console.log(error);
            }
        };

        if (staffId) {
            fetchStudentData();
        }
    }, [staffId]);

    // const Submit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.get("http://localhost:3001/api/admin/studstatus", {
    //             params: { registerNo, mobileNo }
    //         });
    //         console.log("Response from server:", res.data);
    //         setStudent(res.data);
    //         console.log('semPercentage:', student.semPercentage);
    //         console.log('classAttendancePer:', student.classAttendancePer);
    //         console.log('deeniyathPer:', student.deeniyathPer);
    //         console.log('action:', student.action);
    //         setShowModal(true);

    //         if (res.data && res.data.message) {
    //             alert(res.data.message);
    //         }
    //     } catch (e) {
    //         alert("An error occurred. Please try again.");
    //         console.log(e);
    //     }
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    // };

    // const handlePrint = () => {
    //     const printWindow = window.open('', '', 'height=600,width=800');
    //     const content = printRef.current.innerHTML;
    //     printWindow.document.write('<html><head><title>Print</title></head><body>');
    //     printWindow.document.write(content);
    //     printWindow.document.write('</body></html>');
    //     printWindow.document.close();
    //     printWindow.focus();
    //     printWindow.print();
    // };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form className="space-y-4">
                    <div className="text-white">
                        {/* <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className='text-white font-bold mt-5'>{staffId}</div> */}
                        {/* <div className="grid grid-rows-2 md:grid-cols-1 gap-4">
                            <div>
                           
                                <label className="block mb-1">Register No:</label>
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
                            <div>
                                <label className="block mb-1">Mobile No:</label>
                                <input
                                    type="number"
                                    id="mobileNo"
                                    name="mobileNo"
                                    inputMode="numeric"
                                    value={mobileNo}
                                    pattern="\d*"
                                    onChange={(e) => setMobileNo(e.target.value.toUpperCase())}
                                    className="w-72 p-2 uppercase border rounded-md text-slate-950 rem"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-8"
                        >
                            Check Status
                        </button> */}
                        {showModal && student && (
                           

                            <div className="fixed inset-0  flex items-center justify-center  ">
                                <div className="  ml-64 w-5/6 h-full  overflow-auto p-6">
                                    {/* fresher form data retrive */}
                                    <div>
                                        <div className=' '>
                                            <div>
                                            <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application Status</h3>
                                                {student.action === 1 && (
                                                    <p className="text-green-600 font-bold text-lg">
                                                        Your application is selected. If any Query Contact ERP or Scholarship Office
                                                    </p>
                                                )}
                                                {student.action === 2 && (
                                                    <p className="text-red-600 font-bold text-lg">
                                                        Your application is rejected.
                                                    </p>
                                                )}
                                                {student.action !== 1 && student.action !== 2 && (
                                                    <p className="text-yellow-600 font-bold text-lg">
                                                        Your application is under process.
                                                    </p>
                                                )}
                                            </div >
                                            <div className='mt-5'>

                                                <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2  text-white">Application</h3>

                                                <div className="space-x-4 inline-flex border p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.fresherOrRenewal}
                                                    </div>
                                                </div>
                                                <div className="space-x-4 ml-5 inline-flex border p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.specialCategory}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-4 text-white">Personal Details</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl">

                                            <div className=''>
                                                <label className="block ">Register No.:</label>
                                                <label className='font-bold text-lg uppercase'> {student.registerNo} </label>

                                                <div>
                                                    <label className="block mt-2">Name:</label>
                                                    <label className='font-bold text-lg uppercase'>  {student.name} </label>
                                                </div>

                                                <div>
                                                    <label className="block mt-2">Department:</label>
                                                    <label className='font-bold text-lg uppercase'>  {student.dept} </label>
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Section</label>
                                                    <label className='font-bold text-lg uppercase'> {student.section} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">UG or PG</label>
                                                    <label className='font-bold text-lg uppercase'> {student.ugOrPg} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Programme Category</label>
                                                    <label className='font-bold text-lg uppercase'> {student.procategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Semester:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.semester} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Mobile No.:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.mobileNo} </label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">S/O,D/O</label>
                                                    <label className='font-bold text-lg uppercase'> {student.fatherName} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Contact No.:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.fatherNo} </label>

                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Occupation:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.fatherOccupation} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Annual Income:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.annualIncome} </label>
                                                </div>
                                                <div>
                                                    <label className="">Siblings: </label><br />
                                                    <label className='font-bold text-lg uppercase'> {student.siblings} </label> <br />
                                                </div>
                                                {student.siblings === 'Yes' && (
                                                    <div>
                                                        <label className="">No of Siblings: </label> <br />
                                                        <label className='font-bold text-lg uppercase'> {student.siblingsNo} </label><br />
                                                        <label className="">Siblings Occupation: </label> <br />
                                                        <label className='font-bold text-lg uppercase'> {student.siblingsOccupation} </label><br />
                                                        <label className="">Siblings Annual Income: </label> <br />
                                                        <label className='font-bold text-lg uppercase'> {student.siblingsIncome} </label>
                                                    </div>
                                                )}


                                            </div>

                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">Hostel:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.hostel} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Special Category:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.specialCategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Religion:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.religion} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Permanent Address</label>
                                                    <label className='font-bold text-lg uppercase'> {student.address} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">State:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.state} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">District:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.district} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Pincode:</label>
                                                    <label className='font-bold text-lg uppercase'> {student.pin} </label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Education Details section */}
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                                        <div>
                                            <div className="overflow-x-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border p-10 rounded-xl">
                                                    {student.semester === 'I' && (
                                                        <div className='grid grid-cols-1 md:grid-cols-4 '>
                                                            <div>
                                                                <label className="block mt-2 ">Last School Name:</label>
                                                                <label className='font-bold text-lg uppercase -mr-96'> {student.schoolName} </label>
                                                            </div>
                                                            <div>

                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Percentage of Mark:</label>
                                                                <label className='font-bold text-lg uppercase'> {student.percentageOfMarkSchool} </label>
                                                            </div>
                                                            <div>
                                                                <label className='block mt-2'>Year of Passing: </label>
                                                                <label className='font-bold text-lg uppercase'> {student.yearOfPassing} </label>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-2 w-auto ">
                                                        <div className="font-bold border border-black text-left py-3 px-5">Percentage of Mark</div>
                                                        <div className="font-bold border border-black text-left py-3 px-5">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                                        <div className="font-bold border border-black text-left py-3 px-5">Class Attendance Percentage</div>
                                                        <div className="font-bold border border-black text-left py-3 px-5"> {student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                                        <div className="font-bold border border-black text-left py-3 px-5">Deeniyath Percentage</div>
                                                        <div className="font-bold border border-black text-left py-3 px-5">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-10 rounded-xl mt-5">
                                                {student.arrear !== 0 && (
                                                    <div>
                                                        <label className="">No. Of Arrear :</label>{student.arrear}

                                                    </div>
                                                )}

                                                {student.fresherOrRenewal === 'Renewal' && (
                                                    <div>
                                                        <label className="">Last Time Credited Amount:</label>{student.lastCreditedAmt}

                                                        {/* <a href={`http://localhost:3001/${selectedUser.jamath}`} target="_blank" rel="noopener noreferrer">Download Jamath File</a> */}

                                                    </div>
                                                )}

                                                <div>
                                                    <label className=""></label>
                                                    {/* {selectedUser.jamath} */}
                                                    {/* <a href={`http://localhost:3001/${selectedUser.jamath}`} target="_blank" rel="noopener noreferrer">Download Jamath File</a> */}
                                                    <img src={student.jamath} alt="Jamath" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        )}
                    </div>
                </form>


            </div>
        </div>
    );
}

export default Status;