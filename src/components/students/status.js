import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../../assets/Pulse.svg'
import PrintHeader from '../../assets/printHeader.jpg';

function Status() {
    // const [registerNo, setRegisterNo] = useState('');
    // const [mobileNo, setMobileNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const printRef = useRef();
    const { staffId } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/admin/studstatus`, {
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
    }, [staffId, apiUrl]);

    const handlePrint = (e) => {
        e.preventDefault();
        const printContent = document.getElementById('print-section').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };

    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
                handlePrint(event);
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    if (!student) return <div><center><img src={Loading} alt="" className="w-36 h-80" /></center></div>;

    return (
        <div>
            <div className="container mx-auto p-8">
                <form className="space-y-4 scrollbar-hide">
                    <div className="text-white">
                        {showModal && student && (
                            <div className="fixed inset-0  flex items-center justify-center  ">
                                <div className="  ml-64 w-5/6 h-full  overflow-auto p-6 ">
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
                                                        <label className="">Family Annual Income: </label> <br />
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
                                                        <div className="font-bold border border-black text-left py-3 px-5">Deeniyath / Moral Percentage</div>
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
                                                    </div>
                                                )}

                                                <div>
                                                    <label className=""></label>
                                                    <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                                    {/* <img src={student.jamath} alt="Jamath" /> */}
                                                </div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div className="text-right">
                                                    <button
                                                        onClick={handlePrint}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                        Print
                                                    </button>
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
            <div id="print-section" hidden>
                <img src={PrintHeader} alt="Header" className="w-full h-full" />
                <div>
                    {showModal && student && (
                        <div className="border border-black mt-10">
                            <div className=' text-center text-2xl font-bold'>Scholarship Application({student.fresherOrRenewal})</div>
                            <div className="flex items-center justify-center flex-col p-3">
                                <h3 className="text-xl font-bold text-black">Student Details</h3>
                                <div className="grid grid-cols-3 gap-10 border w-full border-black p-10 rounded-xl">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Register No.:</label>
                                            <label className="text-lg font-bold uppercase">{student.registerNo}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Name:</label>
                                            <label className="text-lg font-bold uppercase">{student.name}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Department:</label>
                                            <label className="text-lg font-bold uppercase">{student.dept}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Section:</label>
                                            <label className="text-lg font-bold uppercase">{student.section}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">UG or PG:</label>
                                            <label className="text-lg font-bold uppercase">{student.ugOrPg}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Programme Category:</label>
                                            <label className="text-lg font-bold uppercase">{student.procategory}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Semester:</label>
                                            <label className="text-lg font-bold uppercase">{student.semester}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Mobile No.:</label>
                                            <label className="text-lg font-bold uppercase">{student.mobileNo}</label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="font-semibold">S/O, D/O:</label>
                                            <label className="text-lg font-bold uppercase">{student.fatherName}</label>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold">Father's Contact No.:</label>
                                            <label className="text-lg font-bold uppercase">{student.fatherNo}</label>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold">Father's Occupation:</label>
                                            <label className="text-lg font-bold uppercase">{student.fatherOccupation}</label>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold">Annual Income:</label>
                                            <label className="text-lg font-bold uppercase">{student.annualIncome}</label>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold">Siblings:</label>
                                            <label className="text-lg font-bold uppercase">{student.siblings}</label>
                                        </div>

                                        {student.siblings === 'Yes' && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <label className="font-semibold">No. of Siblings:</label>
                                                    <label className="text-lg font-bold uppercase">{student.siblingsNo}</label>
                                                </div>

                                                <div className="flex justify-between">
                                                    <label className="font-semibold">Siblings' Occupation:</label>
                                                    <label className="text-lg font-bold uppercase">{student.siblingsOccupation}</label>
                                                </div>

                                                <div className="flex justify-between">
                                                    <label className="font-semibold">Family Annual Income:</label>
                                                    <label className="text-lg font-bold uppercase">{student.siblingsIncome}</label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Hostel:</label>
                                            <label className="text-lg font-bold uppercase">{student.hostel}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Special Category:</label>
                                            <label className="text-lg font-bold uppercase">{student.specialCategory}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Religion:</label>
                                            <label className="text-lg font-bold uppercase">{student.religion}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Permanent Address:</label>
                                            <label className="text-lg font-bold uppercase">{student.address}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">State:</label>
                                            <label className="text-lg font-bold uppercase">{student.state}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">District:</label>
                                            <label className="text-lg font-bold uppercase">{student.district}</label>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-semibold">Pincode:</label>
                                            <label className="text-lg font-bold uppercase">{student.pin}</label>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold p-2 mt-5 text-black">Education Details</h3>
                                <div className="border border-black p-10 w-full rounded-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {student.semester === 'I' && (
                                            <div className="grid grid-cols-2">
                                                <div className="font-semibold">Last School Name:</div>
                                                <div className="text-lg font-bold uppercase">{student.schoolName}</div>
                                                <div className="font-semibold">Percentage of Mark:</div>
                                                <div className="text-lg font-bold uppercase">{student.percentageOfMarkSchool}</div>
                                                <div className="font-semibold">Year of Passing:</div>
                                                <div className="text-lg font-bold uppercase">{student.yearOfPassing}</div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2">
                                            <div className="font-bold border border-black py-2 px-4">Percentage of Mark</div>
                                            <div className="font-bold border border-black py-2 px-4">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                            <div className="font-bold border border-black py-2 px-4">Class Attendance Percentage</div>
                                            <div className="font-bold border border-black py-2 px-4">{student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                            <div className="font-bold border border-black py-2 px-4">Deeniyath / Moral Percentage</div>
                                            <div className="font-bold border border-black py-2 px-4">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                                        {student.arrear !== 0 && (
                                            <div className="flex justify-between">
                                                <label className="font-semibold">No. Of Arrears:</label>
                                                <label className="font-bold text-lg">{student.arrear}</label>
                                            </div>
                                        )}
                                        {student.fresherOrRenewal === 'Renewal' && (
                                            <div className="flex justify-between">
                                                <label className="font-semibold">Last Time Credited Amount:</label>
                                                <label className="font-bold text-lg">{student.lastCreditedAmt}</label>
                                            </div>
                                        )}
                                        <div>
                                            <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-1/2 rounded-lg border border-black" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Status;