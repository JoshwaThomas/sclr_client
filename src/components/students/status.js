import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../assets/Pulse.svg'
import PrintHeader from '../../assets/printHeader.jpg';

import Application_Print from './Application_Print'

function Status() {
    // const [registerNo, setRegisterNo] = useState('');
    // const [mobileNo, setMobileNo] = useState('');
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const printRef = useRef();
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
                console.log("Response from server:", res.data);
                setStudent(res.data);
                
                console.log('semPercentage:', res.data.semPercentage);
                console.log('classAttendancePer:', res.data.classAttendancePer);
                console.log('deeniyathPer:', res.data.deeniyathPer);
                console.log('action:', res.data.action);
                setShowModal(true);

                if (res.data && res.data.message) {
                    // alert(res.data.message);
                    if(res.data.message === 'Applicant does not exist'){
                        navigate(`/student/${staffId}/application/renewal`);
                    }
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

    console.log("setStudent:", student);
 

   const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!student) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 3000); 

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
    );
  }

    return (
        <div>
            <div className="container mx-auto">
                <form className="space-y-4  scrollbar-hide">
                    <div className="text-black">
                        {showModal && student && (
                           student.registerNo ? (
                            <div className="flex items-center justify-center  ">
                                <div className="w-full h-full  overflow-auto p-3 ">
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
                                                 {student.action !== 1 && student.action !== 2 &&  student.action !== 0 && (
                                                    <p className="text-yellow-600 font-bold text-lg">
                                                        Go to Application Tab Apply the Scholarship Renewal.
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

                                                <div className="space-x-4 inline-flex  border border-black p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.fresherOrRenewal}
                                                    </div>
                                                </div>
                                                <div className="space-x-4 ml-5 inline-flex border border-black p-6 rounded-xl">
                                                    <div className='uppercase font-bold text-xl'>
                                                        {student.specialCategory}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-4 text-white">Personal Details</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-black p-10 rounded-xl">

                                            <div className=''>
                                                <label className="block ">Register No.:</label>
                                                <label className='font-bold text-[16px] uppercase'> {student.registerNo} </label>

                                                <div>
                                                    <label className="block mt-2">Name:</label>
                                                    <label className='font-bold text-[16px] uppercase'>  {student.name} </label>
                                                </div>

                                                <div>
                                                    <label className="block mt-2">Department:</label>
                                                    <label className='font-bold text-[16px] uppercase'>  {student.dept} </label>
                                                </div>
                                                <div>
                                                    <label className="block mb-1">Section</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.section} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">UG or PG</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.ugOrPg} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Programme Category</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.procategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Semester:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.semester} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Mobile No.:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.mobileNo} </label>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">S/O,D/O</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherName} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Contact No.:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherNo} </label>

                                                </div>
                                                <div>
                                                    <label className="block mt-2">Father's Occupation:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.fatherOccupation} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Annual Income:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.annualIncome} </label>
                                                </div>
                                                <div>
                                                    <label className="">Siblings: </label><br />
                                                    <label className='font-bold text-[16px] uppercase'> {student.siblings} </label> <br />
                                                </div>
                                                {student.siblings === 'Yes' && (
                                                    <div>
                                                        <label className="">No of Siblings: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsNo} </label><br />
                                                        <label className="">Siblings Occupation: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsOccupation} </label><br />
                                                        <label className="">Family Annual Income: </label> <br />
                                                        <label className='font-bold text-[16px] uppercase'> {student.siblingsIncome} </label>
                                                    </div>
                                                )}


                                            </div>

                                            <div className=''>
                                                <div>
                                                    <label className="block mt-2">Hostel:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.hostel} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Special Category:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.specialCategory} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Religion:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.religion} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">Permanent Address</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.address} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">State:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.state} </label>
                                                </div>
                                                <div>

                                                    <label className="block mt-2">District:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.district} </label>
                                                </div>
                                                <div>
                                                    <label className="block mt-2">Pincode:</label>
                                                    <label className='font-bold text-[16px] uppercase'> {student.pin} </label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Education Details section */}
                                        <h3 className="text-xl mb-2 font-bold bg-gray-600 p-2 mt-7 text-white">Education Details</h3>
                                        <div>
                                            <div className="overflow-x-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border border-black p-10 rounded-xl">
                                                    {student.semester === 'I' && (
                                                        <div className='grid grid-cols-1 md:grid-cols-4 '>
                                                            <div>
                                                                <label className="block mt-2 ">Last School Name:</label>
                                                                <label className='font-bold text-[16px] uppercase -mr-96'> {student.schoolName} </label>
                                                            </div>
                                                            <div>

                                                            </div>
                                                            <div>
                                                                <label className="block mt-2">Percentage of Mark:</label>
                                                                <label className='font-bold text-[16px] uppercase'> {student.percentageOfMarkSchool} </label>
                                                            </div>
                                                            <div>
                                                                <label className='block mt-2'>Year of Passing: </label>
                                                                <label className='font-bold text-[16px] uppercase'> {student.yearOfPassing} </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {student.semester !== 'I' && (
                                                        <div className="grid grid-cols-2 w-auto ">
                                                            <div className="font-bold border border-black text-left py-3 px-5">Percentage of Mark</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">{student.semPercentage === 0 ? 'Pending' : student.semPercentage}</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">Class Attendance Percentage</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5"> {student.classAttendancePer === 0 ? 'Pending' : student.classAttendancePer}</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">Deeniyath / Moral Percentage</div>
                                                            <div className="font-bold border border-black text-left py-3 px-5">{student.deeniyathPer === 0 ? 'Pending' : student.deeniyathPer}</div>
                                                        </div>
                                                    )}
                                                </div>

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
                                                    <label className=""></label>
                                                    <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-auto rounded-lg" />
                                                    {/* <img src={student.jamath} alt="Jamath" /> */}
                                                </div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                           ):(
                            <div className="text-[16px] font-medium mt-4">
                                Go to Application Tab Apply the scholarship Renewal
                            </div>
                           )
                        )}
                    </div>
            <div>
                <div>
                                                    {/* <button
                                                        type='button'
                                                        onClick={() => {handlePrint1()}}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                        Print
                                                    </button> */}
                                                                                            {/* <div>
                                            <img src={`${apiUrl}/${student.jamath}`} alt="Jamath" className="max-w-full h-1/2 rounded-lg border border-black" />
                                        </div> */}
<Application_Print student={student}/>

                </div>
            </div>
                </form>
            </div>
        </div>
    );
}

export default Status;