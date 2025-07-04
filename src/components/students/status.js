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
                });
                setStudent(res.data);
                setShowModal(true);
                if (res.data && res.data.message) {
                    if (res.data.message === 'Applicant does not exist') {
                        navigate(`/student/${staffId}/application/renewal`);
                    }
                }
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

    if (!student) {
        return (
            <div>
                <center>
                    {!showMessage ? (
                        <img src={Loading} alt="Loading" className="w-36 h-80" />
                    ) : (
                        <div className="text-[14px] font-medium mt-4">
                            Go to Application Tab Apply the scholarship Renewal
                        </div>
                    )}
                </center>
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <form className="space-y-1 rounded-2xl">
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
                                {student.semester === 'I' ? (
                                    <div className="grid grid-cols-2 border border-gray-600 rounded-md overflow-hidden">
                                        {student.ugOrPg === 'PG' ? (
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">Last College Name</div>
                                        ) : (
                                            <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">Last School Name</div>
                                        )}
                                        <div className="flex justify-center border-b border-gray-600 p-3">{student.schoolName || 'N/A'}</div>
                                        <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">Percentage of Mark</div>
                                        <div className="flex justify-center border-b border-gray-600 p-3">{student.percentageOfMarkSchool || 'N/A'}</div>
                                        <div className="flex justify-center border-r border-gray-600 p-3 font-semibold bg-gray-100">Year of Passing</div>
                                        <div className="flex justify-center p-3">{student.yearOfPassing || 'N/A'}</div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 border border-gray-600 rounded-md overflow-hidden">
                                        <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">Percentage of Mark</div>
                                        <div className="flex justify-center border-b border-gray-600 p-3">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                        <div className="flex justify-center border-r border-b border-gray-600 p-3 font-semibold bg-gray-100">Class Attendance Percentage</div>
                                        <div className="flex justify-center border-b border-gray-600 p-3">{student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                        <div className="flex justify-center border-r border-gray-600 p-3 font-semibold bg-gray-100">Deeniyath / Moral Percentage</div>
                                        <div className="flex justify-center p-3">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
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
                                        <label className="font-semibold">Last Time Credited Amount : </label>{student.lastCreditedAmt}
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold mb-4">Jamath / Declaration Letter : </p>
                                    <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6"> <ApplicationPrint student={student} /> </div>
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