import React, { useState, useRef } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import PrintHeader from '../../assets/printHeader.jpg';

function Status() {
    const [registerNo, setRegisterNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const printRef = useRef();
    // const { staffId } = useParams();

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:3001/api/admin/studstatus", {
                params: { registerNo, mobileNo }
            });
            console.log("Response from server:", res.data);
            setStudent(res.data);
            console.log('semPercentage:', student.semPercentage);
            console.log('classAttendancePer:', student.classAttendancePer);
            console.log('deeniyathPer:', student.deeniyathPer);
            console.log('action:', student.action);
            setShowModal(true);

            if (res.data && res.data.message) {
                alert(res.data.message);
            }
        } catch (e) {
            alert("An error occurred. Please try again.");
            console.log(e);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        const content = printRef.current.innerHTML;
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div>
            <div className="container mx-auto p-8">
                <form onSubmit={Submit} className="space-y-4">
                    <div className="text-white">
                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-1">Application Status</h3>
                        <div className="grid grid-rows-2 md:grid-cols-1 gap-4">
                            <div>
                            {/* <div className='text-white font-bold mt-5'>{staffId}</div> */}
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
                        </button>
                        {showModal && student && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-red-300 w-3/4 h-2/3 rounded-lg overflow-auto p-6">
                                    <div className='grid grid-cols-3 w-auto p-4 text-amber-950 text-xl'>
                                        {student.registerNo && (
                                            <div className='uppercase'>
                                                <label className="block mb-1">{student.registerNo}</label>
                                            </div>
                                        )}
                                        {student.name && (
                                            <div className='uppercase'>
                                                <label className="block mb-1"> {student.name}</label>
                                            </div>
                                        )}
                                        {student.fresherOrRenewal && (
                                            <div className='uppercase'>
                                                <label className="block mb-1">{student.fresherOrRenewal}</label>
                                            </div>
                                        )}

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
                                                <div>{student.action}</div>
                                            </div>
                                        )}
                                        {student.schoolName && (
                                            <div className='uppercase mt-3'>
                                                {/* Log the values for debugging */}
                                                {console.log('semPercentage:', student.semPercentage)}
                                                {console.log('classAttendancePer:', student.classAttendancePer)}
                                                {console.log('deeniyathPer:', student.deeniyathPer)}
                                                {console.log('action:', student.action)}

                                                {/* Updated Condition Check */}
                                                {parseFloat(student.semPercentage) !== 0 &&
                                                    parseFloat(student.classAttendancePer) !== 0 &&
                                                    parseFloat(student.deeniyathPer) !== 0 ? (
                                                    parseInt(student.action) === 0 ? (
                                                        <div className='grid grid-cols-2 mt-2'>
                                                            <div className='flex inline-flex'>
                                                                <button
                                                                    onClick={handlePrint}
                                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-black"
                                                                >
                                                                    Print
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="bg-slate-600 text-white py-2 px-4 ml-4 rounded-md mt-4 hover:bg-black"
                                                                    onClick={closeModal}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : parseInt(student.action) === 1 ? (
                                                        <div className=''>
                                                            <button
                                                                type="button"
                                                                className="bg-slate-600  text-white py-2 px-4 rounded-md mt-4 hover:bg-black"
                                                                onClick={closeModal}
                                                            >
                                                                Close
                                                            </button>
                                                            <div className="text-green-900 font-bold w-full mt-4 ">
                                                                Your Application Selected. Contact Scholarship Office / ERP .
                                                            </div>
                                                        </div>
                                                    ) : parseInt(student.action) === 2 ? (
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="bg-slate-600  text-white py-2 px-4 rounded-md mt-4 hover:bg-black"
                                                                onClick={closeModal}
                                                            >
                                                                Close
                                                            </button>
                                                            <div className="text-red-500 font-bold mt-4 ">
                                                                Your Application Rejected. Contact Scholarship Office {student.reason}
                                                            </div>
                                                        </div>
                                                    ) : null
                                                ) : (
                                                    <div>
                                                        <button
                                                            type="button"
                                                            className="bg-blue-600  text-white py-2 px-4 rounded-md mt-4 ml-4 hover:bg-black"
                                                            onClick={closeModal}
                                                        >
                                                            Close
                                                        </button>
                                                        <div className="text-red-500 font-bold mt-4">
                                                            Your Application Under Process
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                </div>
                                {/* print layout */}
                                <div ref={printRef} style={{ display: 'none' }}>
                                    <img src={PrintHeader} alt="Print Header" />
                                    <h1 className="text-2xl text-center font-bold mb-4">Applicantion</h1>
                                    <div className='border border-black'>
                                        <div className="grid grid-cols-2 gap-4 text-left">
                                            <div className="font-semibold">Register No</div><div>{student.registerNo}</div>
                                            <div className="font-semibold">Name</div><div>{student.name}</div>
                                            <div className="font-semibold">Fresher/Renewal</div><div>{student.fresherOrRenewal}</div>
                                            <div className="font-semibold">UG/PG</div><div>{student.ugOrPg}</div>
                                            <div className="font-semibold">Department</div><div>{student.dept}</div>
                                            <div className="font-semibold">Section</div><div>{student.section}</div>
                                            <div className="font-semibold">Category</div><div>{student.procategory}</div>
                                            <div className="font-semibold">Semester</div><div>{student.semester}</div>
                                            <div className="font-semibold">Mobile No</div><div>{student.mobileNo}</div>
                                            <div className="font-semibold">Hostel</div><div>{student.hostel}</div>
                                            <div className="font-semibold">Father's Name</div><div>{student.fatherName}</div>
                                            <div className="font-semibold">Father's No</div><div>{student.fatherNo}</div>
                                            <div className="font-semibold">Father's Occupation</div><div>{student.fatherOccupation}</div>
                                            <div className="font-semibold">Annual Income</div><div>{student.annualIncome}</div>
                                            <div className="font-semibold">Siblings</div><div>{student.siblings}</div>
                                            {student.siblings === 'Yes' && (
                                                <div>
                                                    <div className="font-semibold">Siblings</div><div>{student.siblings}</div>
                                                    <div className="font-semibold">Siblings</div><div>{student.siblings}</div>
                                                    <div className="font-semibold">Siblings</div><div>{student.siblings}</div>
                                                </div>
                                            )}
                                            <div className="font-semibold">Special Category</div><div>{student.specialCategory}</div>
                                            <div className="font-semibold">Religion</div><div>{student.religion}</div>
                                            <div className="font-semibold">Address</div><div>{student.address}</div>
                                            <div className="font-semibold">District</div><div>{student.district}</div>
                                            <div className="font-semibold">State</div><div>{student.state}</div>
                                            <div className="font-semibold">Pin</div><div>{student.pin}</div>
                                            <div className="font-semibold">Semester Percentage</div><div>{student.semPercentage}</div>
                                            <div className="font-semibold">Attendance Percentage</div><div>{student.classAttendancePer}</div>
                                            <div className="font-semibold">Deeniyath/Moral Percentage</div><div>{student.deeniyathPer}</div>
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