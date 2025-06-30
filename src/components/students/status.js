import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../assets/Pulse.svg'
import PrintHeader from '../../assets/printHeader.jpg';
import ApplicationPrint from './ApplicationPrint'

function Status() {

    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { staffId } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const contentRef = useRef();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/admin/studstatus`, {
                    params: { registerNo: staffId }
                })
            } catch (error) { alert("An error occurred. Please try again.") }
        }
        if (staffId) { fetchStudentData() }
    }, [staffId, apiUrl]);

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (!student) {
            const timer = setTimeout(() => { setShowMessage(true) }, 3000);
            return () => clearTimeout(timer);
        }
    }, [student]);

    if (!student || !student.registerNo) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                {!showMessage ? (
                    <img src={Loading} alt="Loading" className="w-36 h-80 animate-pulse" />
                ) : (
                    <div className="bg-white border border-gray-300 rounded-xl p-8 w-full max-w-xl shadow-md animate-fadeIn flex flex-col justify-center items-center">
                        <h2 className="text-gray-800 text-2xl font-semibold mb-3 text-center">
                            No Application Found
                        </h2>
                        <p className="text-gray-600 text-lg text-center leading-relaxed">
                            Our records show that you haven't submitted a <span className="font-medium">Fresher</span> or <span className="font-medium">Renewal</span> scholarship application for this academic year.
                        </p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <form className="space-y-1 bg-gray-50 rounded-2xl">
                {showModal && student && student.registerNo ? (
                    <>
                        <div>
                            <h3 className="text-xl font-semibold bg-gray-600 p-3 text-white rounded-t-md">Application Status</h3>
                            <div className="py-4">
                                {student.action === 1 && (
                                    <p className="text-green-600 font-semibold text-lg">
                                        Your application is selected. If any query, contact ERP or the Scholarship Office.
                                    </p>
                                )}
                                {student.action === 2 && (
                                    <p className="text-red-600 font-semibold text-lg">
                                        Your application is rejected.
                                    </p>
                                )}
                                {![1, 2, 0].includes(student.action) && (
                                    <p className="text-yellow-600 font-semibold text-lg">
                                        Go to Application Tab to apply for Scholarship Renewal.
                                    </p>
                                )}
                                {![1, 2].includes(student.action) && (
                                    <p className="text-yellow-600 font-semibold text-lg">
                                        Your application is under process.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-black p-5 rounded-xl bg-white text-center text-xl font-semibold uppercase">
                                {student.fresherOrRenewal}
                            </div>
                            <div className="border border-black p-5 rounded-xl bg-white text-center text-xl font-semibold uppercase">
                                {student.specialCategory}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold bg-gray-600 p-3 text-white mt-6 rounded-t-md">
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-5 border border-black p-8 rounded-b-xl bg-white">
                                <Detail label="Register No. :" value={student.registerNo} />
                                <Detail label="Name :" value={student.name} />
                                <Detail label="Department :" value={student.dept} />
                                <Detail label="Section :" value={student.section} />
                                <Detail label="UG or PG :" value={student.ugOrPg} />
                                <Detail label="Programme Category :" value={student.procategory} />
                                <Detail label="Semester :" value={student.semester} />
                                <Detail label="Mobile No. :" value={student.mobileNo} />
                                <Detail label="S/O, D/O :" value={student.fatherName} />
                                <Detail label="Father's Contact No. :" value={student.fatherNo} />
                                <Detail label="Father's Occupation :" value={student.fatherOccupation} />
                                <Detail label="Annual Income :" value={student.annualIncome} />
                                <Detail label="Siblings :" value={student.siblings} />
                                {student.siblings === 'Yes' && (
                                    <>
                                        <Detail label="No. of Siblings :" value={student.siblingsNo} />
                                        <Detail label="Siblings Occupation :" value={student.siblingsOccupation} />
                                        <Detail label="Family Annual Income :" value={student.siblingsIncome} />
                                    </>
                                )}
                                <Detail label="Hostel :" value={student.hostel} />
                                <Detail label="Special Category :" value={student.specialCategory} />
                                <Detail label="Religion :" value={student.religion} />
                                <Detail label="Permanent Address :" value={student.address} />
                                <Detail label="State :" value={student.state} />
                                <Detail label="District :" value={student.district} />
                                <Detail label="Pincode :" value={student.pin} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold bg-gray-600 p-3 text-white mt-6 rounded-t-md">
                                Personal Details
                            </h3>
                            <div className="overflow-x-auto border border-black p-8 rounded-b-xl bg-white">
                                {student.semester === 'I' && (
                                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                                        <div>
                                            <label className="block mt-2 ">Last School Name:</label>
                                            <label className='font-semibold text-[16px] uppercase -mr-96'> {student.schoolName} </label>
                                        </div>
                                        <div>
                                            <label className="block mt-2">Percentage of Mark:</label>
                                            <label className='font-semibold text-[16px] uppercase'> {student.percentageOfMarkSchool} </label>
                                        </div>
                                        <div>
                                            <label className='block mt-2'>Year of Passing: </label>
                                            <label className='font-semibold text-[16px] uppercase'> {student.yearOfPassing} </label>
                                        </div>
                                    </div>
                                )}
                                {student.semester !== 'I' && (
                                    <div className="grid grid-cols-2 w-auto">
                                        <div className="font-semibold border border-black text-left py-3 px-5">Percentage of Mark</div>
                                        <div className="font-semibold border border-black text-left py-3 px-5">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                        <div className="font-semibold border border-black text-left py-3 px-5">Class Attendance Percentage</div>
                                        <div className="font-semibold border border-black text-left py-3 px-5"> {student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                        <div className="font-semibold border border-black text-left py-3 px-5">Deeniyath / Moral Percentage</div>
                                        <div className="font-semibold border border-black text-left py-3 px-5">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl mt-5">
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
                                    <p className="font-semibold mb-4">Jamath / Declaration Letter : </p>
                                    <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div div className="mt-6"> <ApplicationPrint student={student} /> </div>
                    </>
                ) : (
                    <p className="text-gray-800 text-lg font-medium">
                        Go to Application Tab to apply for the scholarship renewal.
                    </p>
                )}
            </form>
        </div >
    )
}

const Detail = ({ label, value }) => (
    <div className="text-base space-y-1">
        <p className="text-slate-700 font-lightbold">{label}</p>
        <p className="uppercase font-bold text-slate-900">{value || '-'}</p>
    </div>
)

export default Status;